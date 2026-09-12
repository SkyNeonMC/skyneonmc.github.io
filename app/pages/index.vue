<script setup lang="ts">
const route = useRoute()
const currentPage = computed(() => {
  const p = parseInt(route.query.page as string || '1', 10)
  return isNaN(p) || p < 1 ? 1 : p
})

const pageSize = 8

const { data: totalCount } = await useAsyncData('posts-total', () => {
  return queryCollection('posts')
    .where('draft', '=', false)
    .count()
})

const totalPages = computed(() => {
  const t = totalCount.value ?? 0
  return Math.max(1, Math.ceil(t / pageSize))
})

const { data: articles } = await useAsyncData('posts-page-' + currentPage.value, () => {
  return queryCollection('posts')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .skip((currentPage.value - 1) * pageSize)
    .limit(pageSize)
    .all()
})

useHead({
  title: 'Skyneon'
})
</script>

<template>
  <div>
    <div class="page-header">
      <h1>文章</h1>
      <p>共 {{ totalCount ?? 0 }} 篇 · 第 {{ currentPage }}/{{ totalPages }} 页</p>
    </div>
    <div class="post-list">
      <ArticleCard
        v-for="a in articles"
        :key="a.path"
        :title="a.title"
        :date="a.date"
        :description="a.description"
        :tags="a.tags"
        :cover="a.cover"
        :path="a.path"
        :word-count="a.wordCount"
      />
    </div>
    <Pagination v-if="totalPages > 1" :page="currentPage" :total="totalPages" />
  </div>
</template>
