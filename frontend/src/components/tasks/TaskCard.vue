<script setup lang="ts">
import BaseButton from '../common/BaseButton.vue'
import BaseSelect from '../common/BaseSelect.vue'

defineProps<{
  title: string
  description: string
  status: string
  priority: string
  createdAt: string
  changingStatus?: boolean
}>()

defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
  (e: 'changeStatus', status: string): void
}>()

const getStatusLabel = (status: string) => {
  const map: Record<string, string> = {
    todo: 'К выполнению',
    'in-progress': 'В процессе',
    done: 'Готово',
  }
  return map[status] || status
}

const getStatusColor = (status: string) => {
  const map: Record<string, string> = {
    todo: 'bg-neutral-100 text-neutral-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    done: 'bg-green-100 text-green-700',
  }
  return map[status] || 'bg-neutral-100 text-neutral-700'
}

const getPriorityLabel = (priority: string) => {
  const map: Record<string, string> = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
  }
  return map[priority] || priority
}

const getPriorityColor = (priority: string) => {
  const map: Record<string, string> = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
  }
  return map[priority] || 'bg-neutral-100 text-neutral-700'
}

const statusOptions = [
  { value: 'todo', label: 'К выполнению' },
  { value: 'in-progress', label: 'В процессе' },
  { value: 'done', label: 'Готово' },
]
</script>

<template>
  <div
    class="bg-white rounded-xl p-4 border border-neutral-200 hover:border-neutral-300 transition-colors"
  >
    <!-- Верхняя часть: заголовок + теги -->
    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
      <div class="flex-1 min-w-0">
        <h3 class="font-medium text-neutral-900 truncate">{{ title }}</h3>
        <p class="text-sm text-neutral-600 mt-1 line-clamp-2">
          {{ description || 'Без описания' }}
        </p>
      </div>
      <div class="flex items-center gap-2 flex-shrink-0">
        <span
          class="text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap"
          :class="getPriorityColor(priority)"
        >
          {{ getPriorityLabel(priority) }}
        </span>
        <span
          class="text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap"
          :class="getStatusColor(status)"
        >
          {{ getStatusLabel(status) }}
        </span>
      </div>
    </div>

    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 pt-3 border-t border-neutral-100"
    >
      <span class="text-xs text-neutral-500">{{ createdAt }}</span>

      <div class="flex flex-wrap items-center gap-2">
        <BaseSelect
          :model-value="status"
          :options="statusOptions"
          size="sm"
          :disabled="changingStatus"
          class="w-24"
          @update:model-value="$emit('changeStatus', $event)"
        />

        <BaseButton variant="secondary" size="sm" @click="$emit('edit')">
          Редактировать
        </BaseButton>
        <BaseButton variant="secondary" size="sm" @click="$emit('delete')"> Удалить </BaseButton>
      </div>
    </div>
  </div>
</template>
