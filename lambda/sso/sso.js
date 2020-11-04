// details: https://markus.oberlehner.net/blog/implementing-an-authentication-flow-with-passport-and-netlify-functions/

const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const passportJwt = require('passport-jwt');
const suSAML = require('passport-stanford')
const { COOKIE_SECURE, SECRET, BASE_PROTOCOL, BASE_URL, PRIVATE_PEM, PUBLIC_PEM } = require('./utils/config')
const { sign } = require(`jsonwebtoken`);
const serverless = require('serverless-http')
const app = express()

// create a Stanford SAML Strategy and tell Passport to use it
// -----------------------------------------------------------------------------
const saml = new suSAML.Strategy({
  protocol: BASE_PROTOCOL,
  host: BASE_URL,
  idp: 'itlab',
  entityId: 'https://stanford-giving-auth-preview.netlify.app',
  path: '/api/sso/auth',
  loginPath: '/api/sso/login',
  logoutUrl: '/api/sso/logout',
  forceAuthn: true,
  passReqToCallback: true,
  decryptionCert: PRIVATE_PEM,
  decryptionPvk: PUBLIC_PEM,
  validatedInResponseTo: false,
  passport: passport,
});

passport.use(saml);
// -----------------------------------------------------------------------------

// JWT
// -----------------------------------------------------------------------------
passport.use(
  new passportJwt.Strategy(
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

// -----------------------------------------------------------------------------

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: true,
  name: 'saml_auth_token',
  cookie: {
    httpOnly: true,
    maxAge: 600000
  }
}));

app.use(passport.initialize())
app.use(passport.session())
// -----------------------------------------------------------------------------

// FUNCTIONS
// -----------------------------------------------------------------------------

/**
 *
 * @param {*} req
 * @param {*} res
 */
const handleCallback = (req, res) => {

  let user = {
    name: req.user.displayName,
    firstName: req.user.givenName,
    email: req.user.email,
    uid: req.user.uid,
    token: req.cookies.saml_auth_token
  }

  res
    .cookie('stanford_auth_token', req.cookies.saml_auth_token, { httpOnly: true, COOKIE_SECURE, maxAge: 600000 })
    .cookie('stanford_jwt', authJwt(user), { httpOnly: true, COOKIE_SECURE, maxAge: 600000 })
    .redirect("/user/redirect")
}

/**
 *
 * @param {*} user
 * @param {*} token
 */
function authJwt(user) {
  return sign({ user: user }, SECRET)
}
// -----------------------------------------------------------------------------

// PASSPORT FUNCTIONS
// -----------------------------------------------------------------------------

passport.serializeUser(function(user, done){
  done(null, JSON.stringify(user));
});

passport.deserializeUser(function(json, done){
  try {
    done(null, JSON.parse(json));
  } catch (err) {
    done(err, null);
  }
});
// -----------------------------------------------------------------------------

// ENDPOINTS
// -----------------------------------------------------------------------------

// Validate logged in status.
app.get(`/api/sso/status`,
  passport.authenticate('jwt', { session: false }),
  (req, res) => res.json(req.user)
)

// Do the login.
app.get('/api/sso/login', passport.authenticate(saml.name,
  {
    failureRedirect: '/403',
    failureFlash: true
  }
));

// Logout.
app.get('/api/sso/logout', function(req, res) {
  req.logout();
  res.clearCookie("saml_auth_token");
  res.clearCookie("stanford_auth_token");
  res.clearCookie("stanford_jwt");
  req.session.destroy(); // Deletes the session in memory.
  req.session = null; // Deletes the cookie.
  res.redirect("/");
});

// Metadata for SAML Provider.
app.get('/api/sso/metadata',
  saml.metadata()
);

// Handle SAML callback at this path.
app.post('/api/sso/auth',
  passport.authenticate(saml.name,
    {
      failureRedirect: '/403',
      failureFlash: true
    }
  ),
  handleCallback
);

// -----------------------------------------------------------------------------
module.exports.handler = serverless(app)
