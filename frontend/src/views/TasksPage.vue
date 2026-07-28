<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-neutral-50">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-primary mb-4">Список задач</h1>
      <p class="text-neutral-600 mb-6">Страница в разработке</p>
      <button
        @click="logout"
        class="px-6 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
      >
        Выйти
      </button>
    </div>
  </div>
</template>
