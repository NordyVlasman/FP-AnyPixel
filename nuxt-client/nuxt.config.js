const webpack = require('webpack')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-client',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Laravel nuxt SPA' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#4CC1D1' },

  modules: [
      '@nuxtjs/auth',
      '@nuxtjs/axios',
      '@nuxtjs/pwa'
  ],

  axios: {
    baseURL: 'http://laravel-nuxt-spa.test/api'
  },
  auth: {
    'strategies': {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'meta.token'},
          user: { url: 'user', method: 'get', propertyName: 'data'},
          logout: { url: 'logout', method: 'post'}
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['jquery', 'bootstrap'],
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  css: ['./node_modules/bootstrap/dist/css/bootstrap.css'],

  plugins: [
    '~/plugins/bootstrap.js',
    '~/plugins/mixins/user.js'
  ]
}

