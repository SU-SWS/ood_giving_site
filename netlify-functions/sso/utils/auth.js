const { sign } = require('jsonwebtoken')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const suSAML = require('passport-stanford')
const { SECRET } = require('./config')
const path = require('path')

function authJwt(email) {
  return sign(
    { user: { email } },
    SECRET
  )
}

passport.use(
  new passportJwt.Strategy(
    {
      jwtFromRequest(req) {
        if (!req.cookies) throw new Error('Missing cookie-parser middleware')
        return req.cookies.jwt
      },
      secretOrKey: SECRET,
    },
    async ({ user: { email } }, done) => {
      try {
        // Here you'd typically load an existing user
        // and use the data to create the JWT.
        const jwt = authJwt(email)

        return done(null, { email, jwt })
      } catch (error) {
        return done(error)
      }
    }
  )
)
