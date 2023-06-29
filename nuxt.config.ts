// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  // nitro: {
  //   preset: 'aws-lambda'
  // },
  // app: {
  //   cdnURL: 'https://d2g41s5r51ibtk.cloudfront.net',
  // }
});
