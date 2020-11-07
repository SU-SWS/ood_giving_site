// details: https://markus.oberlehner.net/blog/implementing-an-authentication-flow-with-passport-and-netlify-functions/

const { COOKIE_SECURE, SECRET, BASE_PROTOCOL, BASE_URL, SAML_CERT} = require('./utils/config')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const serverless = require('serverless-http')
const passport = require('passport')
const passportJWT = require('passport-jwt');
const passportSAML = require('passport-saml')
const { sign } = require(`jsonwebtoken`);
const app = express()
let user = {}

// SAML Strategy for OIDCS
const saml = new passportSAML.Strategy(
  {
    protocol: BASE_PROTOCOL,
    host: BASE_URL,
    callbackUrl: BASE_PROTOCOL + BASE_URL + '/api/sso/auth',
    issuer: 'https://stanford-giving-auth-preview.netlify.app',
    entryPoint: 'https://idcs-8368be3faf0542efbdb27ae2b33d5d80.identity.oraclecloud.com/fed/v1/idp/sso',
    path: '/api/sso/auth',
    loginPath: '/api/sso/login',
    logoutUrl: '/api/sso/logout',
    passReqToCallback: true,
    validatedInResponseTo: false,
    passport: passport,
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
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// JWT
// -----------------------------------------------------------------------------
passport.use(
  new passportJWT.Strategy(
    {
      jwtFromRequest(req) {
        if (!req.cookies) throw new Error('Missing cookie-parser middleware')
        return req.cookies.stanford_jwt
      },
      secretOrKey: SECRET,
      passReqToCallback: true
    },
    async (req, payload, done) => {
      try {
        if (typeof payload.user == "object") {
          if (payload.user.token === req.cookies.stanford_auth_token) {
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
function authJwt(user) {
  return sign({ user: user }, SECRET)
}
// -----------------------------------------------------------------------------

// ENDPOINTS
// -----------------------------------------------------------------------------

// Do the login.
app.get('/api/sso/login',
  passport.authenticate(saml.name, { failureRedirect: '/403', failureFlash: true })
)

// Logout.
app.get('/api/sso/logout', function(req, res) {
  // res.clearCookie("saml_auth_token");
  // res.clearCookie("stanford_auth_token");
  // res.clearCookie("stanford_jwt");
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
  passport.authenticate(saml.name, { failureRedirect: '/403', failureFlash: true }),
  (req, res) => {
    console.log(req.user)
    let user = req.user
    res.json(user)
    // do stuff with response.
  }
);

// -----------------------------------------------------------------------------
module.exports.handler = serverless(app)
