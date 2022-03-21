<template>
  <router-link :to="{name: 'Transactions'}" class="btn btn-light mb-3">Back</router-link>
  <form class="row g-3" @submit.prevent="handleSubmit">
    <div class="col-md-6">
      <label for="student_id" class="form-label">Student</label>
      <select class="form-select" id="student_id" v-model="form.student_id" v-if="students" :class="[{ 'is-invalid': errors?.student_id }]">
        <option value="" selected>Choose Student</option>
        <template v-for="student in students" :key="student.id">
          <option :value="student.id">{{ student.nik }} - {{ student.name }}</option>
        </template>
      </select>
      <div v-for="message in errors?.student_id" class="invalid-feedback">
          {{ message }}
      </div>
    </div>
    <div class="col-md-6">
      <label for="book_id" class="form-label">Book</label>
      <select class="form-select" id="book_id" v-model="form.book_id" v-if="books" :class="[{ 'is-invalid': errors?.book_id }]">
        <option value="" selected>Choose Book</option>
        <template v-for="book in books" :key="book.id">
          <option :value="book.id">{{ book.title }}</option>
        </template>
      </select>
      <div v-for="message in errors?.book_id" class="invalid-feedback">
          {{ message }}
      </div>
    </div>
    <div class="col-md-6">
      <label for="date_start" class="form-label">Date Start</label>
      <input type="date" class="form-control" id="date_start" v-model="form.date_start" :class="[{ 'is-invalid': errors?.date_start }]">
      <div v-for="message in errors?.date_start" class="invalid-feedback">
          {{ message }}
      </div>
    </div>
    <div class="col-md-6">
      <label for="date_end" class="form-label">Date End</label>
      <input type="date" class="form-control" id="date_end" v-model="form.date_end" :class="[{ 'is-invalid': errors?.date_end }]">
      <div v-for="message in errors?.date_end" class="invalid-feedback">
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
import useStudents from '@/api/useStudents'
import useTransactions from '@/api/useTransactions'
import { onMounted, reactive } from 'vue'

export default {
  setup() {
    const form = reactive({
      'student_id': '',
      'book_id': '',
      'date_start': '',
      'date_end': ''
    })

    const {
      getBooks,
      books
    } = useBooks()

    const {
      getStudents,
      students
    } = useStudents()

    const {
      addTransaction,
      errors,
      isPending
    } = useTransactions()

    onMounted(getBooks)
    onMounted(getStudents)

    const handleSubmit = async () => {
      await addTransaction(form)
    }

    return {
      errors,
      isPending,
      form,
      books,
      students,
      handleSubmit
    }
  }
}
</script>