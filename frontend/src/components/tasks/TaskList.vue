<script setup lang="ts">
import { onMounted } from 'vue'
import { useTasksStore } from '../../stores/tasksStore'
import TaskCard from './TaskCard.vue'
import BaseButton from '../common/BaseButton.vue'
import { useNotification } from '../../composables/useNotification'

const tasksStore = useTasksStore()
const { show } = useNotification()

onMounted(() => {
  tasksStore.fetchTasks()
})

defineEmits<{
  (e: 'edit', id: number): void
  (e: 'delete', id: number): void
}>()

const handleChangeStatus = async (id: number, status: string) => {
  const result = await tasksStore.changeTaskStatus(id, status as 'todo' | 'in-progress' | 'done')

  if (result.success) {
    show('Статус задачи обновлен', 'success')
  } else {
    show(result.error || 'Ошибка изменения статуса', 'error')
  }
}
</script>

<template>
  <div class="space-y-3">
    <div v-if="tasksStore.loading" class="space-y-3">
      <div
        v-for="i in 3"
        :key="i"
        class="bg-white rounded-xl p-4 border border-neutral-200 animate-pulse"
      >
        <div class="h-5 bg-neutral-200 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-neutral-200 rounded w-1/2"></div>
      </div>
    </div>

    <div v-else-if="tasksStore.error" class="text-center py-8">
      <p class="text-red-500 mb-4">{{ tasksStore.error }}</p>
      <BaseButton variant="primary" size="sm" @click="tasksStore.fetchTasks()">
        Повторить
      </BaseButton>
    </div>

    <div v-else-if="!tasksStore.tasks.length" class="text-center py-8">
      <p class="text-neutral-500">Задачи не найдены</p>
    </div>

    <TaskCard
      v-else
      v-for="task in tasksStore.tasks"
      :key="task.id"
      :title="task.title"
      :description="task.description"
      :status="task.status"
      :priority="task.priority"
      :createdAt="task.createdAt"
      :changing-status="tasksStore.changingStatus"
      @edit="$emit('edit', task.id)"
      @delete="$emit('delete', task.id)"
      @change-status="(status) => handleChangeStatus(task.id, status)"
    />
  </div>
</template>
