<template>
  <!-- Container principal qui occupe 100% de la largeur de l'écran -->
  <div class="d-flex flex-column min-vh-100 p-0">
    <!-- ROW 1 : Header -->
    <div class="header-container w-100">
      <Header @toggle-sidebar="toggleSidebar" />
    </div>

    <!-- ROW 2 : Contenu + Sidebar -->
    <div class="d-flex flex-grow-1 w-100">
      <!-- Sidebar (affichée ou non selon `showSidebar`) -->
      <div v-if="showSidebar" class="sidebar">
        <Sidebar />
      </div>

      <!-- Contenu principal -->
      <div :class="showSidebar ? 'main-content-with-sidebar' : 'main-content-fullscreen'">
        <main class="content">
          <h1>Bienvenue sur mon site</h1>
          <p>Contenu principal ici...</p>
        </main>
      </div>
    </div>

    <!-- ROW 3 : Footer -->
    <div class="footer-container w-100">
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: { Header, Sidebar, Footer },
  data() {
    return {
      showSidebar: false, // Sidebar cachée par défaut
    };
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar; // Toggle Sidebar
    },
  },
};
</script>

<style scoped>
/* Container général */
.d-flex {
  width: 100vh;
}

/* Header (Navbar) */
.header-container {
  width: 100vh;
  z-index: 999;
}

/* Sidebar */
.sidebar {
  width: 250px; /* Largeur fixe de la sidebar */
  background-color: #343a40;
  color: white;
  min-height: 100%; /* Prend toute la hauteur */
  padding: 1rem;
}

/* Contenu principal */
.content {
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100%; /* Prend toute la hauteur */
}

/* Cas avec Sidebar visible : prend 10 colonnes sur 12 */
.main-content-with-sidebar {
  flex-grow: 1;
  margin-left: 250px; /* Décalage pour la sidebar */
}

/* Cas sans Sidebar : prend toute la largeur */
.main-content-fullscreen {
  flex-grow: 1;
  width: 100vh;
}

/* Footer */
.footer-container {
  background-color: #343a40;
  color: white;
  text-align: center;
  padding: 1rem;
  width: 100vh;
}
</style>
