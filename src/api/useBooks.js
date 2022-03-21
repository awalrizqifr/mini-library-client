import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useBooks() {
  const router = useRouter()
  const books = ref([])
  const book = ref([])
  let isPending = ref(false)
  let isUpdating = ref(false)
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

  const getBook = async (id) => {
    isPending.value = true
    try {
      let response = await axios.get(`/api/books/${id}`)
      book.value = response.data.data
      isPending.value = false
    } catch (err) {
      if (err.response.status === 404) {
        await router.push({name: 'Books'})
      } 
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
      console.log(err.message)
      isPending.value = false
    }
  }

  const updateBook = async (id) => {
    isUpdating.value = true
    errors.value = null
    try {
      await axios.patch(`/api/books/${id}`, book.value)
      isUpdating.value = false
      await router.push('/books')
    } catch (err) {
      if (err.response.status === 422) {
        errors.value = err.response.data.errors
        isUpdating.value = false
      }
      console.log(err.message)
      isUpdating.value = false
    }
  }

  const deleteBook = async (id) => {
    await axios.delete(`/api/books/${id}`)
  }

  return {
    errors,
    isPending,
    isUpdating,
    books,
    book,
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
  }
}