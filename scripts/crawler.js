const activeEnv = process.env.NODE_ENV || "development"

require("dotenv").config({
  path: `.env.${activeEnv}`,
})
const fetch = require('node-fetch')
const baseUrl = 'https://crawler.algolia.com/api/1/'
const crawlerId = process.env.ALGOLIA_CRAWLER_ID

const token = `Basic ${Buffer.from(
  `${process.env.ALOGLIA_CRAWLER_USER_ID}:${process.env.ALGOLIA_CRAWLER_API_KEY}`
).toString('base64')}`;

async function reindex() {
  const res = await fetch(
    `${baseUrl}/crawlers/${crawlerId}/reindex`,
    {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      }
    }
  )
  return res
}

console.log('Starting crawl on Algolia search index...')
reindex().then((response) => {
  console.log(`Crawl Result: ${response.status} (${response.statusText})`)
})
