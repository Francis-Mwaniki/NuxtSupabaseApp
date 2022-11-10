export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss",'@nuxtjs/supabase'],
  // custom tailwindcss path
  tailwindcss: {
    cssPath: "~/assets/main.css",
  },
  // server config variable

  // register nitro plugin

  /// transpile  afew packages
  build: {},
});
