import { ref } from 'vue'
import axios from 'axios'

export default function useBooks() {
  const books = ref([])
  let isPending = ref(false)

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

  return {
    isPending,
    books,
    getBooks
  }
}