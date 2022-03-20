<template>
  <router-link :to="{name: 'Students'}" class="btn btn-light mb-3">Back</router-link>
  <form class="row g-3" @submit.prevent="handleSubmit">
    <div class="col-md-6">
      <label for="nik" class="form-label">NIK</label>
      <input type="text" class="form-control" id="nik" v-model="form.nik" :class="[{ 'is-invalid': errors?.nik }]">
      <div v-for="message in errors?.nik" class="invalid-feedback">
          {{ message }}
      </div>
    </div>
    <div class="col-md-6">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" id="name" v-model="form.name" :class="[{ 'is-invalid': errors?.name }]">
      <div v-for="message in errors?.name" class="invalid-feedback">
          {{ message }}
      </div>
    </div>
    <div class="col-md-5">
      <label for="phone_number" class="form-label">Phone Number</label>
      <input type="text" class="form-control" id="phone_number" v-model="form.phone_number" :class="[{ 'is-invalid': errors?.phone_number }]">
      <div v-for="message in errors?.phone_number" class="invalid-feedback">
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
import useStudents from '@/api/useStudents'
import { reactive } from 'vue'

export default {
  setup() {
    const form = reactive({
      'nik': '',
      'name': '',
      'phone_number': ''
    })

    const {
      addStudent,
      errors,
      isPending
    } = useStudents()

    const handleSubmit = async () => {
      await addStudent(form)
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