// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Enable Nuxt 4 compatibility mode
  compatibilityDate: '2024-04-03',
  
    // Development tools
  devtools: { enabled: true },

  // Pages directory is enabled by default in Nuxt 4

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false  // Disable for now to avoid vue-tsc dependency issue
  },

  // Modules for the academic portfolio
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
  ],

  // ESLint configuration
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: false,
      },
    },
  },

  // CSS configuration will be handled by Tailwind module

  // Image optimization
  image: {
    domains: ['cdn.sanity.io'],
    sanity: {
      projectId: 'acnnui6u',
    },
  },

  // Runtime configuration for Sanity
  runtimeConfig: {
    // Private keys (server-side only)
    sanityToken: '', // NUXT_SANITY_TOKEN
    
    // Public keys (client-side)
    public: {
      sanityProjectId: 'acnnui6u',
      sanityDataset: 'production',
      sanityApiVersion: '2023-05-03',
      siteUrl: 'http://localhost:3000',
    }
  },

  // App configuration
  app: {
    head: {
      titleTemplate: '%s | Professor Wilson',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#1e40af' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  // Experimental features for better performance
  experimental: {
    typedPages: true,
    viewTransition: true,
  },

  // SSR configuration
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml']
    }
  },
})