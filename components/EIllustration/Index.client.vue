<script lang="ts" setup>
defineProps({
  imageName: {
    type: String,
  default: 'empty'
  }
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'EIllustration'
})
</script>

<template>
  <!-- TODO: Make an atom for importing all illustrations -->
  <v-img
    data-test="state-image"
    class="mx-auto"
    width="280"
    height="300"
    eager
    :src="`/svg/${imageName}.svg`"
    :alt="imageName"
    lazy-src="https://placehold.co/280x300"
  />
</template>

<style scoped></style>
