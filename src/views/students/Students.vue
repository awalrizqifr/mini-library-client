<template>
  <div class="d-flex justify-content-between mb-3">
    <h4>Manage Students</h4>
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
        </tr>
      </thead>
      <tbody>
        <template v-for="student in students" :key="student.id">
          <tr>
            <th scope="row">{{ student.nik }}</th>
            <td>{{ student.name }}</td>
            <td>{{ student.phone_number }}</td>
            <td>{{ student.date_joined }}</td>
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
      getStudents
    } = useStudents()

    onMounted(getStudents)

    return {
      isPending,
      students
    }
  }
}
</script>