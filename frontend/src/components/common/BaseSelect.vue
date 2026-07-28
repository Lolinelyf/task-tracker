<script setup lang="ts">
defineProps<{
  id?: string
  label?: string
  modelValue: string
  options: Array<{ value: string; label: string }>
  disabled?: boolean
  error?: string
  size?: 'sm' | 'md'
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="text-sm font-medium text-neutral-700">
      {{ label }}
    </label>
    <select
      :id="id"
      :value="modelValue"
      :disabled="disabled"
      class="rounded-lg border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      :class="size === 'sm' ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-sm'"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <span v-if="error" class="text-sm text-red-500">{{ error }}</span>
  </div>
</template>
