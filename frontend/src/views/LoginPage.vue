<script setup lang="ts">
import AuthForm from '@/components/auth/AuthForm.vue'
</script>

<template>
  <main class="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-primary">Task Tracker</h1>
        <p class="text-neutral-600 mt-2">Войдите в свой аккаунт</p>
      </div>
      <AuthForm />
    </div>
  </main>
</template>
