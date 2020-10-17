// details: https://markus.oberlehner.net/blog/implementing-an-authentication-flow-with-passport-and-netlify-functions/

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const suSAML = require('passport-stanford')
const serverless = require('serverless-http')
const morgan = require('morgan')
const { BASE_URL, COOKIE_SECURE, ENDPOINT, SECRET } = require('./utils/config')
const samlPath = '/api/passport/saml'
const path = require('path')
const app = express()

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: true,
  name: 'stanford',
  cookie: {
    httpOnly: true,
    maxAge: 600000
  }
}));
app.use(passport.initialize());
app.use(passport.session());

let saml = new suSAML.Strategy({
  protocol:           'http://',
  idp:                'itlab',
  entityId:           'https://github.com/SU-SWS/ood_giving_site',
  path:               samlPath,
  loginPath:          samlPath,
  passReqToCallback:  true,
  passport:           passport,
  forceAuthn:         true,
  decryptionPvkPath:  path.resolve(__dirname, '../certs/private.pem'),
  decryptionCertPath: path.resolve(__dirname, '../certs/public.pem'),
});

passport.use(saml);

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

app.get('/api/passport', function(req, res) {
  res.send("What auth scheme are you using?");
});

app.get(samlPath,
  passport.authenticate(saml.name),
  saml.return('/')
);

app.post(samlPath,
  passport.authenticate(saml.name),
  saml.return('/')
);

app.get('/api/passport/metadata',
  saml.metadata()
);

app.get('/api/passport/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/api/passport/bad', function (req, res, next) {
  next(new Error('BAD!!!'));
});

module.exports.handler = serverless(app)
