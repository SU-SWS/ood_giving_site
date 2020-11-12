// lambda/utils/config.js
// Circumvent problem with Netlify CLI.
// https://github.com/netlify/netlify-dev-plugin/issues/147
exports.TOKEN_URL = process.env.MEGAPROFILE_TOKEN_URL === undefined ? 'https://ap-rtfv-d.stanford.edu/oauth2provider/token' : process.env.MEGAPROFILE_TOKEN_URL
exports.PROFILE_URL = process.env.MEGAPROFILE_PROFILE_URL === undefined ? 'https://ap-rtfv-d.stanford.edu/adaptfullprofile/' : process.env.MEGAPROFILE_PROFILE_URL
exports.CLIENT_ID = process.env.MEGAPROFILE_CLIENT_ID
exports.CLIENT_SECRET = process.env.MEGAPROFILE_CLIENT_SECRET

