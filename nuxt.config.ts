// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  app: {
    head: {
      script: [
        {
          type: "text/javascript",
          src: "https://www.gstatic.com/charts/loader.js",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      dataSourceUrl:
        "https://docs.google.com/spreadsheets/d/1ByzJEbmbDGe6f_mUbg3MY5y4EJYSvy5_8qES0vcA1Cc/edit#gid=0",
    },
  },
})
