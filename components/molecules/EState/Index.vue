<script setup lang="ts">
defineEmits(['click'])
</script>

<script lang="ts">
export default defineComponent({
  name: 'EState',

  props: {
    imageName: {
      type: String,
      default: 'empty'
    },
    title: {
      type: String,
      default: 'Title here!'
    },
    text: {
      type: String,
      default: 'Some text here'
    },
    btnLabel: {
      type: String,
      default: 'btn label here'
    },
    imageWidth: {
      type: [String, Number],
      default: '25%'
    },
    imageHeight: {
      type: [String, Number],
      default: undefined
    },
    withButton: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      default: null
    },
    btnOutlined: {
      type: Boolean,
      default: true
    },
    textCols: {
      type: [String, Number],
      default: undefined
    },
    btnCols: {
      type: [String, Number],
      default: undefined
    }
  }
})
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-img
          data-test="state-image"
          :width="imageWidth"
          :height="imageHeight"
          :src="`/svg/${imageName}.svg`"
          class="mx-auto"
          aspect-ratio="16/9"
          alt="journalist image"
          lazy-src="https://fakeimg.pl/400x400/cccccc/b8b8b8?text=Journalist&font=bebas"
        />
      </v-col>

      <v-col
        class="text-center mx-auto"
        cols="10"
      >
        <v-row justify="center">
          <v-col
            data-test="state-text-col"
            class="mx-auto"
            :cols="textCols ? textCols : 7"
          >
            <h5
              data-test="title"
              class="font-weight-bold mb-3 black--text text-h6"
            >
              {{ title }}
            </h5>
            <p class="text-body-1">
              {{ text }}
            </p>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        data-test="state-btn-col"
        class="mx-auto"
        :cols="btnCols ? btnCols : 4"
      >
        <v-row justify="center">
          <e-btn
            v-if="withButton"
            color="primary"
            rounded
            :outlined="btnOutlined"
            x-large
            data-test="state-btn"
            block
            :label="btnLabel"
            :to="to"
            @click="$emit('click', $event)"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
