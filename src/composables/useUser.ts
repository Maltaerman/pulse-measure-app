import { ref } from 'vue'

const LOCAL_STORAGE_ID = 'pulse-measure-app-user-id'

const userId = ref<string>('')

export function useUser() {
  function setUser() {
    let id = localStorage.getItem(LOCAL_STORAGE_ID);

    if (!id) {
      id = crypto.randomUUID();

      userId.value = id;

      localStorage.setItem('userId', id);
    }
  }

  return {
    userId,

    setUser
  }
}
