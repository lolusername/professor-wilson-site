<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="py-16 px-6 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-medium text-academic mb-4">Curriculum Vitae</h1>
        <p class="text-academic-light text-lg">
          Academic and professional experience
        </p>
      </div>
    </section>

    <!-- CV Entries -->
    <section class="py-16 px-6">
      <div class="max-w-4xl mx-auto">
        <div v-if="pending" class="space-y-8">
          <div v-for="i in 5" :key="i" class="animate-pulse">
            <div class="h-6 bg-gray-200 rounded mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        
        <div v-else-if="cvEntries && cvEntries.length > 0" class="space-y-8">
          <div 
            v-for="entry in cvEntries" 
            :key="entry._id"
            class="card-minimal"
          >
            <div class="flex items-start space-x-6">
              <div v-if="entry.image" class="flex-shrink-0">
                <img 
                  :src="entry.image" 
                  :alt="entry.title"
                  class="w-16 h-16 object-cover rounded-lg border border-gray-200"
                />
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-lg font-medium text-academic">
                    {{ entry.title }}
                  </h3>
                  <span class="academic-badge">
                    {{ entry.type }}
                  </span>
                </div>
                
                <p class="text-academic-light font-medium mb-3">
                  {{ entry.organization }}
                </p>
                
                <div class="flex items-center space-x-4 text-sm text-academic-muted mb-4">
                  <span>{{ formatDate(entry.startDate) }}</span>
                  <span v-if="entry.endDate">- {{ formatDate(entry.endDate) }}</span>
                  <span v-else>- Present</span>
                  <span v-if="entry.location">{{ entry.location }}</span>
                </div>
                
                <p v-if="entry.description" class="text-academic-light text-sm leading-relaxed">
                  {{ entry.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-12">
          <svg class="w-12 h-12 text-academic-muted mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="text-lg font-medium text-academic mb-2">No CV Entries</h3>
          <p class="text-academic-muted text-sm">Add CV entries in Sanity Studio to see them here.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { cvEntriesQuery } from '~/lib/queries'
import type { CVEntry } from '~/types/sanity'

// Fetch CV data
const { data: cvEntries, pending } = await useSanityQuery<CVEntry[]>(cvEntriesQuery)

// Format date helper
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  })
}

// SEO
useSeoMeta({
  title: 'CV | Professor Wilson',
  description: 'Academic and professional experience and qualifications.',
})
</script> 