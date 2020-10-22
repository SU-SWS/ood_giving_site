// details: https://markus.oberlehner.net/blog/implementing-an-authentication-flow-with-passport-and-netlify-functions/

const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const passportJwt = require('passport-jwt');
const suSAML = require('passport-stanford')
const { COOKIE_SECURE, SECRET } = require('./utils/config')
const { sign } = require(`jsonwebtoken`);
const serverless = require('serverless-http')
const app = express()

// create a Stanford SAML Strategy and tell Passport to use it
const saml = new suSAML.Strategy({
  protocol: 'http://',
  host: 'localhost:64946',
  idp: 'itlab',
  entityId: 'https://github.com/SU-SWS/ood_giving_site',
  path: '/api/sso/auth',
  loginPath: '/api/sso/login',
  logoutUrl: '/api/sso/logout',
  passReqToCallback: true,
  decryptionPvkPath: path.resolve(__dirname, '../../certs/private.pem'),
  decryptionCertPath: path.resolve(__dirname, '../../certs/public.pem'),
  validateInResponseTo: false,
  passport: passport,
});

passport.use(saml);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: true,
  name: 'stanford_auth_token',
  cookie: {
    httpOnly: true,
    maxAge: 600000
  }
}));

app.use(passport.initialize())
app.use(passport.session())

const handleCallback = (req, res) => {

  let user = {
    name: req.user.displayName,
    firstName: req.user.givenName,
    email: req.user.email,
    uid: req.user.uid,
  }

  res
    .cookie('stanford_auth_user', JSON.stringify(user), { httpOnly: true, COOKIE_SECURE })
    .json({"user": user})
}

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

app.get(
  `/api/sso/status`,
  function(req, res) {
    if (req.isAuthenticated()) {
      res.json({"user": req.user})
    }
    else {
      res.json({"status": false})
    }
  }
)

app.get('/api/sso/login',
  passport.authenticate(saml.name,
    {
      failureRedirect: '/403',
      failureFlash: true,
      validateInResponseTo: false
    }
  )
);

app.get('/api/sso/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/api/sso/metadata',
  saml.metadata()
);

app.post('/api/sso/auth',
  passport.authenticate(saml.name,
    {
      failureRedirect: '/403',
      failureFlash: true,
      validateInResponseTo: false
    }
  ),
  handleCallback
);

module.exports.handler = serverless(app)
