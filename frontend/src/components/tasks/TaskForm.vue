<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '../common/BaseInput.vue'
import BaseSelect from '../common/BaseSelect.vue'
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

const statusOptions = [
  { value: 'todo', label: 'К выполнению' },
  { value: 'in-progress', label: 'В процессе' },
  { value: 'done', label: 'Готово' },
]

const priorityOptions = [
  { value: 'low', label: 'Низкий' },
  { value: 'medium', label: 'Средний' },
  { value: 'high', label: 'Высокий' },
]

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
      :disabled="props.loading"
    />

    <BaseInput
      id="description"
      label="Описание"
      v-model="description"
      placeholder="Введите описание"
      :disabled="props.loading"
    />

    <div class="grid grid-cols-2 gap-4">
      <BaseSelect
        id="status"
        label="Статус"
        v-model="status"
        :options="statusOptions"
        :disabled="props.loading"
      />

      <BaseSelect
        id="priority"
        label="Приоритет"
        v-model="priority"
        :options="priorityOptions"
        :disabled="props.loading"
      />
    </div>

    <div v-if="error" class="text-sm text-red-500">
      {{ error }}
    </div>

    <div class="flex gap-2 justify-end pt-2">
      <BaseButton
        variant="secondary"
        type="button"
        @click="$emit('cancel')"
        :disabled="props.loading"
      >
        Отмена
      </BaseButton>
      <BaseButton type="submit" variant="primary" :loading="props.loading">
        {{ props.initialData ? 'Сохранить' : 'Создать' }}
      </BaseButton>
    </div>
  </form>
</template>
