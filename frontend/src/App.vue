<template>
  <div class="app-wrapper">
    <FlyingRocket />
    <Header />
    <div class="app-layout">  <!-- Обёртка для основного контента и сайдбара -->
      <main class="main-content">
        <router-view />
      </main>
      <RightAside />  <!-- Теперь сайдбар будет виден -->
    </div>
    <Footer />
    <EasterEgg />     
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import RightAside from '@/components/RightAside.vue'
import EasterEgg from '@/components/EasterEgg.vue'; // Импортируем компонент
// import FlyingRocket from "@/components/FlyingRocket.vue";


export default {
  components: { Header, Footer, RightAside,EasterEgg,}  // Регистрируем RightAside
}
</script>

<style>
/* Глобальные стили (без scoped) */
body {
  margin: 0;
}
</style>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-layout {
  display: flex;
  flex: 1;  /* Занимает всё доступное пространство */
}

.main-content {
  flex: 1;  /* Основной контент растягивается */
  padding: 2rem;
  margin-right: 270px;  /* Отступ для сайдбара */
}

@media (max-width: 768px) {
  .main-content {
    margin-right: 0;
    width: 100%;
  }
}

/* Стили RightAside уже прописаны в самом компоненте */
</style>