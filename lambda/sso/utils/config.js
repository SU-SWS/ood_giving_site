// lambda/utils/config.js
// Circumvent problem with Netlify CLI.
// https://github.com/netlify/netlify-dev-plugin/issues/147

exports.BASE_PROTOCOL = process.env.NODE_ENV === 'development' ? 'http//' : "https://"
exports.BASE_URL = process.env.NODE_ENV === 'development' ? 'localhost:64946' : process.env.BASE_URL
exports.COOKIE_SECURE = process.env.NODE_ENV !== 'development'
exports.SECRET = process.env.SECRET || '!S00P3R$ECR3T!'
exports.PRIVATE_PEM = process.env.PRIVATE_PEM
exports.PUBLIC_PEM = process.env.PUBLIC_PEM

console.log(process.env)
