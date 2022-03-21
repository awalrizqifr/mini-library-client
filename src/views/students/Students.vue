<template>
  <div class="d-flex justify-content-between mb-3">
    <h4>Manage Students</h4>
    <router-link :to="{name: 'AddStudent'}" class="btn btn-light">Add New Student</router-link>
  </div>
  <div v-if="isPending">Loading...</div>
  <template v-else>
    <p v-if="students.length === 0">No students yet.</p>
    <table class="table table-hover" v-else>
      <thead>
        <tr>
          <th scope="col">NIK</th>
          <th scope="col">Name</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Date Joined</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="student in students" :key="student.id">
          <tr>
            <th scope="row">{{ student.nik }}</th>
            <td>{{ student.name }}</td>
            <td>{{ student.phone_number }}</td>
            <td>{{ student.date_joined }}</td>
            <td>
              <router-link class="btn btn-success" :to="{name: 'EditStudent', params: {id: student.id}}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"> <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/> <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>
              </router-link>
            </td>
            <td>
              <button type="submit" class="btn btn-danger" @click.prevent="handleSubmit(student.id)">
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
import useStudents from '@/api/useStudents'
import { onMounted } from 'vue'

export default {
  setup() {
    const {
      isPending,
      students,
      getStudents,
      deleteStudent
    } = useStudents()

    onMounted(getStudents)

    const handleSubmit = async (id) => {
      if (! window.confirm('Are you sure want to permanently delete this student? Deleting this student will also delete the transaction that belongs to this student')) {
        return
      }

      await deleteStudent(id)
      await getStudents()
    }

    return {
      isPending,
      students,
      handleSubmit
    }
  }
}
</script>