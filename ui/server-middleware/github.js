const axios = require('axios')

export default async function(req, res) {
  const code = req._parsedUrl.query.split('&')[0].replace('code=', '')
  try {
    const response = await axios.post(`https://webdevflow.herokuapp.com/login`, { code })
    const token = response.data.token
    res.writeHead(308, {
      Location: '/?token=' + token,
      'Cache-Control': 'no-cache'
    })
    res.end('/')
  } catch (e) {
    res.end('/')
  }
}
