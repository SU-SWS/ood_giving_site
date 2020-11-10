// lambda/utils/config.js
// Circumvent problem with Netlify CLI.
// https://github.com/netlify/netlify-dev-plugin/issues/147

let isDev = (process.env.NETLIFY_DEV === 'true' || process.env.NODE_ENV === 'development')
let localHost = (process.env.NETLIFY_DEV === 'true') ? 'localhost:64946' : 'localhost:8000'

exports.BASE_PROTOCOL = isDev ? 'http://' : "https://"
exports.BASE_URL = isDev ? localHost : process.env.BASE_URL
exports.COOKIE_SECURE = process.env.NODE_ENV !== 'development'
exports.SECRET = process.env.SECRET || '!S00P3R$ECR3T!'
exports.SAML_ENTRYPOINT = process.env.SAML_ENTRYPOINT || 'https://idcs-8368be3faf0542efbdb27ae2b33d5d80.identity.oraclecloud.com/fed/v1/idp/sso'
exports.SAML_ENTITYID = process.env.SAML_ENTITYID || 'http://localhost:64946'
