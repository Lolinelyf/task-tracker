<script setup lang="ts">
import TaskCard from './TaskCard.vue'

const props = defineProps<{
  tasks: Array<{
    id: number
    title: string
    description: string
    status: string
    priority: string
    createdAt: string
  }>
}>()

defineEmits<{
  (e: 'edit', id: number): void
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <div class="space-y-3">
    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :title="task.title"
      :description="task.description"
      :status="task.status"
      :priority="task.priority"
      :createdAt="task.createdAt"
      @edit="$emit('edit', task.id)"
      @delete="$emit('delete', task.id)"
    />
  </div>
</template>
