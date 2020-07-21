export default {
  env: {
    GITHUB_ID: process.env.GITHUB_ID || 'd1e3f0561f73a4d70cf0',
    GITHUB_SECRET: process.env.GITHUB_SECRET || 'bec2bb82948ac03e5b4fad71f06f0ea165333ea9',
    GITHUB_REDIRECT_URI: process.env.GITHUB_REDIRECT_URI || 'https://webdevflow.com/auth/callback',
    FB_APP_ID: process.env.FB_APP_ID,
    API_URL: process.env.API_URL || 'https://api.webdevflow.com'
  },
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'WebDevFlow - A linklog for Modern Web Developers',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Get hot news from the Modern Web Developers community!'
      },
      {
        property: 'fb:app_id',
        value: process.env.FB_APP_ID
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['vuetify/dist/vuetify.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/infiniteloading', ssr: false }, '~/plugins/disqus'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    {
      src: 'cookie-universal-nuxt',
      options: {}
    }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    prefix: '/api'
  },
  proxy: {
    '/api': {
      target: process.env.API_URL || 'https://api.webdevflow.com',
      pathRewrite: {
        '^/api': '/'
      }
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'token' },
          user: { url: '/me', method: 'get', propertyName: 'data' },
          logout: false
        }
      }
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#41B883'
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  serverMiddleware: [
    {
      path: '/rss.xml',
      handler: '~/server-middleware/rss.js'
    },
    {
      path: '/auth/callback',
      handler: '~/server-middleware/github.js'
    }
  ]
}
