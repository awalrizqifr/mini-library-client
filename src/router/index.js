import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Books from '../views/books/Books.vue'
import AddBook from '../views/books/AddBook.vue'
import EditBook from '../views/books/EditBook.vue'
import Students from '../views/students/Students.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/books',
    name: 'Books',
    component: Books
  },
  {
    path: '/books/add',
    name: 'AddBook',
    component: AddBook
  },
  {
    path: '/books/:id',
    name: 'EditBook',
    component: EditBook,
    props: true
  },
  {
    path: '/students',
    name: 'Students',
    component: Students
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
