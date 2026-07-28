<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TaskList from '../components/tasks/TaskList.vue'
import TaskSearch from '../components/tasks/TaskSearch.vue'
import TaskFilter from '../components/tasks/TaskFilter.vue'
import Pagination from '../components/Pagination.vue'
import BaseButton from '../components/common/BaseButton.vue'

const router = useRouter()

const search = ref('')
const statusFilter = ref('all')
const currentPage = ref(1)
const totalPages = ref(1)

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50">
    <header class="bg-white border-b border-neutral-200 px-4 py-4">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <h1 class="text-xl font-bold text-neutral-900">Задачи</h1>
        <div class="flex items-center gap-4">
          <BaseButton variant="primary" size="sm"> + Новая задача </BaseButton>
          <BaseButton variant="secondary" size="sm" @click="logout"> Выйти </BaseButton>
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-6">
      <div class="flex flex-col sm:flex-row gap-4 mb-6">
        <TaskSearch v-model="search" />
        <TaskFilter v-model="statusFilter" />
      </div>

      <TaskList
        @edit="(id) => console.log('Edit task', id)"
        @delete="(id) => console.log('Delete task', id)"
      />

      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @update:page="(page) => (currentPage = page)"
      />
    </main>
  </div>
</template>
