<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EArticle',
  props: {
    article: {
      type: String,
      default: null
    },
    truncateLength: {
      type: Number,
      default: 150
    }
  },
  data: () => ({}),
  methods: {
    truncate: (text: string, length: number, clamp?: string) => {
      return text.slice(0, length) +
        (length < text.length ? clamp || '...' : '')
    }
  }
})
</script>

<template>
  <article data-testid="article">
    {{ truncate(article, truncateLength) }}
  </article>
</template>

<style scoped>

</style>
