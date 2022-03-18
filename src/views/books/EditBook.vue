<template>
  <router-link :to="{name: 'Books'}" class="btn btn-light mb-3">Back</router-link>
  <template v-if="!isPending">
    <form class="row g-3" @submit.prevent="handleSubmit">
      <div class="col-md-6">
        <label for="isbn" class="form-label">ISBN</label>
        <input type="text" class="form-control" id="isbn" v-model="book.isbn" :class="[{ 'is-invalid': errors?.isbn }]">
        <div v-for="message in errors?.isbn" class="invalid-feedback">
            {{ message }}
        </div>
      </div>
      <div class="col-md-6">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" id="title" v-model="book.title" :class="[{ 'is-invalid': errors?.title }]">
        <div v-for="message in errors?.title" class="invalid-feedback">
            {{ message }}
        </div>
      </div>
      <div class="col-md-5">
        <label for="author" class="form-label">Author</label>
        <input type="text" class="form-control" id="author" v-model="book.author" :class="[{ 'is-invalid': errors?.author }]">
        <div v-for="message in errors?.author" class="invalid-feedback">
            {{ message }}
        </div>
      </div>
      <div class="col-md-5">
        <label for="publisher" class="form-label">Publisher</label>
        <input type="text" class="form-control" id="publisher" v-model="book.publisher" :class="[{ 'is-invalid': errors?.publisher }]">
        <div v-for="message in errors?.publisher" class="invalid-feedback">
            {{ message }}
        </div>
      </div>
      <div class="col-md-2">
        <label for="released_year" class="form-label">Released Year</label>
        <input type="text" class="form-control" id="released_year" v-model="book.released_year" :class="[{ 'is-invalid': errors?.released_year }]">
        <div v-for="message in errors?.released_year" class="invalid-feedback">
            {{ message }}
        </div>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-light" v-if="!isUpdating">Update</button>
        <button type="submit" class="btn btn-light" v-else>Saving...</button>
      </div>
    </form>
  </template>
  <div v-else>Loading...</div>
</template>

<script>
import useBooks from '@/api/useBooks'
import { onMounted } from 'vue'

export default {
  props: {
    id: {
        required: true
    }
  },
  setup(props) {
    const {
      getBook,
      book,
      updateBook,
      errors,
      isPending,
      isUpdating
    } = useBooks()

    onMounted(getBook(props.id))

    const handleSubmit = async () => {
      await updateBook(props.id)
    }

    return {
      errors,
      isPending,
      isUpdating,
      book,
      handleSubmit
    }
  }
}
</script>