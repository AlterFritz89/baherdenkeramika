<template>
  <aside class="right-aside">
    <header class="aside-header">
      <h3>Календарь</h3>
    </header>
    <div class="calendar-wrapper">
      <VCalendar :attributes="attrs" />
    </div>
    
    <!-- Рекламный блок -->
    <div class="advertisement-block">
      <a 
        v-if="currentAd.url" 
        :href="currentAd.url" 
        target="_blank"
      >
        <img 
          :src="getImageUrl(currentAd.image)" 
          :alt="currentAd.alt_text" 
          class="ad-image"
        />
      </a>
      <img 
        v-else
        :src="getImageUrl(currentAd.image)" 
        :alt="currentAd.alt_text" 
        class="ad-image"
      />
    </div>
    
    <footer class="aside-footer">
      <small>Обновлено: {{ lastUpdated }}</small>
    </footer>
  </aside>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Calendar as VCalendar } from 'v-calendar';
import 'v-calendar/dist/style.css';
import axios from 'axios';

const attrs = ref([{
  key: 'today',
  highlight: {
    color: 'blue',
    fillMode: 'light',
  },
  dates: new Date(),
}]);

const lastUpdated = new Date().toLocaleTimeString('ru-RU');
const ads = ref([]);
const currentAdIndex = ref(0);
const currentAd = ref({});
let intervalId = null;

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `http://localhost:8000${imagePath}`;
};

const fetchAds = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/ads/');
    ads.value = response.data;
    if (ads.value.length > 0) {
      currentAd.value = ads.value[0];
      startRotation();
    }
  } catch (error) {
    console.error('Ошибка загрузки рекламы:', error);
  }
};

const startRotation = () => {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(() => {
    currentAdIndex.value = (currentAdIndex.value + 1) % ads.value.length;
    currentAd.value = ads.value[currentAdIndex.value];
  }, 5000); // Меняем каждые 5 секунд
};

onMounted(() => {
  fetchAds();
});

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
.right-aside {
  width: 250px;
  padding: 1rem;
  background: #f5f5f5;
  border-left: 1px solid #ddd;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
}

.calendar-wrapper {
  margin: 1rem 0;
  max-width: 100%;
}

:deep(.vc-container) {
  border: none;
  width: 100%;
  box-shadow: none;
}

.advertisement-block {
  margin: 1rem 0;
  text-align: center;
}

.ad-image {
  width: 100%;
  max-height: 150px;
  object-fit: contain;
  border-radius: 4px;
  border: 1px solid #eee;
}

.aside-footer {
  margin-top: auto;
  font-size: 0.8rem;
  color: #666;
}

@media (max-width: 768px) {
  .right-aside {
    display: none;
  }
}
</style>