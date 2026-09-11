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
  'linear-gradient(135deg, #a78bfa, #f472b6)',
  'linear-gradient(135deg, #60a5fa, #a78bfa)',
  'linear-gradient(135deg, #f472b6, #fb923c)',
  'linear-gradient(135deg, #34d399, #60a5fa)',
  'linear-gradient(135deg, #fbbf24, #f472b6)',
  'linear-gradient(135deg, #818cf8, #22d3ee)',
  'linear-gradient(135deg, #fb7185, #fbbf24)',
  'linear-gradient(135deg, #a3e635, #34d399)',
  'linear-gradient(135deg, #c084fc, #fb7185)',
  'linear-gradient(135deg, #38bdf8, #c084fc)',
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
