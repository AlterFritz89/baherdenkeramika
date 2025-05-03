<template>
  <div class="tiles-page">
    <div class="navigation-buttons">

    </div>
  </div>
    <h1>{{ $t('products.tiles.heading') }}</h1>
    <p>{{ $t('products.tiles.description') }}</p>

    <div class="tiles-gallery">
      <div 
        v-for="tile in tiles" 
        :key="tile.id"
        class="tile-card"
        @click="selectedTile = tile"
      >
        <img 
          :src="getImageUrl(tile.image)" 
          :alt="tile.name[$i18n.locale]"
          class="tile-image"
        >
        <p>{{ tile.name[$i18n.locale] }}</p>
      </div>
    </div>

    <!-- Модальное окно -->
    <div v-if="selectedTile" class="modal-overlay" @click.self="selectedTile = null">
      <div class="modal-content">
        <img 
          :src="getImageUrl(selectedTile.image)" 
          :alt="selectedTile.name[$i18n.locale]"
          class="modal-image"
        >
        <div class="modal-text">
          <h2>{{ selectedTile.name[$i18n.locale] }}</h2>
          <p><strong>{{ $t('products.tiles.size') }}:</strong> {{ selectedTile.characteristics.size[$i18n.locale] }}</p>
          <p><strong>{{ $t('products.tiles.color') }}:</strong> {{ selectedTile.characteristics.color[$i18n.locale] }}</p>
          <div class="modal-buttons">
          <button @click="selectedTile = null" class="close-btn">
            {{ $t('news.close') }}          
          </button>
        </div>
      </div>
    </div>
  </div>
  <button @click="$router.go(-1)" class="back-btn">
        {{ $t('back.back') }}
      </button>
</template>

<script>
import axios from 'axios' // Добавляем импорт axios

export default {
  name: 'ProductsTiles',
  data() {
    return {
      tiles: [],
      selectedTile: null
    }
  },
  async created() {
    await this.fetchTiles();
  },
  methods: {
    async fetchTiles() {
      try {
        const response = await axios.get('http://localhost:8000/api/tiles/');
        this.tiles = response.data;
      } catch (error) {
        console.error('Ошибка загрузки плитки:', error);
      }
    },
    getImageUrl(imagePath) {
      if (!imagePath) return '';
      if (imagePath.startsWith('http')) return imagePath;
      return `http://localhost:8000${imagePath}`;
    }
  }
}
</script>

<style scoped>
/* Ваши стили остаются без изменений */
.navigation-buttons {
  margin-bottom: 0px;
}

.back-btn {
  padding: 8px 15px;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
  transition: background 0.3s;
}

.back-btn:hover {
  background: #e0e0e0;
}

.modal-buttons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

/* Адаптация для мобильных */
@media (max-width: 768px) {
  .modal-buttons {
    flex-direction: column;
  }
  

}
.tiles-page {
  padding: 20px;
}

.tiles-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.tile-card {
  cursor: pointer;
  transition: transform 0.3s;
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 8px;
}

.tile-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  max-width: 900px;
  width: 90%;
}

.modal-image {
  width: 600px;
  height: auto;
  border-radius: 4px;
  margin-right: 20px;
}

.close-btn {
  margin-top: 15px;
  padding: 8px 15px;
  background: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .modal-content {
    flex-direction: column;
  }
  
  .modal-image {
    width: 100%;
    margin-right: 0;
    margin-bottom: 15px;
  }
}
</style>