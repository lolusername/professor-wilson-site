<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="py-16 px-6 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-medium text-academic mb-4">Courses</h1>
        <p class="text-academic-light text-lg">
          Teaching and course offerings
        </p>
      </div>
    </section>

    <!-- Courses List -->
    <section class="py-16 px-6">
      <div class="max-w-4xl mx-auto">
        <div v-if="pending" class="grid md:grid-cols-2 gap-8">
          <div v-for="i in 6" :key="i" class="animate-pulse">
            <div class="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div class="h-6 bg-gray-200 rounded mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        
        <div v-else-if="courses && courses.length > 0" class="grid md:grid-cols-2 gap-8">
          <div 
            v-for="course in courses" 
            :key="course._id"
            class="card-minimal"
          >
            <div v-if="course.image" class="h-48 bg-gray-100 rounded-lg mb-6 overflow-hidden">
              <img 
                :src="course.image" 
                :alt="course.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div v-else class="h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
              <svg class="w-12 h-12 text-academic-muted" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
            </div>
            <div>
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-medium text-academic">
                  {{ course.code }}
                </h3>
                <span class="academic-badge">
                  {{ course.credits }} credits
                </span>
              </div>
              
              <h4 class="text-lg font-medium text-academic mb-3">
                {{ course.title }}
              </h4>
              
              <p class="text-academic-light text-sm leading-relaxed mb-4">
                {{ course.description }}
              </p>
              
              <div class="flex items-center justify-between text-sm text-academic-muted">
                <span class="capitalize">{{ course.semester }}</span>
                <span>{{ course.year }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-12">
          <svg class="w-12 h-12 text-academic-muted mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
          </svg>
          <h3 class="text-lg font-medium text-academic mb-2">No Courses</h3>
          <p class="text-academic-muted text-sm">Add courses in Sanity Studio to see them here.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { coursesQuery } from '~/lib/queries'
import type { Course } from '~/types/sanity'

// Fetch courses data
const { data: courses, pending } = await useSanityQuery<Course[]>(coursesQuery)

// SEO
useSeoMeta({
  title: 'Courses | Professor Wilson',
  description: 'Teaching courses and educational offerings in mathematics.',
})
</script> 