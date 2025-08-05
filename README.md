# Professor Wilson Academic Portfolio

A sophisticated, modernist academic website for a distinguished professor featuring a Sanity CMS backend and Nuxt.js frontend.

## Project Structure

```
robin_wilson/
├── cms/                 # Sanity CMS backend
│   ├── schemaTypes/     # Content schemas
│   ├── static/          # Static assets
│   └── ...
├── frontend/            # Nuxt.js frontend
│   ├── components/      # Vue components
│   ├── pages/          # Page components
│   ├── assets/         # Styles and assets
│   └── ...
└── README.md           # This file
```

## Design Philosophy

This website features a sophisticated modernist design inspired by Bauhaus principles and Brooklyn design agency aesthetics:

- **Typography**: Elegant serif headings with refined spacing
- **Layout**: Clean, geometric layouts with sharp lines
- **Color Palette**: Sophisticated monochromatic palette
- **Interactions**: Subtle, refined hover effects
- **Academic Credibility**: Professional appearance appropriate for distinguished professors

## Features

### CMS (Sanity)
- Content management for professor profile
- Research areas and projects
- Publications and CV entries
- Course offerings
- Blog posts
- Image management

### Frontend (Nuxt.js)
- Responsive, modernist design
- SEO optimized
- Fast, static generation
- Academic-focused typography
- Sophisticated interactions

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd robin_wilson
   ```

2. **Install CMS dependencies**
   ```bash
   cd cms
   npm install
   ```

3. **Install Frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Development

1. **Start the CMS**
   ```bash
   cd cms
   npm run dev
   ```
   The Sanity Studio will be available at `http://localhost:3333`

2. **Start the Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   The website will be available at `http://localhost:3000`

### Building for Production

1. **Build the CMS**
   ```bash
   cd cms
   npm run build
   ```

2. **Build the Frontend**
   ```bash
   cd frontend
   npm run build
   ```

## Content Management

The CMS includes schemas for:
- **Professor Profile**: Name, title, bio, contact info
- **Research Areas**: Academic research focus areas
- **Publications**: Academic papers and publications
- **CV Entries**: Professional experience and education
- **Courses**: Teaching offerings
- **Blog Posts**: Academic insights and discussions

## Design System

The design system features:
- **Typography**: Georgia serif for headings, Inter sans-serif for body
- **Spacing**: 12-unit grid system with generous whitespace
- **Colors**: Sophisticated grays with deep blacks
- **Components**: Minimal cards with subtle interactions
- **Layout**: Clean, geometric layouts inspired by Bauhaus

## Technologies

- **CMS**: Sanity.io
- **Frontend**: Nuxt.js 3, Vue 3
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety
- **Deployment**: Vercel (frontend), Sanity (CMS)

## License

This project is for academic use and personal portfolio purposes.
