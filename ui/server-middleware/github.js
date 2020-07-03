const axios = require('axios')

export default async function(req, res) {
  const code = req._parsedUrl.query.split('&')[0].replace('code=', '')
  console.log(code)
  try {
    const response = await axios.post(`https://webdevflow.herokuapp.com/login`, { code })
    console.log('SUCCESS')
    console.log(response)
    console.log(JSON.stringify(response.data, null, 2))
  } catch (e) {
    const error = e.response.data
    console.log('ERROR')
    console.log(JSON.stringify(error, null, 2))
  }
}
