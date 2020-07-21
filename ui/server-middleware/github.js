const axios = require('axios')

export default async function(req, res) {
  const code = readCode(req)
  try {
    const url = process.env.API_URL || 'https://api.webdevflow.com'
    const response = await axios.post(`${url}/login`, { code })
    const token = response.data.token
    res.writeHead(308, {
      Location: '/?token=' + token,
      'Cache-Control': 'no-cache'
    })
    res.end('/')
  } catch (e) {
    let message = ''
    if (e.response && e.response.data) {
      message += JSON.stringify(e.response.data)
    } else {
      message += e.toString()
    }
    res.end(message)
  }
}

function readCode(req) {
  return req._parsedUrl.query
    .split('&')
    .find((item) => item.startsWith('code='))
    .replace('code=', '')
}
