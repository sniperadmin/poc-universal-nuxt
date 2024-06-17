<script lang="ts" setup>
defineProps({
  article: {
    type: String,
    required: true
  },
  truncateLength: {
    type: Number,
    default: 150
  }
})

const truncate = (text: string, length: number, clamp?: string) => {
  return text.slice(0, length) +
  (length < text.length ? clamp || '...' : '')
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EArticle'
})
</script>

<template>
  <article data-testid="article">
    {{ truncate(article, truncateLength) }}
  </article>
</template>

<style scoped>

</style>
