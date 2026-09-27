<script setup lang="ts">
import { computed, ref } from 'vue'

const site = useAppConfig() as { neteasePlaylist?: string }

const playlistId = computed(() => (site.neteasePlaylist || '').trim())
const expanded = ref(true)

const iframeSrc = computed(() =>
  `https://music.163.com/outchain/player?type=0&id=${playlistId.value}&auto=0&height=380`
)
</script>

<template>
  <div class="widget music-widget">
    <h3 class="widget-title">音乐</h3>
    <iframe
      v-if="playlistId && expanded"
      class="music-iframe"
      :src="iframeSrc"
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="0"
      width="100%"
      height="400"
      loading="lazy"
      allow="autoplay; encrypted-media"
    ></iframe>
    <button class="tech-expand-btn" @click="expanded = !expanded">
      {{ expanded ? '收起播放器' : '展开播放器' }}
    </button>
  </div>
</template>
