<template>
  <e-select
    id="language"
    v-model="localeSelection"
    type="select"
    :items="langs"
    background-color="transparent"
    class="mt-5"
    item-text="value.name"
    item-value="value.code"
    full-width
    :menu-props="{ bottom: true, offsetY: true, closeOnContentClick: true }"
  >
    <template #item="{ item }">
      <v-list-item
        data-test="language-item"
        height="30"
        dense
        :to="setLocale(item.value.code)"
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
        <v-list-item-title class="text-body-2 font-weight-bold">
          {{ item.value.name === 'Arabic' ? 'العربية' : item.value.name }}
        </v-list-item-title>
      </v-list-item>
    </template>
  </e-select>
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
import { useI18n } from 'vue-i18n'
import { langs } from '~/utils/languages'

const { setLocale, locale } = useI18n()

const localeSelection = ref(langs.find(lang => lang.code === locale.value))
const font = ref('Panton')

const handleClick = (code: string) => {
  setLocale(code)
  localeSelection.value = langs.find(lang => lang.code === code)
  font.value = localeSelection.value!.code === 'ar' ? 'Ge' : 'Panton'
}
</script>

<style scoped lang="scss">
@use "assets/variables" with (
  $font-family: v-bind(font),
);
</style>
