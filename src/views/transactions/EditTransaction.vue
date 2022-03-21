<template>
  <router-link :to="{name: 'Transactions'}" class="btn btn-light mb-3">Back</router-link>
  <template v-if="!isPending">
    <form class="row g-3" @submit.prevent="handleSubmit">
      <div class="col-md-6">
        <label for="student_id" class="form-label">Student</label>
        <select class="form-select" id="student_id" v-model="transaction.student_id" v-if="students" :class="[{ 'is-invalid': errors?.student_id }]">
          <option value="" selected>Choose Student</option>
          <template v-for="student in students" :key="student.id">
            <option :value="student.id" :selected="student.id === transaction.student_id">{{ student.nik }} - {{ student.name }}</option>
          </template>
        </select>
        <div v-for="message in errors?.student_id" class="invalid-feedback">
            {{ message }}
        </div>
      </div>
      <div class="col-md-6">
        <label for="book_id" class="form-label">Book</label>
        <select class="form-select" id="book_id" v-model="transaction.book_id" v-if="books" :class="[{ 'is-invalid': errors?.book_id }]">
          <option value="" selected>Choose Book</option>
          <template v-for="book in books" :key="book.id">
            <option :value="book.id" :selected="book.id === transaction.book_id">{{ book.title }}</option>
          </template>
        </select>
        <div v-for="message in errors?.book_id" class="invalid-feedback">
            {{ message }}
        </div>
      </div>
      <div class="col-md-6">
        <label for="date_start" class="form-label">Date Start</label>
        <input type="date" class="form-control" id="date_start" v-model="transaction.date_start" :class="[{ 'is-invalid': errors?.date_start }]">
        <div v-for="message in errors?.date_start" class="invalid-feedback">
            {{ message }}
        </div>
      </div>
      <div class="col-md-6">
        <label for="date_end" class="form-label">Date End</label>
        <input type="date" class="form-control" id="date_end" v-model="transaction.date_end" :class="[{ 'is-invalid': errors?.date_end }]">
        <div v-for="message in errors?.date_end" class="invalid-feedback">
            {{ message }}
        </div>
      </div>
      <div class="col-md-6">
        <label for="status" class="form-label">Status</label>
        <select class="form-select" id="status" v-model="transaction.status" v-if="students" :class="[{ 'is-invalid': errors?.status }]">
          <option value="0" :selected="transaction.status === 0">Borrowed</option>
          <option value="1" :selected="transaction.status === 1">Returned</option>
        </select>
        <div v-for="message in errors?.status" class="invalid-feedback">
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
import useStudents from '@/api/useStudents'
import useTransactions from '@/api/useTransactions'
import { onMounted } from 'vue'

export default {
  props: {
    id: {
      required: true
    }
  },
  setup(props) {
    const {
      getBooks,
      books
    } = useBooks()

    const {
      getStudents,
      students
    } = useStudents()

    const {
      transaction,
      getTransaction,
      updateTransaction,
      errors,
      isPending,
      isUpdating
    } = useTransactions()

    onMounted(getBooks)
    onMounted(getStudents)
    onMounted(getTransaction(props.id))

    const handleSubmit = async () => {
      await updateTransaction(props.id)
    }

    return {
      errors,
      isPending,
      isUpdating,
      transaction,
      books,
      students,
      handleSubmit
    }
  }
}
</script>