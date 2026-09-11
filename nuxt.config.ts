import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Skyneon',
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/avatar.png' }
      ]
    }
  },
  appConfig: {
    title: 'Skyneon',
    slogan: 'Stay hungry, stay foolish.',
    avatar: '/avatar.png',
    email: 'skyneonmc@example.com',
    github: 'https://github.com/SkyNeonMC',
    domain: 'skyneonmc.github.io',
    buildPlatform: 'GitHub Pages',
    imageStorage: 'Local',
    softwareLicense: 'MIT',
    articleLicense: 'CC BY-NC-SA 4.0',
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/about',
        '/archive',
        '/links',
        '/tags/随笔',
        '/tags/技术分享',
        '/posts/hello-world',
        '/posts/markdown-demo'
      ]
    }
  },
  content: {
    highlight: {
      theme: 'github-dark'
    }
  }
})
