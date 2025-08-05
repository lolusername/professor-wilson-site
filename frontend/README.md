# Professor Wilson - Academic Portfolio Frontend

A modern, elegant academic portfolio built with **Nuxt 4**, **Vue 3**, **TypeScript**, and **Tailwind CSS**, powered by **Sanity CMS**.

## ✨ **Modern Vue/Nuxt Best Practices 2025**

This project demonstrates cutting-edge frontend development with:

- **Nuxt 4** with official scaffolding (`npx nuxi@latest init`)
- **Vue 3 Composition API** with `<script setup>` syntax
- **TypeScript** for type safety and better DX
- **Tailwind CSS** with component layers and utilities
- **ESLint** with official Nuxt configuration
- **Auto-imports** for Vue functions and composables
- **File-based routing** with typed pages
- **SSR/SSG** for optimal performance

## 🚀 **Quick Start**

### Prerequisites
- **Node.js 20+** (required for Nuxt 4)
- **npm** or **pnpm** package manager
- **Sanity Studio** running (see `../cms/`)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   Create a `.env` file in the root:
   ```bash
   # Sanity Configuration
   NUXT_PUBLIC_SANITY_PROJECT_ID=acnnui6u
   NUXT_PUBLIC_SANITY_DATASET=production
   NUXT_PUBLIC_SANITY_API_VERSION=2023-05-03
   
   # Site Configuration
   NUXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Start development:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## 🏗️ **Architecture & Best Practices**

### **Modern Vue 3 Patterns**
- **Composition API** with `<script setup>` syntax everywhere
- **Composables** for reusable logic (`useSanity`, `useAcademicCitation`)
- **Auto-imports** for Vue functions (no need to import `ref`, `computed`, etc.)
- **TypeScript** interfaces for type safety
- **Reactive patterns** with proper ref/reactive usage

### **Nuxt 4 Features**
- **File-based routing** with automatic page generation
- **Auto-imports** for components and composables
- **Built-in TypeScript** support
- **SSR/SSG** with Nitro engine
- **Image optimization** with `@nuxt/image`
- **SEO optimization** with `useSeoMeta`

### **Performance Optimizations**
- **Image optimization** with WebP format and responsive images
- **GROQ query caching** with `useAsyncData`
- **Component lazy loading** with async imports
- **CSS optimization** with Tailwind purging
- **Bundle splitting** and tree shaking

## 📁 **Project Structure**

```
frontend/
├── assets/css/             # Global styles with Tailwind
│   └── main.css           # Academic component library
├── components/            # Auto-imported Vue components
├── composables/           # Reusable composition functions
│   └── useSanity.ts       # Sanity client & image helpers
├── pages/                 # File-based routing
│   └── index.vue          # Homepage with modern patterns
├── public/                # Static assets
├── nuxt.config.ts         # Nuxt 4 configuration
├── package.json           # Dependencies with latest versions
└── eslint.config.mjs      # ESLint configuration
```

## 🎨 **Design System**

### **Academic Color Palette**
- **Primary Blue**: `#2563eb` (blue-600)
- **Academic Dark**: `#1e40af` (blue-800)
- **Paper Tones**: Gray scale for content
- **Accent Colors**: Green, purple, orange for categories

### **Typography**
- **Academic Headings**: Georgia serif font family
- **Body Text**: Inter sans-serif for readability
- **Code**: JetBrains Mono for technical content

### **Component Classes**
```css
.research-card          /* Academic research project cards */
.publication-item       /* Publication list entries */
.academic-badge         /* Status and category badges */
.btn-primary           /* Primary action buttons */
.btn-secondary         /* Secondary action buttons */
.academic-prose        /* Rich text content styling */
```

## 🔧 **Configuration**

### **Nuxt Config Highlights**
```typescript
export default defineNuxtConfig({
  // Nuxt 4 compatibility
  compatibilityDate: '2024-04-03',
  
  // Modern modules
  modules: [
    '@nuxt/eslint',     // ESLint integration
    '@nuxt/image',      // Image optimization
    '@nuxtjs/tailwindcss', // Tailwind CSS
    '@vueuse/nuxt',     // VueUse composables
  ],
  
  // TypeScript strict mode
  typescript: {
    strict: true,
    typeCheck: true
  },
  
  // Experimental features
  experimental: {
    typedPages: true,      // Type-safe routing
    viewTransition: true,  // Smooth transitions
  }
})
```

### **ESLint Configuration**
- **Stylistic rules** for consistent code formatting
- **Vue 3** and **TypeScript** support
- **Auto-fixing** on save
- **Nuxt-aware** linting rules

## 📊 **Performance Targets**

### **Lighthouse Scores**
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### **Core Web Vitals**
- **LCP**: < 2.5s (Large Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

## 🧩 **Key Composables**

### **`useSanity.ts`**
Modern Sanity integration following Vue 3 best practices:

```typescript
// Sanity client with runtime config
const client = useSanityClient()

// Optimized image URLs with WebP
const imageUrl = useSanityImageUrl(image, { 
  width: 800, 
  format: 'webp' 
})

// Type-safe GROQ queries with caching
const { data, pending } = await useSanityQuery(`
  *[_type == "professor"][0]{ ... }
`)

// Academic citation formatting
const { formatCitation } = useAcademicCitation()
```

## 🎯 **Development Workflow**

### **Best Practices Commands**
```bash
# Development with hot reload
npm run dev

# Type checking
npm run typecheck

# Linting and auto-fix
npm run lint:fix

# Production build
npm run build

# Preview production build
npm run preview
```

### **Code Style Guidelines**
1. **Use `<script setup>`** syntax for all components
2. **TypeScript everywhere** - no `any` types
3. **Composables** for reusable logic
4. **Auto-imports** - don't manually import Vue functions
5. **Component naming** - PascalCase for components
6. **CSS layers** - use `@layer` for organization

## 🚀 **Deployment**

### **Recommended Platforms**
1. **Vercel** (optimal for Nuxt 4)
2. **Netlify** (with Nuxt 3+ support)
3. **Railway** (full-stack deployment)

### **Environment Variables (Production)**
```bash
# Required
NUXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NUXT_PUBLIC_SANITY_DATASET=production
NUXT_PUBLIC_SITE_URL=https://yourdomain.com

# Optional
NUXT_SANITY_TOKEN=your_private_token
```

## 🧪 **What's Implemented**

✅ **Modern Vue 3 Setup**
- Composition API with `<script setup>`
- TypeScript with strict mode
- Auto-imports for better DX

✅ **Academic Design System**
- Elegant typography with serif headings
- Blue academic color palette
- Responsive component library

✅ **Sanity CMS Integration**
- Type-safe GROQ queries
- Optimized image handling
- Academic citation formatting

✅ **Performance Optimizations**
- SSR/SSG with Nitro
- Image optimization with WebP
- CSS purging and minification

✅ **Developer Experience**
- ESLint with auto-fixing
- TypeScript strict mode
- Hot module replacement

## 📚 **Learning Resources**

### **Vue 3 & Nuxt**
- [Vue 3 Documentation](https://vuejs.org/)
- [Nuxt 4 Documentation](https://nuxt.com/)
- [Vue 3 Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)

### **Modern Patterns**
- [Vue 3 Best Practices 2024](https://blog.vuejs.org/posts/vue-3-best-practices)
- [Nuxt 3 Performance Guide](https://nuxt.com/docs/guide/deploy/optimization)
- [TypeScript with Vue 3](https://vuejs.org/guide/typescript/overview.html)

---

**Built with ❤️ using modern Vue 3 and Nuxt 4 best practices for academic excellence.**
