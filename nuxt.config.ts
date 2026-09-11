export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/main.css'],
  appConfig: {
    title: 'Skyneonmc Blog'
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/about', '/posts/hello-world', '/posts/markdown-demo']
    }
  },
  content: {
    highlight: {
      theme: 'github-dark'
    }
  }
})
