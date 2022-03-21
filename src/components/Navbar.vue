<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link :to="{ name: 'Home' }" class="navbar-brand">Mini Library</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{ name: 'Home' }" class="nav-link" active-class="active">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Books' }" class="nav-link" active-class="active">Manage Books</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Students' }" class="nav-link" active-class="active">Manage Students</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Transactions' }" class="nav-link" active-class="active">Manage Transactions</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>