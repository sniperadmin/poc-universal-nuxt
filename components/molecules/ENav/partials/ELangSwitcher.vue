<template>
  <client-only>
    <v-select
      id="language"
      v-model="localeSelection"
      type="select"
      :items="langs"
      background-color="transparent"
      class="mt-5"
      item-value="value.name"
      item-title="title.name"
      full-width
    >
      <template #item="{ item }">
        <v-list-item
          data-test="language-item"
          height="30"
          dense
          @click="handleClick(item.value.code)"
        >
          <template #prepend>
  <!--          <nuxt-img-->
  <!--            :src="item.value.flag"-->
  <!--            width="40px"-->
  <!--            height="25px"-->
  <!--          />-->
          </template>
          <v-list-item-title :class="item.value.name === 'Arabic' ? 'atom-font__arabic' : ''">
            {{ item.value.name === 'Arabic' ? 'العربية' : item.value.name }}
          </v-list-item-title>
        </v-list-item>
      </template>

      <template #selection="{ item }">
        <v-list-item
          dense
          max-height="10"
          class="pa-0"
        >
          <template #prepend>
  <!--          <nuxt-img-->
  <!--            :src="item.value.flag"-->
  <!--            width="40px"-->
  <!--            height="25px"-->
  <!--          />-->
          </template>
          <v-list-item-title class="text-body-2 font-weight-bold" :class="item.value.name === 'Arabic' ? 'atom-font__arabic' : ''">
            {{ item.value.name === 'Arabic' ? 'العربية' : item.value.name }}
          </v-list-item-title>
        </v-list-item>
      </template>

    </v-select>
  </client-only>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ELangSwitcher',
  data: () => ({
    // localeSelection: langs.find(lang => lang.code === vm.$i18n.locale),
    // font: 'Panton',
    // langs,
  }),
  methods: {
    // handleClick(code: string) {
    //   this.$i18n.setLocale(code)
    //   this.localeSelection = langs.find(lang => lang.code === code)
    //   this.font = this.localeSelection!.code === 'ar' ? 'Ge' : 'Panton'
    // }
  }
})
</script>

<script lang="ts" setup>
import {ref} from 'vue'
import { useI18n } from 'vue-i18n'
import { langs } from '@/utils/languages'

const { setLocale, locale } = useI18n()

const localeSelection = ref(langs.find(lang => lang.code === locale.value))
const font = ref('Panton')

const handleClick = (code: string) => {
  setLocale(code)
  localeSelection.value = langs.find(lang => lang.code === code)
  font.value = code === 'ar' ? 'Ge' : 'Panton'
}
</script>

<style scoped lang="scss">
@use "assets/variables" with (
  $font-family: v-bind(font),
);
</style>
