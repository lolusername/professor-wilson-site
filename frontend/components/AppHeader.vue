<template>
  <header class="nav-academic sticky top-0 z-50">
    <nav class="max-w-5xl mx-auto px-8 py-6">
      <div class="flex items-center justify-between">
        <!-- Logo/Name -->
        <NuxtLink to="/" class="text-xl font-light text-academic tracking-tight">
          {{ professor?.name || 'Professor Wilson' }}
        </NuxtLink>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-12">
          <NuxtLink 
            to="/" 
            class="text-academic-light hover:text-academic transition-all duration-300 text-sm tracking-wide uppercase"
            active-class="text-academic font-medium"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/research" 
            class="text-academic-light hover:text-academic transition-all duration-300 text-sm tracking-wide uppercase"
            active-class="text-academic font-medium"
          >
            Research
          </NuxtLink>
          <NuxtLink 
            to="/publications" 
            class="text-academic-light hover:text-academic transition-all duration-300 text-sm tracking-wide uppercase"
            active-class="text-academic font-medium"
          >
            Publications
          </NuxtLink>
          <NuxtLink 
            to="/cv" 
            class="text-academic-light hover:text-academic transition-all duration-300 text-sm tracking-wide uppercase"
            active-class="text-academic font-medium"
          >
            CV
          </NuxtLink>
          <NuxtLink 
            to="/courses" 
            class="text-academic-light hover:text-academic transition-all duration-300 text-sm tracking-wide uppercase"
            active-class="text-academic font-medium"
          >
            Courses
          </NuxtLink>
          <NuxtLink 
            to="/blog" 
            class="text-academic-light hover:text-academic transition-all duration-300 text-sm tracking-wide uppercase"
            active-class="text-academic font-medium"
          >
            Blog
          </NuxtLink>
        </div>
        
        <!-- Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 text-academic-light hover:text-academic transition-all duration-300"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden mt-6 pb-6 border-t border-gray-200">
        <div class="flex flex-col space-y-4 pt-6">
          <NuxtLink 
            to="/" 
            class="text-academic-light hover:text-academic transition-all duration-300 text-sm tracking-wide uppercase"
            active-class="text-academic font-medium"
            @click="mobileMenuOpen = false"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/research" 
            class="text-academic-light hover:text-academic transition-all duration-300 text-sm tracking-wide uppercase"
            active-class="text-academic font-medium"
            @click="mobileMenuOpen = false"
          >
            Research
          </NuxtLink>
          <NuxtLink 
            to="/publications" 
            class="text-academic-light hover:text-academic transition-all duration-300 text-sm tracking-wide uppercase"
            active-class="text-academic font-medium"
            @click="mobileMenuOpen = false"
          >
            Publications
          </NuxtLink>
          <NuxtLink 
            to="/cv" 
            class="text-academic-light hover:text-academic transition-all duration-300 text-sm tracking-wide uppercase"
            active-class="text-academic font-medium"
            @click="mobileMenuOpen = false"
          >
            CV
          </NuxtLink>
          <NuxtLink 
            to="/courses" 
            class="text-academic-light hover:text-academic transition-all duration-300 text-sm tracking-wide uppercase"
            active-class="text-academic font-medium"
            @click="mobileMenuOpen = false"
          >
            Courses
          </NuxtLink>
          <NuxtLink 
            to="/blog" 
            class="text-academic-light hover:text-academic transition-all duration-300 text-sm tracking-wide uppercase"
            active-class="text-academic font-medium"
            @click="mobileMenuOpen = false"
          >
            Blog
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { professorQuery } from '~/lib/queries'
import type { Professor } from '~/types/sanity'

// Fetch professor data for the header
const { data: professor } = await useSanityQuery<Professor>(professorQuery)

// Mobile menu state
const mobileMenuOpen = ref(false)
</script> 