<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const email = ref('')
const password = ref('')
const error = ref('')

const handleSubmit = async () => {
  if (!email.value.trim() || !password.value.trim()) {
    error.value = 'Заполните все поля'
    return
  }

  error.value = ''

  console.log('Login:', { email: email.value, password: password.value })
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200"
  >
    <div class="space-y-4">
      <BaseInput
        id="email"
        label="Email"
        type="email"
        v-model="email"
        placeholder="example@mail.com"
      />

      <BaseInput
        id="password"
        label="Пароль"
        type="password"
        v-model="password"
        placeholder="Введите пароль"
      />

      <div v-if="error" class="text-sm text-red-500 text-center">
        {{ error }}
      </div>

      <BaseButton type="submit" variant="primary" class="w-full"> Войти </BaseButton>
    </div>
  </form>
</template>
