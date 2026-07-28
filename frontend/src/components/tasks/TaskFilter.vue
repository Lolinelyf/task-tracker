<script setup lang="ts">
import BaseButton from '../common/BaseButton.vue'

defineProps<{
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const statuses = [
  { value: 'all', label: 'Все' },
  { value: 'todo', label: 'К выполнению' },
  { value: 'in-progress', label: 'В процессе' },
  { value: 'done', label: 'Готово' },
]
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <BaseButton
      v-for="status in statuses"
      :key="status.value"
      :variant="modelValue === status.value ? 'primary' : 'secondary'"
      size="sm"
      @click="$emit('update:modelValue', status.value)"
    >
      {{ status.label }}
    </BaseButton>
  </div>
</template>
