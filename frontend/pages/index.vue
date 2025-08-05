<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="hero-academic py-32 px-8">
      <div class="max-w-5xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-20 items-center">
          <!-- Professor Info -->
          <div class="elegant-spacing">
            <div v-if="pending" class="animate-pulse">
              <div class="h-16 bg-gray-200 rounded mb-6"></div>
              <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div class="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
            
            <div v-else-if="professor" class="elegant-spacing">
              <div>
                <h1 class="typography-hierarchy mb-6">
                  {{ professor.name }}
                </h1>
                <p class="typography-subtitle">
                  {{ professor.title }}
                </p>
              </div>
              
              <p class="typography-body">
                {{ professor.bio }}
              </p>
              
              <!-- Contact Info -->
              <div class="space-y-6">
                <div v-if="professor.email" class="flex items-center space-x-4">
                  <svg class="w-5 h-5 text-academic-muted" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <a :href="`mailto:${professor.email}`" class="text-academic hover:text-academic-light transition-all duration-300">
                    {{ professor.email }}
                  </a>
                </div>
                
                <div v-if="professor.office" class="flex items-center space-x-4">
                  <svg class="w-5 h-5 text-academic-muted" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-academic-light">{{ professor.office }}</span>
                </div>
              </div>
              
              <!-- Social Links -->
              <div v-if="professor.socialLinks && professor.socialLinks.length > 0" class="flex space-x-6">
                <a 
                  v-for="link in professor.socialLinks" 
                  :key="link.platform"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-academic-muted hover:text-academic transition-all duration-300"
                >
                  <span class="sr-only">{{ link.platform }}</span>
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path v-if="link.platform === 'linkedin'" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    <path v-else-if="link.platform === 'twitter'" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    <path v-else-if="link.platform === 'github'" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    <path v-else d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div v-else class="text-center">
              <h1 class="typography-hierarchy mb-6">
                Professor Wilson
              </h1>
              <p class="typography-subtitle">
                Welcome to my academic portfolio.
              </p>
              <p class="typography-caption mt-6">
                No professor data found. Please add content in Sanity Studio.
              </p>
            </div>
          </div>
          
          <!-- Professor Image -->
          <div class="flex justify-center lg:justify-end">
            <div v-if="professor?.image" class="relative">
              <img 
                :src="professor.image" 
                :alt="professor.imageAlt || professor.name"
                class="w-80 h-80 object-cover sophisticated-border"
              />
            </div>
            <div v-else class="w-80 h-80 bg-gray-100 sophisticated-border flex items-center justify-center">
              <svg class="w-20 h-20 text-academic-muted" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Research Areas Section -->
    <section v-if="professor?.researchAreas && professor.researchAreas.length > 0" class="py-32 px-8 bg-gray-50">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl font-light text-academic mb-16 tracking-tight">
          Research Areas
        </h2>
        <div class="modernist-grid md:grid-cols-2">
          <div 
            v-for="area in professor.researchAreas" 
            :key="area._id"
            class="card-minimal"
          >
            <h3 class="text-xl font-light text-academic mb-6 tracking-tight">
              {{ area.name }}
            </h3>
            <p class="typography-body">
              {{ area.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { professorQuery } from '~/lib/queries'
import type { Professor } from '~/types/sanity'

// Fetch professor data from Sanity
const { data: professor, pending } = await useSanityQuery<Professor>(professorQuery)

// SEO
useSeoMeta({
  title: professor.value?.name || 'Professor Wilson',
  description: professor.value?.bio || 'Academic portfolio of Professor Wilson',
  ogImage: professor.value?.image,
})
</script> 