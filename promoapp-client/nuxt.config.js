export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        // <script src="https://kit.fontawesome.com/7dec2fb76b.js" crossorigin="anonymous"></script>
        src: "https://kit.fontawesome.com/7dec2fb76b.js"
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: ["@/assets/scss/main.scss"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: `~/plugins/filters` },
    { src: `~/plugins/vuelidate` },
    { src: `~/plugins/integrations` },
    { src: `~/plugins/components` },
    { src: `~/plugins/tooltip` },
    { src: `~/plugins/paginate`, ssr: false },
    { src: `~/plugins/toasted`, ssr: false }
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    // "@nuxtjs/bulma",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "portal-vue/nuxt"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: "http://localhost:8000",
    credentials: true
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    }
  }
};
