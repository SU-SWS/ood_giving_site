// details: https://markus.oberlehner.net/blog/implementing-an-authentication-flow-with-passport-and-netlify-functions/

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const fetch = require('node-fetch')
const { Headers } = require('node-fetch');
const { PROFILE_URL, TOKEN_URL, CLIENT_ID, CLIENT_SECRET } = require('./utils/config')
const serverless = require('serverless-http')
const app = express()
var ClientOAuth2 = require('client-oauth2')

// -----------------------------------------------------------------------------

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

// -----------------------------------------------------------------------------

let megaTokenAuth = new ClientOAuth2({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  accessTokenUri: TOKEN_URL,
  scopes: []
})

/**
 * Fetches an access token using the client/secret provided.
 */
const tokenFetcher = async () => {

  let data = megaTokenAuth.credentials.getToken()
    .then((response) => {
      if (response && response.data && response.data.access_token) {
        return response.data
      }
      throw new Error("Response did not contain access token");
    })
    .catch((error) => {
      console.error(error.output)
      return { status: 400, msg: error.message }
    })

    return data
}

/**
 * Get profile data from MEGA PROFILE
 * @param {*} profileID
 */
const profileFetcher = async (profileID, token) => {
  const endpoint = PROFILE_URL + profileID
  const headers = new Headers({
    Authorization: 'Bearer ' + token
  });

  let data = fetch(
      endpoint,
      {
        headers: headers,
        timeout: 9000,
      }
    )
    .then(res => res.json())
    .then(body => {
      return body
    })
    .catch(error => {
      console.error(error.output)
      return false
    });

  return data
}

// ENDPOINTS
// -----------------------------------------------------------------------------

// Get stuff.
app.get(`/api/mega/token`,
  async (req, res) => {
    let data = await tokenFetcher()
    res.send(JSON.stringify(data))
  }
)

// Get profile data.
app.get(`/api/mega/profile/:profileId`,
  async (req, res) => {
    let profile = false
    let profileId = req.params.profileId
    let tokenData = await tokenFetcher()

    // If we get a token go and get the profile.
    if (tokenData && tokenData.access_token) {
      profile = await profileFetcher(profileId, tokenData.access_token)
    }

    // If we got a profile back send it to the browser.
    if (profile && profile.encodedSUID) {
      res.send(JSON.stringify(profile))
    }
    else {
      res
        .json({ error: true, status: 0, msg: profile.error })
    }
  }
)

// -----------------------------------------------------------------------------
module.exports.handler = serverless(app)
