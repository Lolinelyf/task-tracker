<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTasksStore } from '../stores/tasksStore'
import { useNotification } from '../composables/useNotification'
import TaskList from '../components/tasks/TaskList.vue'
import TaskSearch from '../components/tasks/TaskSearch.vue'
import TaskFilter from '../components/tasks/TaskFilter.vue'
import Pagination from '../components/Pagination.vue'
import BaseButton from '../components/common/BaseButton.vue'
import BaseModal from '../components/common/BaseModal.vue'
import BaseConfirmModal from '../components/common/BaseConfirmModal.vue'
import TaskForm from '../components/tasks/TaskForm.vue'
import type { Task } from '../types'

const router = useRouter()
const tasksStore = useTasksStore()
const { show } = useNotification()

const search = ref('')
const statusFilter = ref('all')

const modalOpen = ref(false)
const editingTask = ref<Task | null>(null)

const confirmModalOpen = ref(false)
const deletingTaskId = ref<number | null>(null)

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

tasksStore.fetchTasks()

const handleCreateTask = async (data: {
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
}) => {
  const result = await tasksStore.createTask(data)

  if (result.success) {
    modalOpen.value = false
    show('Задача создана', 'success')
  } else {
    show(result.error || 'Ошибка создания задачи', 'error')
  }
}

const handleEditTask = (id: number) => {
  const task = tasksStore.tasks.find((t) => t.id === id)
  if (task) {
    editingTask.value = task
    modalOpen.value = true
  }
}

const handleUpdateTask = async (data: {
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
}) => {
  if (!editingTask.value) return

  const result = await tasksStore.updateTask(editingTask.value.id, data)

  if (result.success) {
    modalOpen.value = false
    editingTask.value = null
    show('Задача обновлена', 'success')
  } else {
    show(result.error || 'Ошибка обновления задачи', 'error')
  }
}

const handleCloseModal = () => {
  modalOpen.value = false
  editingTask.value = null
}

const handleDeleteTask = (id: number) => {
  deletingTaskId.value = id
  confirmModalOpen.value = true
}

const handleConfirmDelete = async () => {
  if (deletingTaskId.value === null) return

  const result = await tasksStore.deleteTask(deletingTaskId.value)

  if (result.success) {
    confirmModalOpen.value = false
    deletingTaskId.value = null
    show('Задача удалена', 'success')
  } else {
    show(result.error || 'Ошибка удаления задачи', 'error')
  }
}

const handleCancelDelete = () => {
  confirmModalOpen.value = false
  deletingTaskId.value = null
}

const handleFormSubmit = (data: {
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
}) => {
  if (editingTask.value) {
    handleUpdateTask(data)
  } else {
    handleCreateTask(data)
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50">
    <header class="bg-white border-b border-neutral-200 px-4 py-4">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <h1 class="text-xl font-bold text-neutral-900">Задачи</h1>
        <div class="flex items-center gap-4">
          <BaseButton variant="primary" size="sm" @click="modalOpen = true">
            + Новая задача
          </BaseButton>
          <BaseButton variant="secondary" size="sm" @click="logout"> Выйти </BaseButton>
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-6">
      <div class="flex flex-col sm:flex-row gap-4 mb-6">
        <TaskSearch v-model="search" />
        <TaskFilter v-model="statusFilter" />
      </div>

      <TaskList @edit="handleEditTask" @delete="handleDeleteTask" />

      <Pagination
        :current-page="tasksStore.currentPage"
        :total-pages="tasksStore.totalPages"
        @update:page="tasksStore.setPage"
      />
    </main>

    <BaseModal
      :open="modalOpen"
      :title="editingTask ? 'Редактировать задачу' : 'Новая задача'"
      @close="handleCloseModal"
    >
      <TaskForm
        :initial-data="editingTask || undefined"
        :loading="tasksStore.creating || tasksStore.updating"
        @submit="handleFormSubmit"
        @cancel="handleCloseModal"
      />
    </BaseModal>

    <BaseConfirmModal
      :open="confirmModalOpen"
      title="Удалить задачу?"
      message="Вы уверены, что хотите удалить эту задачу? Это действие невозможно отменить."
      :loading="tasksStore.deleting"
      @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete"
    />
  </div>
</template>
