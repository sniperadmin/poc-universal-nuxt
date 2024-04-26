<script lang="ts">
import { defineComponent } from 'vue'
import { mdiAccountCircle } from '@mdi/js'

export default defineComponent({
  name: 'EAvatar',
  props: {
    imgSrc: {
      type: String,
      default: undefined
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: [String, Number],
      default: 48
    },
    tile: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: [String, Number, Boolean],
      default: true
    }
  },
  data: () => ({ mdiAccountCircle })
})
</script>

<template>
  <v-avatar
    :color="color"
    :size="size"
    :tile="tile"
    :rounded="rounded"
  >
    <v-icon
      v-if="!(imgSrc)"
      dark
      data-test="avatar-icon"
      :icon="mdiAccountCircle"
    />

    <img
      v-if="imgSrc && imgSrc.length"
      :src="imgSrc"
      alt="profile pic"
      data-test="avatar-img"
    >
    <!--    <span v-if="!(imgSrc)" class="white&#45;&#45;text text-h5">CJ</span>-->
  </v-avatar>
</template>

<style scoped>

</style>
