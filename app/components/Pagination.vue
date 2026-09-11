<script setup lang="ts">
defineProps<{
  page: number
  total: number
}>()

const route = useRoute()

const buildQuery = (p: number) => {
  const q = { ...route.query }
  if (p > 1) {
    q.page = String(p)
  } else {
    delete q.page
  }
  return q
}

const pages = computed(() => {
  const result: (number | '...')[] = []
  const total = props.total
  const page = props.page
  if (total <= 7) {
    for (let i = 1; i <= total; i++) result.push(i)
  } else {
    result.push(1)
    if (page > 3) result.push('...')
    const start = Math.max(2, page - 1)
    const end = Math.min(total - 1, page + 1)
    for (let i = start; i <= end; i++) result.push(i)
    if (page < total - 2) result.push('...')
    result.push(total)
  }
  return result
})
</script>

<template>
  <nav class="pagination">
    <NuxtLink
      v-if="page > 1"
      :to="{ path: '/', query: buildQuery(page - 1) }"
      class="page-btn"
    >←</NuxtLink>
    <template v-for="(p, i) in pages" :key="i">
      <template v-if="p === '...'">
        <span class="page-btn" disabled>…</span>
      </template>
      <template v-else>
        <NuxtLink
          v-if="p !== page"
          :to="{ path: '/', query: buildQuery(p) }"
          class="page-btn"
        >{{ p }}</NuxtLink>
        <span v-else class="page-btn active">{{ p }}</span>
      </template>
    </template>
    <NuxtLink
      v-if="page < total"
      :to="{ path: '/', query: buildQuery(page + 1) }"
      class="page-btn"
    >→</NuxtLink>
  </nav>
</template>
