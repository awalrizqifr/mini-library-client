import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useTransactions() {
  const router = useRouter()
  const transactions = ref([])
  const transaction = ref([])
  let isPending = ref(false)
  let isUpdating = ref(false)
  const errors = ref(null)

  const getTransactions = async () => {
    isPending.value = true
    try {
      let response = await axios.get('/api/transactions')
      transactions.value = response.data.data
      isPending.value = false
    } catch (err) {
      console.log(err.message)
      isPending.value = false
    }
  }

  const getTransaction = async (id) => {
    isPending.value = true
    try {
      let response = await axios.get(`/api/transactions/${id}`)
      transaction.value = response.data.data
      isPending.value = false
    } catch (err) {
      if (err.response.status === 404) {
        await router.push({name: 'Transactions'})
      } 
      console.log(err.message)
      isPending.value = false
    }
  }

  const addTransaction = async (data) => {
    isPending.value = true
    errors.value = null
    try {
      await axios.post('/api/transactions', data)
      isPending.value = false
      await router.push({name: 'Transactions'})
    } catch (err) {
      if (err.response.status === 422) {
        errors.value = err.response.data.errors
        isPending.value = false
      }
      console.log(err.message)
      isPending.value = false
    }
  }

  const updateTransaction = async (id) => {
    isUpdating.value = true
    errors.value = null
    try {
      await axios.patch(`/api/transactions/${id}`, transaction.value)
      isUpdating.value = false
      await router.push({name: 'Transactions'})
    } catch (err) {
      if (err.response.status === 422) {
        errors.value = err.response.data.errors
        isUpdating.value = false
      }
      console.log(err.message)
      isUpdating.value = false
    }
  }

  const deleteTransaction = async (id) => {
    await axios.delete(`/api/transactions/${id}`)
  }

  return {
    errors,
    isPending,
    isUpdating,
    transactions,
    transaction,
    getTransactions,
    getTransaction,
    addTransaction,
    updateTransaction,
    deleteTransaction
  }
}