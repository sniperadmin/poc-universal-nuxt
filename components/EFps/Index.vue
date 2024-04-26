<script lang="ts">
export default defineComponent({
  name: 'EFps',

  data() {
    return {
      times: [] as Array<number>,
      fps: 0
    }
  },

  mounted() {
    this.tick()
  },

  methods: {

    tick() {
      const now = performance.now()

      while (this.times.length > 0 && this.times[0] <= now - 1000) {
        this.times.shift()
      }

      this.times.push(now)
      this.fps = this.times.length

      requestAnimationFrame(this.tick)
    }
  }
})
</script>

<template>
  <div
    color="dark"
    class="fps-counter"
  >
    {{ fps }}
  </div>
</template>

<style scoped lang="scss">
.fps-counter {
  position: fixed;
  top: 2.5em;
  right: .5em;
  z-index: 999;
  font-size: 2vmax;
  color: #77A11D;
  background-color: #fff;
  text-align: center;
  width: 2em;
  height: 2em;
  line-height: 2.1em;
  border-radius: 50%;
  border: .1em solid #77A11D;
  box-shadow:
    0 0 0 .1em #77A11D
}
</style>
