// details: https://markus.oberlehner.net/blog/implementing-an-authentication-flow-with-passport-and-netlify-functions/

const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const suSAML = require('passport-stanford')
const serverless = require('serverless-http')
const util = require('util')
require('./utils/auth')
const { COOKIE_SECURE, SECRET } = require('./utils/config')
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
  forceAuthn: true,
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
  res.cookie('jwt', req.user.jwt, { httpOnly: true, COOKIE_SECURE }).redirect('/')
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

app.get(`/api/sso/status`, passport.authenticate('jwt', { session: false }), (req, res) =>
  res.json({ email: req.user.email })
)

app.get('/api/sso/login',
  passport.authenticate(saml.name,
    {
      failureRedirect: '/',
      failureFlash: true,
      validateInResponseTo: false
    }
  ),
  function(req, res) {
    res.redirect('/');
  }
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
      failureRedirect: '/',
      failureFlash: true,
      validateInResponseTo: false
    }
  ),
  handleCallback
);

module.exports.handler = serverless(app)
