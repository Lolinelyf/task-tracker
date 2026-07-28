<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDebounce } from '../../composables/useDebounce'
import BaseInput from '../common/BaseInput.vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const search = ref(props.modelValue)
const debouncedSearch = useDebounce(search, 400)

watch(debouncedSearch, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <BaseInput v-model="search" type="text" placeholder="Поиск по названию..." class="max-w-sm" />
</template>
