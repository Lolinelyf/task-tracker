import { ref, watch, type Ref } from 'vue'

export function useDebounce<T>(value: Ref<T> | T, delay: number = 300) {
  const source = value && typeof value === 'object' && 'value' in value ? value : ref(value)
  const debouncedValue = ref(source.value) as Ref<T>

  let timeoutId: ReturnType<typeof setTimeout> | null = null

  watch(source, (newValue) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      debouncedValue.value = newValue
      timeoutId = null
    }, delay)
  })

  return debouncedValue
}
