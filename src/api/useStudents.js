import { ref } from 'vue'
import axios from 'axios'

export default function useStudents() {
  const students = ref([])
  let isPending = ref(false)

  const getStudents = async () => {
    isPending.value = true
    try {
      let response = await axios.get('/api/students')
      students.value = response.data.data
      isPending.value = false
    } catch (err) {
      console.log(err.message)
      isPending.value = false
    }
  }

  const deleteStudent = async (id) => {
    await axios.delete(`/api/students/${id}`)
  }

  return {
    isPending,
    students,
    getStudents,
    deleteStudent
  }
}