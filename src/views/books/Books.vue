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
            <td>Delete</td>
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
      getBooks
    } = useBooks()

    onMounted(getBooks)

    return {
      isPending,
      books
    }
  }
}
</script>