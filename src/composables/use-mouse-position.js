import { ref, onMounted, onUnmounted } from 'vue'


export const useMousePosition = () => {
  const x = ref(0)
  const y = ref(0)

  const updatePosition = (e) => {
    x.value = e.clientX
    y.value = e.clientY
  }

  onMounted(() => {
    console.log('mounted')
    window.addEventListener('mousemove', updatePosition)
  })
  onUnmounted(() => {
    console.log('unmounted')
    window.removeEventListener('mousemove', updatePosition)
  })

  return {
    x,
    y
  }
}
