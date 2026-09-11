<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: '页面不存在', fatal: true })
}

useHead({ title: `${page.value.title ?? page.value.slug} · Skyneon` })
</script>

<template>
  <article class="article prose">
    <ContentRenderer :value="page" />
  </article>
</template>
