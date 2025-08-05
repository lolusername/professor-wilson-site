<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="py-24 px-8 bg-gray-50">
      <div class="max-w-5xl mx-auto">
        <h1 class="typography-hierarchy mb-6">Research</h1>
        <p class="typography-subtitle">
          Exploring the frontiers of mathematical knowledge and discovery
        </p>
      </div>
    </section>

    <!-- Research Areas -->
    <section class="py-32 px-8">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl font-light text-academic mb-16 tracking-tight">Research Areas</h2>
        
        <div v-if="pending" class="modernist-grid md:grid-cols-2">
          <div v-for="i in 3" :key="i" class="animate-pulse">
            <div class="h-64 bg-gray-200 mb-8"></div>
            <div class="h-8 bg-gray-200 rounded mb-4"></div>
            <div class="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
        
        <div v-else-if="researchAreas && researchAreas.length > 0" class="modernist-grid md:grid-cols-2">
          <div 
            v-for="area in researchAreas" 
            :key="area._id"
            class="card-minimal"
          >
            <div v-if="area.image" class="h-64 bg-gray-100 mb-8 overflow-hidden">
              <img 
                :src="area.image" 
                :alt="area.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div v-else class="h-64 bg-gray-100 mb-8 flex items-center justify-center">
              <svg class="w-16 h-16 text-academic-muted" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-light text-academic mb-6 tracking-tight">
                {{ area.name }}
              </h3>
              <p class="typography-body">
                {{ area.description }}
              </p>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-20">
          <svg class="w-16 h-16 text-academic-muted mx-auto mb-8" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clip-rule="evenodd"/>
          </svg>
          <h3 class="text-xl font-light text-academic mb-4 tracking-tight">No Research Areas</h3>
          <p class="typography-caption">Add research areas in Sanity Studio to see them here.</p>
        </div>
      </div>
    </section>

    <!-- Research Projects -->
    <section class="py-32 px-8 bg-gray-50">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl font-light text-academic mb-16 tracking-tight">Research Projects</h2>
        
        <div v-if="pending" class="elegant-spacing">
          <div v-for="i in 3" :key="i" class="animate-pulse">
            <div class="h-8 bg-gray-200 rounded mb-4"></div>
            <div class="h-6 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div class="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        
        <div v-else-if="researchProjects && researchProjects.length > 0" class="elegant-spacing">
          <div 
            v-for="project in researchProjects" 
            :key="project._id"
            class="card-minimal"
          >
            <div class="flex items-start justify-between mb-8">
              <div class="flex-1">
                <h3 class="text-xl font-light text-academic mb-6 tracking-tight">
                  {{ project.title }}
                </h3>
                <div class="flex items-center space-x-6 text-sm text-academic-muted mb-6">
                  <span class="academic-badge">
                    {{ project.status }}
                  </span>
                  <span>{{ formatDate(project.startDate) }}</span>
                  <span v-if="project.endDate">- {{ formatDate(project.endDate) }}</span>
                </div>
              </div>
              <div v-if="project.image" class="ml-8">
                <img 
                  :src="project.image" 
                  :alt="project.title"
                  class="w-24 h-24 object-cover sophisticated-border"
                />
              </div>
            </div>
            
            <p class="typography-body mb-6">
              {{ project.description }}
            </p>
            
            <div v-if="project.funding" class="mb-4">
              <span class="text-sm font-medium text-academic">Funding:</span>
              <span class="text-sm text-academic-light ml-3">{{ project.funding }}</span>
            </div>
            
            <div v-if="project.collaborators && project.collaborators.length > 0" class="mb-4">
              <span class="text-sm font-medium text-academic">Collaborators:</span>
              <span class="text-sm text-academic-light ml-3">{{ project.collaborators.join(', ') }}</span>
            </div>
            
            <div v-if="project.researchAreas && project.researchAreas.length > 0" class="flex flex-wrap gap-3">
              <span 
                v-for="area in project.researchAreas" 
                :key="area._id"
                class="academic-badge"
              >
                {{ area.name }}
              </span>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-20">
          <svg class="w-16 h-16 text-academic-muted mx-auto mb-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="text-xl font-light text-academic mb-4 tracking-tight">No Research Projects</h3>
          <p class="typography-caption">Add research projects in Sanity Studio to see them here.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { researchAreasQuery, researchProjectsQuery } from '~/lib/queries'
import type { ResearchArea, Research } from '~/types/sanity'

// Fetch research data
const { data: researchAreas, pending: areasPending } = await useSanityQuery<ResearchArea[]>(researchAreasQuery)
const { data: researchProjects, pending: projectsPending } = await useSanityQuery<Research[]>(researchProjectsQuery)

const pending = computed(() => areasPending.value || projectsPending.value)

// Format date helper
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  })
}

// SEO
useSeoMeta({
  title: 'Research | Professor Wilson',
  description: 'Explore research areas and projects in mathematics and related fields.',
})
</script> 