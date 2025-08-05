<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="py-16 px-6 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-medium text-academic mb-4">Blog</h1>
        <p class="text-academic-light text-lg">
          Thoughts, insights, and academic discussions
        </p>
      </div>
    </section>

    <!-- Blog Posts -->
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
        
        <div v-else-if="blogPosts && blogPosts.length > 0" class="grid md:grid-cols-2 gap-8">
          <article 
            v-for="post in blogPosts" 
            :key="post._id"
            class="card-minimal"
          >
            <div v-if="post.image" class="h-48 bg-gray-100 rounded-lg mb-6 overflow-hidden">
              <img 
                :src="post.image" 
                :alt="post.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div v-else class="h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
              <svg class="w-12 h-12 text-academic-muted" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <div class="flex items-center space-x-2 text-sm text-academic-muted mb-3">
                <span>{{ formatDate(post.publishedAt) }}</span>
              </div>
              
              <h3 class="text-lg font-medium text-academic mb-3">
                {{ post.title }}
              </h3>
              
              <p class="text-academic-light text-sm leading-relaxed mb-4">
                {{ post.excerpt }}
              </p>
              
              <div class="flex items-center justify-between">
                <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2">
                  <span 
                    v-for="tag in post.tags.slice(0, 3)" 
                    :key="tag"
                    class="academic-badge"
                  >
                    {{ tag }}
                  </span>
                </div>
                
                <NuxtLink 
                  :to="`/blog/${post.slug}`"
                  class="text-academic hover:text-academic-light font-medium text-sm transition-colors"
                >
                  Read more →
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
        
        <div v-else class="text-center py-12">
          <svg class="w-12 h-12 text-academic-muted mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
          </svg>
          <h3 class="text-lg font-medium text-academic mb-2">No Blog Posts</h3>
          <p class="text-academic-muted text-sm">Add blog posts in Sanity Studio to see them here.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { blogPostsQuery } from '~/lib/queries'
import type { BlogPost } from '~/types/sanity'

// Fetch blog posts data
const { data: blogPosts, pending } = await useSanityQuery<BlogPost[]>(blogPostsQuery)

// Format date helper
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// SEO
useSeoMeta({
  title: 'Blog | Professor Wilson',
  description: 'Academic blog posts, insights, and discussions in mathematics.',
})
</script> 