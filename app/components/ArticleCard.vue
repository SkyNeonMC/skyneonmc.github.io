<script setup lang="ts">
const props = defineProps<{
  title: string
  date: string | Date
  description?: string
  tags?: string[]
  cover?: string
  coverGradient?: string
  path: string
  wordCount?: number
}>()

const gradientPresets = [
  'linear-gradient(135deg, #0078d4, #2a8be0)',
  'linear-gradient(135deg, #004578, #0078d4)',
  'linear-gradient(135deg, #3a3a3a, #505050)',
  'linear-gradient(135deg, #0078d4, #004578)',
  'linear-gradient(135deg, #505050, #6a6a6a)',
  'linear-gradient(135deg, #1e5f99, #4086c5)',
  'linear-gradient(135deg, #2b2b2b, #4a4a4a)',
  'linear-gradient(135deg, #0062aa, #2a8be0)',
  'linear-gradient(135deg, #404040, #5a5a5a)',
  'linear-gradient(135deg, #0078d4, #1e1e1e)',
]

function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

const resolvedGradient = computed(() => {
  if (props.coverGradient) return props.coverGradient
  if (props.cover) return `url(${props.cover}) center/cover no-repeat`
  const idx = hashString(props.title) % gradientPresets.length
  return gradientPresets[idx]
})

function formatDate(d: string | Date) {
  const date = typeof d === 'string' ? new Date(d) : d
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
</script>

<template>
  <NuxtLink :to="path" class="article-card">
    <div class="card-cover-bg" :style="{ background: resolvedGradient }"></div>
    <div class="card-info">
      <h2 class="card-title">{{ title }}</h2>
      <div class="card-meta">
        <span class="card-date">{{ formatDate(date) }}</span>
        <span v-if="wordCount" class="card-badge">{{ wordCount }}字</span>
        <template v-if="tags && tags.length">
          <span v-for="tag in tags.slice(0, 3)" :key="tag" class="card-tag">#{{ tag }}</span>
        </template>
      </div>
      <p v-if="description" class="card-desc">{{ description }}</p>
    </div>
  </NuxtLink>
</template>
