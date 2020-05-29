export default function({ $axios }) {
  if (process.browser) {
    $axios.onRequest((config) => {
      if (sessionStorage.token) {
        config.headers.authorization = `Bearer ${sessionStorage.token}`
      }
    })
  }
}
