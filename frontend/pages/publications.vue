<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="py-16 px-6 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-medium text-academic mb-4">Publications</h1>
        <p class="text-academic-light text-lg">
          Academic publications and research contributions
        </p>
      </div>
    </section>

    <!-- Publications List -->
    <section class="py-16 px-6">
      <div class="max-w-4xl mx-auto">
        <div v-if="pending" class="space-y-8">
          <div v-for="i in 5" :key="i" class="animate-pulse">
            <div class="h-6 bg-gray-200 rounded mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        
        <div v-else-if="publications && publications.length > 0" class="space-y-8">
          <div 
            v-for="publication in publications" 
            :key="publication._id"
            class="publication-item"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-medium text-academic mb-3">
                  {{ publication.title }}
                </h3>
                <p class="text-academic-light text-sm mb-3">
                  {{ publication.authors.join(', ') }}
                </p>
                <div class="flex items-center space-x-4 text-sm text-academic-muted mb-4">
                  <span class="font-medium">{{ publication.journal }}</span>
                  <span>{{ publication.year }}</span>
                  <span v-if="publication.doi">
                    <a 
                      :href="`https://doi.org/${publication.doi}`" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="text-academic hover:text-academic-light transition-colors"
                    >
                      DOI: {{ publication.doi }}
                    </a>
                  </span>
                </div>
              </div>
              <div v-if="publication.pdf" class="ml-4">
                <a 
                  :href="publication.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="btn-secondary text-xs"
                >
                  <svg class="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clip-rule="evenodd"/>
                  </svg>
                  PDF
                </a>
              </div>
            </div>
            
            <p v-if="publication.abstract" class="text-academic-light text-sm leading-relaxed mb-4">
              {{ publication.abstract }}
            </p>
            
            <div v-if="publication.researchAreas && publication.researchAreas.length > 0" class="flex flex-wrap gap-2">
              <span 
                v-for="area in publication.researchAreas" 
                :key="area._id"
                class="academic-badge"
              >
                {{ area.name }}
              </span>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-12">
          <svg class="w-12 h-12 text-academic-muted mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="text-lg font-medium text-academic mb-2">No Publications</h3>
          <p class="text-academic-muted text-sm">Add publications in Sanity Studio to see them here.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { publicationsQuery } from '~/lib/queries'
import type { Publication } from '~/types/sanity'

// Fetch publications data
const { data: publications, pending } = await useSanityQuery<Publication[]>(publicationsQuery)

// SEO
useSeoMeta({
  title: 'Publications | Professor Wilson',
  description: 'Academic publications and research contributions in mathematics and related fields.',
})
</script> 