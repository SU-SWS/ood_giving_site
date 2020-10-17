// lambda/utils/config.js
// Circumvent problem with Netlify CLI.
// https://github.com/netlify/netlify-dev-plugin/issues/147
exports.BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:64946' : process.env.BASE_URL
exports.COOKIE_SECURE = process.env.NODE_ENV !== 'development'
exports.ENDPOINT = process.env.NODE_ENV === 'development' ? '/.netlify/functions' : '/api'
exports.SECRET = process.env.SECRET || 'SUP3RSECR3T!!!!'
