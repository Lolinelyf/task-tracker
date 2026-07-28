<script setup lang="ts">
import BaseInput from '../common/BaseInput.vue'

defineProps<{
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <BaseInput
    :model-value="modelValue"
    type="text"
    placeholder="Поиск по названию..."
    @update:model-value="$emit('update:modelValue', $event)"
    class="max-w-sm"
  />
</template>
