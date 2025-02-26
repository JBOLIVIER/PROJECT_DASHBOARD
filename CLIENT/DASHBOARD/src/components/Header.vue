import { RouterLink, RouterView } from 'vue-router'
<template>
  <header class="header">
    <h1>Mon Site</h1>
    <nav>
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
        <li><RouterLink to="/FirstPage">FirstPage</RouterLink></li>
        <li><RouterLink to="/Station">Station</RouterLink></li>
        <li><RouterLink to="/Map">Map</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background: #2c3e50;
  color: white;
  padding: 15px;
  text-align: center;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin: 0 10px;
}

nav ul li a {
  color: white;
  text-decoration: none;
}
</style>
