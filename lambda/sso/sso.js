// details: https://markus.oberlehner.net/blog/implementing-an-authentication-flow-with-passport-and-netlify-functions/

const { SAML_ENTRYPOINT, SECRET, BASE_PROTOCOL, BASE_URL, SAML_CERT, SAML_ENTITYID} = require('./utils/config')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const serverless = require('serverless-http')
const passport = require('passport')
const passportJWT = require('passport-jwt');
const passportSAML = require('passport-saml')
const { sign } = require(`jsonwebtoken`);
const app = express()
const userCookieName = "su_auth"
const userCookieExpires = 36000000 + Date.now()

// SAML Strategy for OIDCS
const saml = new passportSAML.Strategy(
  {
    protocol: BASE_PROTOCOL,
    host: BASE_URL,
    callbackUrl: BASE_PROTOCOL + BASE_URL + '/api/sso/auth',
    issuer: SAML_ENTITYID,
    entryPoint: SAML_ENTRYPOINT,
    path: '/api/sso/auth',
    loginPath: '/api/sso/login',
    logoutUrl: '/api/sso/logout',
    passReqToCallback: true,
    validatedInResponseTo: false,
    passport: passport,
    forceAuthn: true,
    acceptedClockSkewMs: 60000,
    skipRequestCompression: false,
    disableRequestedAuthnContext: true,
  },
  function(req, profile, done) {
    return done(null,
      profile
    )
  }
)

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(saml);

// -----------------------------------------------------------------------------
// JWT
// -----------------------------------------------------------------------------

const getUserJWT = (req) => {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies[userCookieName];
  }
  return token;
}

passport.use(
  new passportJWT.Strategy(
    {
      jwtFromRequest(req) {
        if (!req.cookies) throw new Error('Missing cookie-parser middleware')
        return req.cookies[userCookieName]
      },
      secretOrKey: SECRET,
      passReqToCallback: true,
      fromExtractors: [ getUserJWT ],
    },
    async (req, payload, done) => {

      try {
        if (typeof payload.user == "object") {
          if (payload.user.session && payload.user.expires >= Date.now()) {
            return done(null, payload.user)
          }
        }
        return done(false, null);
      }
      catch (error) {
        return done(error)
      }
    }
  )
)

// EXPRESS CONFIG.
// -----------------------------------------------------------------------------

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(passport.initialize())

// -----------------------------------------------------------------------------

// FUNCTIONS
// -----------------------------------------------------------------------------

/**
 *
 * @param {*} user
 * @param {*} token
 */
function authJWT(user) {
  return sign({ user: user }, SECRET)
}

// Create a user object from the SAML response data.
const parseSAMLForUser = (user) => {
  let account = {}
  account.encodedSUID = user.EncodedSUID;
  account.suid = user.SUID;
  account.email = user.nameID;
  account.firstName = user.firstName;
  account.lastName = user.lastName;
  account.name = user.firstName + " " + user.lastName;
  account.session = user['oracle:cloud:identity:sessionid'];
  account.expires = userCookieExpires;
  return account;
}

// Create a user JWT cookie.
const createUserJWT = (res, user) => {
  let signed = authJWT(user);
  res.cookie(userCookieName, signed, {httpOnly: true, expire: userCookieExpires})
}

// -----------------------------------------------------------------------------

// ENDPOINTS
// -----------------------------------------------------------------------------

// Do the login.
app.get('/api/sso/login',
  passport.authenticate(saml.name, { session: false, failureRedirect: '/403' })
)

app.get('/api/sso/status',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user) {
      req.user.status = 1
      res.json(req.user)
    }
    else {
      res.json({status: 0})
    }
  }
)

// Logout.
app.get('/api/sso/logout', function(req, res) {
  res.clearCookie(userCookieName);
  req.logout()
  res.status(200)
  res.send("ok")
});

// Metadata for SAML Provider.
app.get('/api/sso/metadata',
  (req, res) => {
    res.type('application/xml');
    res.status(200)
    res.send(saml.generateServiceProviderMetadata(SAML_CERT))
  }
);

// Handle SAML callback at this path.
app.post('/api/sso/auth',
  passport.authenticate(saml.name, { session: false, failureRedirect: '/403' }),
  (req, res) => {
    let user = parseSAMLForUser(req.user);
    createUserJWT(res, user)
    res.redirect("/user/redirect")
  }
);

// -----------------------------------------------------------------------------
module.exports.handler = serverless(app)
