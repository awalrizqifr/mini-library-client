<template>
    <router-link :to="{name: 'Books'}" class="btn btn-light mb-3">Back</router-link>
  <form class="row g-3" @submit.prevent="handleSubmit">
    <div class="col-md-6">
      <label for="isbn" class="form-label">ISBN</label>
      <input type="text" class="form-control" id="isbn" v-model="form.isbn" :class="[{ 'is-invalid': errors?.isbn }]">
      <div v-for="message in errors?.isbn" class="invalid-feedback">
          {{ message }}
      </div>
    </div>
    <div class="col-md-6">
      <label for="title" class="form-label">Title</label>
      <input type="text" class="form-control" id="title" v-model="form.title" :class="[{ 'is-invalid': errors?.title }]">
      <div v-for="message in errors?.title" class="invalid-feedback">
          {{ message }}
      </div>
    </div>
    <div class="col-md-5">
      <label for="author" class="form-label">Author</label>
      <input type="text" class="form-control" id="author" v-model="form.author" :class="[{ 'is-invalid': errors?.author }]">
      <div v-for="message in errors?.author" class="invalid-feedback">
          {{ message }}
      </div>
    </div>
    <div class="col-md-5">
      <label for="publisher" class="form-label">Publisher</label>
      <input type="text" class="form-control" id="publisher" v-model="form.publisher" :class="[{ 'is-invalid': errors?.publisher }]">
      <div v-for="message in errors?.publisher" class="invalid-feedback">
          {{ message }}
      </div>
    </div>
    <div class="col-md-2">
      <label for="released_year" class="form-label">Released Year</label>
      <input type="text" class="form-control" id="released_year" v-model="form.released_year" :class="[{ 'is-invalid': errors?.released_year }]">
      <div v-for="message in errors?.released_year" class="invalid-feedback">
          {{ message }}
      </div>
    </div>
    <div class="col-12">
      <button type="submit" class="btn btn-light" v-if="!isPending">Add</button>
      <button type="submit" class="btn btn-light" v-else>Saving...</button>
    </div>
  </form>
</template>

<script>
import useBooks from '@/api/useBooks'
import { reactive } from 'vue'

export default {
  setup() {
    const form = reactive({
      'isbn': '',
      'title': '',
      'author': '',
      'publisher': '',
      'released_year': ''
    })

    const {
      addBook,
      errors,
      isPending
    } = useBooks()

    const handleSubmit = async () => {
      await addBook(form)
    }

    return {
      errors,
      isPending,
      form,
      handleSubmit
    }
  }
}
</script>