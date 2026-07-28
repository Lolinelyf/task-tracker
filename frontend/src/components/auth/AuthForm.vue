<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import BaseInput from '../common/BaseInput.vue'
import BaseButton from '../common/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const localError = ref('')

const handleSubmit = async () => {
  if (!email.value.trim() || !password.value.trim()) {
    localError.value = 'Заполните все поля'
    return
  }

  localError.value = ''
  const result = await authStore.login({
    email: email.value,
    password: password.value,
  })

  if (result.success) {
    router.push('/tasks')
  } else {
    localError.value = result.error || 'Ошибка авторизации'
  }
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
        :disabled="authStore.loading"
      />

      <BaseInput
        id="password"
        label="Пароль"
        type="password"
        v-model="password"
        placeholder="Введите пароль"
        :disabled="authStore.loading"
      />

      <div v-if="localError" class="text-sm text-red-500 text-center">
        {{ localError }}
      </div>

      <BaseButton
        type="submit"
        variant="primary"
        :loading="authStore.loading"
        loading-text="Вход..."
        class="w-full"
      >
        Войти
      </BaseButton>
    </div>
  </form>
</template>
