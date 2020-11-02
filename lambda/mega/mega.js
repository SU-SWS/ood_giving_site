// details: https://markus.oberlehner.net/blog/implementing-an-authentication-flow-with-passport-and-netlify-functions/

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const passport = require('passport')
const OAuth2Strategy  = require('passport-oauth2').Strategy
const { COOKIE_SECURE, SECRET } = require('./utils/config')
const serverless = require('serverless-http')
const app = express()

// -----------------------------------------------------------------------------

passport.use(new OAuth2Strategy(
  {
    authorizationURL: 'https://ap-rtfv-d.stanford.edu/oauth2provider/authorize',
    tokenURL: 'https://ap-rtfv-d.stanford.edu/oauth2provider/token',
    clientID: "adv",
    clientSecret: "testing",
    callbackURL: "http://localhost:64946/api/mega/ret",
    response_type: "token",
    passReqToCallback: true
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken)
    console.log(refreshToken)
    console.log(cb)
    console.log(profile)
  }
));

// -----------------------------------------------------------------------------

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
// -----------------------------------------------------------------------------


// ENDPOINTS
// -----------------------------------------------------------------------------

// Get stuff
app.get(`/api/mega/get`,
  passport.authenticate('oauth2')
)

// Get stuff
app.all(`/api/mega/ret`,
  (req, res) => {
    console.log(req)
    console.log(res)
    res.send(JSON.stringify({status: "done"}))
  }
)

// -----------------------------------------------------------------------------
module.exports.handler = serverless(app)


