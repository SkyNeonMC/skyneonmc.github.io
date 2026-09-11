<script setup lang="ts">
const route = useRoute()
const { data: article } = await useAsyncData('article-' + route.path, () => {
  return queryCollection('posts').path(route.path).first()
})

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: '文章不存在', fatal: true })
}

function formatDate(d: string | Date) {
  const date = typeof d === 'string' ? new Date(d) : d
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

useHead({
  title: article.value.title,
  meta: [
    { name: 'description', content: article.value.description ?? '' }
  ]
})
</script>

<template>
  <article class="article prose">
    <header class="article-header">
      <h1>{{ article.title }}</h1>
      <div class="article-meta">
        <span>{{ formatDate(article.date) }}</span>
        <span v-if="article.tags?.length">{{ article.tags.map((t: string) => '#' + t).join(' ') }}</span>
      </div>
    </header>
    <ContentRenderer :value="article" />
  </article>
</template>
