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
    title: "Promo Courses | Prabeen",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      },
      {
        hid: "og:title",
        name: "og:title",
        content: "Learn from amazing courses."
      },
      {
        hid: "og:image",
        name: "og:image",
        content:
          "https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"
      },
      {
        hid: "og:locale",
        name: "og:locale",
        content: "en-IN"
      },
      {
        hid: "og:url",
        name: "og:url",
        content: process.env.BASE_URL || "http://localhost:3000"
      },
      {
        hid: "og:type",
        name: "og:type",
        content: "website"
      },
      {
        hid: "og:locale",
        name: "og:locale",
        content: "en-IN"
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "You will find amazing courses you can learn from. My name is Prabeen Kumar Soreng and I'm a software developer."
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
