import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useBooks() {
  const router = useRouter()
  const books = ref([])
  let isPending = ref(false)
  const errors = ref(null)

  const getBooks = async () => {
    isPending.value = true
    try {
      let response = await axios.get('/api/books')
      books.value = response.data.data
      isPending.value = false
    } catch (err) {
      console.log(err.message)
      isPending.value = false
    }
  }

  const addBook = async (data) => {
    isPending.value = true
    errors.value = null
    try {
      await axios.post('/api/books', data)
      isPending.value = false
      await router.push({name: 'Books'})
    } catch (err) {
      if (err.response.status === 422) {
        errors.value = err.response.data.errors
        isPending.value = false
      }
      console.log(err)
      isPending.value = false
    }
  }

  return {
    errors,
    isPending,
    books,
    getBooks,
    addBook
  }
}