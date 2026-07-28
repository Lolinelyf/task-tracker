<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '../common/BaseInput.vue'
import BaseButton from '../common/BaseButton.vue'

type TaskStatus = 'todo' | 'in-progress' | 'done'
type TaskPriority = 'low' | 'medium' | 'high'

const props = defineProps<{
  initialData?: {
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
  }
  loading?: boolean
}>()

const emit = defineEmits<{
  (
    e: 'submit',
    data: {
      title: string
      description: string
      status: TaskStatus
      priority: TaskPriority
    }
  ): void
  (e: 'cancel'): void
}>()

const title = ref(props.initialData?.title || '')
const description = ref(props.initialData?.description || '')
const status = ref<TaskStatus>(props.initialData?.status || 'todo')
const priority = ref<TaskPriority>(props.initialData?.priority || 'medium')

const error = ref('')

const handleSubmit = () => {
  if (!title.value.trim()) {
    error.value = 'Название обязательно'
    return
  }

  error.value = ''
  emit('submit', {
    title: title.value.trim(),
    description: description.value.trim(),
    status: status.value,
    priority: priority.value,
  })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <BaseInput
      id="title"
      label="Название"
      v-model="title"
      placeholder="Введите название задачи"
      :disabled="loading"
    />

    <BaseInput
      id="description"
      label="Описание"
      v-model="description"
      placeholder="Введите описание"
      :disabled="loading"
    />

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="text-sm font-medium text-neutral-700 block mb-1">Статус</label>
        <select
          v-model="status"
          class="w-full px-4 py-2 rounded-lg border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
          :disabled="loading"
        >
          <option value="todo">К выполнению</option>
          <option value="in-progress">В процессе</option>
          <option value="done">Готово</option>
        </select>
      </div>

      <div>
        <label class="text-sm font-medium text-neutral-700 block mb-1">Приоритет</label>
        <select
          v-model="priority"
          class="w-full px-4 py-2 rounded-lg border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
          :disabled="loading"
        >
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>
      </div>
    </div>

    <div v-if="error" class="text-sm text-red-500">
      {{ error }}
    </div>

    <div class="flex gap-2 justify-end pt-2">
      <BaseButton variant="secondary" @click="$emit('cancel')" :disabled="loading">
        Отмена
      </BaseButton>
      <BaseButton type="submit" variant="primary" :loading="loading">
        {{ initialData ? 'Сохранить' : 'Создать' }}
      </BaseButton>
    </div>
  </form>
</template>
