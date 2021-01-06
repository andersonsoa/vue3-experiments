import { reactive, toRefs } from 'vue'
import axios from 'axios'
import { useStorage } from'./use-storage'

const [token] = useStorage('v3-app::token')
const [user] = useStorage('v3-app::user')

export const useAuth = () => {

  const state = reactive({
    error: null,
    loading: false,
  })

  const login = async (email, password) => {
    try {
      state.loading = true

      const res = await axios.post('https://reqres.in/api/login', { email, password })

      user.value = email
      token.value = res.data.token

    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null

    state.error = null
    state.loading = false
  }

  return {
    ...toRefs(state),
    token,
    user,
    login,
    logout,
  }
}
