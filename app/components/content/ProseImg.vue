<script setup lang="ts">
// 覆盖 @nuxt/content 默认图片组件：默认懒加载 + 异步解码，文章多图时不阻塞首屏
const props = defineProps<{
  src?: string
  alt?: string
  title?: string
  width?: string | number
  height?: string | number
}>()
</script>

<template>
  <img
    :src="props.src"
    :alt="props.alt"
    :title="props.title"
    :width="props.width"
    :height="props.height"
    loading="lazy"
    decoding="async"
  />
</template>
