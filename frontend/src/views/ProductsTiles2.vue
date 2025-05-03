<template>
    <div class="products-tiles">
      <h1>{{ $t('products.tiles.heading') }}</h1>
      <p>{{ $t('products.tiles.description') }}</p>
  
      <div class="tile-gallery">
        <div
          v-for="tile in tiles"
          :key="tile.id"
          class="tile-card"
          @click="selectTile(tile)"
        >
          <img :src="getImageUrl(tile.image)" :alt="tile.name[$i18n.locale]" />
          <p>{{ tile.name[$i18n.locale] }}</p>
        </div>
      </div>
  
      <!-- Модальное окно для характеристик -->
      <div v-if="selectedTile" class="modal" @click.self="closeModal">
        <div class="modal-content">
          <img :src="getImageUrl(selectedTile.image)" :alt="selectedTile.name[$i18n.locale]" />
          <div class="modal-details">
            <h2>{{ selectedTile.name[$i18n.locale] }}</h2>
            <p><strong>{{ $t('products.tiles.size') }}:</strong> {{ selectedTile.characteristics.size[$i18n.locale] }}</p>
            <p><strong>{{ $t('products.tiles.color') }}:</strong> {{ selectedTile.characteristics.color[$i18n.locale] }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { tiles } from '../data/tiles';
  
  export default {
    data() {
      return {
        tiles: tiles,
        selectedTile: null
      };
    },
    methods: {
      getImageUrl(image) {
        return require(`@/assets/${image}`);
      },
      selectTile(tile) {
        this.selectedTile = tile;
      },
      closeModal() {
        this.selectedTile = null;
      }
    }
  };
  </script>
  
  <style scoped>
  .products-tiles {
    padding: 20px;
    text-align: center;
  }
  
  .tile-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
  }
  
  .tile-card {
    width: 200px;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .tile-card:hover {
    transform: scale(1.05);
  }
  
  .tile-card img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .tile-card p {
    margin-top: 10px;
    font-size: 1rem;
  }
  
  /* Модальное окно */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    gap: 20px;
    max-width: 80%;
  }
  
  .modal-content img {
    width: 300px;
    height: auto;
    border-radius: 8px;
  }
  
  .modal-details {
    text-align: left;
  }
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    .tile-card {
      width: 150px;
    }
  
    .modal-content {
      flex-direction: column;
      align-items: center;
      max-width: 90%;
    }
  
    .modal-content img {
      width: 200px;
    }
  }
  </style>