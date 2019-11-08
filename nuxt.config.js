import colors from 'vuetify/es5/util/colors'
import { fetchBlogRoutes } from './util/router'
require('dotenv').config()

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.APP_NAME,
    title: process.env.APP_NAME || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.APP_DESCRIPTION || ''
      },
      {
        hid: 'google-site-verification',
        name: 'google-site-verification',
        content: process.env.GOOGLE_SITE_VERIFICATION || ''
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: process.env.APP_NAME || ''
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: process.env.APP_URL || '' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: process.env.APP_NAME || ''
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: process.env.APP_DESCRIPTION || ''
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
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
    { src: '~/assets/scss/common.scss', lang: 'scss' }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/prism',
    '~/plugins/axios',
    { src: '~plugins/ga.js', mode: 'client' }
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.APP_URL,
    routes() {
      return fetchBlogRoutes().then((routes) => {
        return routes
      })
    }
  },
  generate: {
    fallback: true,
    routes() {
      return fetchBlogRoutes().then((routes) => {
        return routes
      })
    }
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    ['@nuxtjs/eslint-module', { fix: true }],
    '@nuxtjs/vuetify',
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
    '@nuxtjs/dotenv',
    '@nuxtjs/sitemap',
    ['@nuxtjs/pwa', { icon: false }]
  ],
  stylelint: {
    fix: true
  },
  markdownit: {
    injected: true,
    breaks: true,
    html: true,
    linkify: true,
    typography: true
  },
  manifest: {
    name: process.env.APP_NAME,
    lang: 'ja',
    start_url: '/',
    display: 'standalone'
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
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
    extend(config, ctx) {},
    terser: {
      terserOptions: {
        compress: { drop_console: true }
      }
    }
  },
  env: {
    APP_NAME: process.env.APP_NAME || '',
    APP_DESCRIPTION: process.env.APP_DESCRIPTION || '',
    APP_URL: process.env.APP_URL || '',
    MICROCMS_URL: process.env.MICROCMS_URL || '',
    MICROCMS_X_API_KEY: process.env.MICROCMS_X_API_KEY || '',
    MICROCMS_BLOG_ENDPOINT: process.env.MICROCMS_BLOG_ENDPOINT || '',
    MICROCMS_PROFILE_ENDPOINT: process.env.MICROCMS_PROFILE_ENDPOINT || '',
    GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION || '',
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID || 'UA-XXXXXXX',
    TWITTER_USER: process.env.TWITTER_USER || '',
    GITHUB_URL: process.env.GITHUB_URL || ''
  }
}
