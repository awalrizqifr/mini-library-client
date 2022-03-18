<template>
  <div class="d-flex justify-content-between mb-3">
    <h4>Manage Books</h4>
    <router-link :to="{name: 'AddBook'}" class="btn btn-light">Add New Book</router-link>
  </div>
  <div v-if="isPending">Loading...</div>
  <template v-else>
    <p v-if="books.length === 0">No books yet.</p>
    <table class="table table-hover" v-else>
      <thead>
        <tr>
          <th scope="col">ISBN</th>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col">Publisher</th>
          <th scope="col">Released Year</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="book in books" :key="book.id">
          <tr>
            <th scope="row">{{ book.isbn }}</th>
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.publisher }}</td>
            <td>{{ book.released_year }}</td>
            <td>Edit</td>
            <td>
              <button type="submit" class="btn btn-danger" @click.prevent="handleSubmit(book.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16"> <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/></svg>
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </template>
</template>

<script>
import useBooks from '@/api/useBooks'
import { onMounted } from 'vue'

export default {
  setup() {
    const {
      isPending,
      books,
      getBooks,
      deleteBook
    } = useBooks()

    onMounted(getBooks)

    const handleSubmit = async (id) => {
      if (! window.confirm('Are you sure?')) {
        return
      }

      await deleteBook(id)
      await getBooks()
    }

    return {
      isPending,
      books,
      handleSubmit
    }
  }
}
</script>