import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useStudents() {
  const router = useRouter()
  const students = ref([])
  const student = ref([])
  let isPending = ref(false)
  let isUpdating = ref(false)
  const errors = ref(null)

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

  const getStudent = async (id) => {
    isPending.value = true
    try {
      let response = await axios.get(`/api/students/${id}`)
      student.value = response.data.data
      isPending.value = false
    } catch (err) {
      console.log(err.message)
      isPending.value = false
    }
  }

  const addStudent = async (data) => {
    isPending.value = true
    errors.value = null
    try {
      await axios.post('/api/students', data)
      isPending.value = false
      await router.push({name: 'Students'})
    } catch (err) {
      if (err.response.status === 422) {
        errors.value = err.response.data.errors
        isPending.value = false
      }
      console.log(err.message)
      isPending.value = false
    }
  }

  const updateStudent = async (id) => {
    isUpdating.value = true
    errors.value = null
    try {
      await axios.patch(`/api/students/${id}`, student.value)
      isUpdating.value = false
      await router.push({name: 'Students'})
    } catch (err) {
      if (err.response.status === 422) {
        errors.value = err.response.data.errors
        isUpdating.value = false
      }
      console.log(err.message)
      isUpdating.value = false
    }
  }

  const deleteStudent = async (id) => {
    await axios.delete(`/api/students/${id}`)
  }

  return {
    errors,
    isPending,
    isUpdating,
    students,
    student,
    getStudents,
    getStudent,
    addStudent,
    updateStudent,
    deleteStudent
  }
}