<template>
  <header class="header">
    <h1>METEO SITE</h1>
    <nav>
      <ul>
        <li><RouterLink to="/FirstPage">FirstPage</RouterLink></li>
        <li><RouterLink to="/Station">Station</RouterLink></li>
        <li><RouterLink to="/Map">Map</RouterLink></li>
        <li><RouterLink to="/Evolution">Evolution</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background: #34495e;
  color: white;
  padding: 20px 30px;
  text-align: center;
}

.header h1 {
  font-family: 'Arial', sans-serif;
  font-size: 2.5em;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  display: inline-block;
  margin: 0 15px;
}

nav ul li a {
  color: #ecf0f1;
  text-decoration: none;
  font-size: 1.1em;
  font-weight: 600;
  position: relative;
  transition: color 0.3s ease, transform 0.3s ease;
}

nav ul li a:hover {
  color: #e74c3c;
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .header {
    padding: 15px;
  }

  nav ul li {
    display: block;
    margin: 10px 0;
  }

  .header h1 {
    font-size: 2em;
  }
}
</style>
