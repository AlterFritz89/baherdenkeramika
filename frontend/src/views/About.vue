<template>
  <div class="about-page">
    <div class="section-header">
      <h1>{{ $t('about.title') }}</h1>
      <div class="section-tabs">
        <button 
          @click="activeTab = 'about'"
          :class="{ active: activeTab === 'about' }"
        >
          {{ $t('about.tabs.about') }}
        </button>
        <button 
          @click="activeTab = 'gallery'"
          :class="{ active: activeTab === 'gallery' }"
        >
          {{ $t('about.tabs.gallery') }}
        </button>
      </div>
    </div>

    <div v-if="activeTab === 'about'" class="about-section">
      <div class="about-content">
        <p>{{ $t('about.text') }}</p>
      </div>
    </div>

    <div v-if="activeTab === 'gallery'" class="gallery-section">
      <div class="gallery-grid">
        <div 
          v-for="(image, index) in galleryImages" 
          :key="image.id"
          class="gallery-item"
          @click="openGallery(index)"
        >
          <img 
            v-if="image.image"
            :src="getImageUrl(image.image)"
            :alt="currentLanguage === 'ru' ? image.title_ru : image.title_tk"
            class="gallery-thumb"
          >
          <div class="image-overlay">
            <h3>{{ currentLanguage === 'ru' ? image.title_ru : image.title_tk }}</h3>
          </div>
        </div>
      </div>
    </div>

        <!-- Модальное окно галереи -->
    <div v-if="galleryActive" class="gallery-modal">
      <div class="modal-overlay" @click="closeGallery"></div>
      <div class="modal-content">
        <button class="nav-btn prev-btn" @click.stop="prevImage">❮</button>
        <div class="image-container">
          <img 
            :src="getImageUrl(currentImage.image)"
            :alt="currentLanguage === 'ru' ? currentImage.title_ru : currentImage.title_tk"
            class="modal-image"
            @error="handleImageError"
          >
          <div class="image-info">
            <h2>{{ currentLanguage === 'ru' ? currentImage.title_ru : currentImage.title_tk }}</h2>
            <p>{{ currentLanguage === 'ru' ? currentImage.description_ru : currentImage.description_tk }}</p>
          </div>
        </div>
        <button class="nav-btn next-btn" @click.stop="nextImage">❯</button>
        <button class="close-btn" @click.stop="closeGallery">×</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      activeTab: 'about',
      galleryImages: [],
      galleryActive: false,
      currentImageIndex: 0,
      currentLanguage: this.$i18n.locale
    }
  },
  computed: {
    currentImage() {
      return this.galleryImages[this.currentImageIndex] || {}
    }
  },
  async created() {
    await this.fetchGalleryImages()
    this.$watch(() => this.$i18n.locale, (newVal) => {
      this.currentLanguage = newVal
    })
  },
  methods: {
    async fetchGalleryImages() {
      try {
        const response = await axios.get('http://localhost:8000/api/gallery/')
        this.galleryImages = response.data
      } catch (error) {
        console.error('Ошибка загрузки галереи:', error)
      }
    },
    openGallery(index) {
      this.currentImageIndex = index
      this.galleryActive = true
      document.body.style.overflow = 'hidden'
    },
    closeGallery() {
      this.galleryActive = false
      document.body.style.overflow = 'auto'
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.galleryImages.length
    },
    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.galleryImages.length) % this.galleryImages.length
    },
    getImageUrl(imagePath) {
    if (!imagePath) return '';
    // Если путь уже содержит домен (например, при использовании CDN)
    if (imagePath.startsWith('http')) return imagePath;
    // Добавляем базовый URL Django
    return `http://localhost:8000${imagePath}`;
  },
  }
}
</script>

<style scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.section-tabs {
  display: flex;
  gap: 10px;
}

.section-tabs button {
  padding: 8px 16px;
  background: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.section-tabs button.active {
  background: orange;
  color: white;
}

.about-content {
  text-align: justify;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.gallery-item {
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
  aspect-ratio: 1;
}

.gallery-item:hover {
  transform: scale(1.03);
}

.gallery-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  padding: 20px;
  color: white;
}

.image-overlay h3 {
  margin: 0;
  font-size: 1rem;
}

/* Модальное окно */
.gallery-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.9);
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  z-index: 1001;
  display: flex;
  align-items: center;
  gap: 20px;
}

.image-container {
  max-width: 80%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.modal-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
}

.image-info {
  background: white;
  padding: 15px;
  border-radius: 0 0 8px 8px;
  max-width: 100%;
}

.image-info h2 {
  margin-top: 0;
}

.nav-btn, .close-btn {
  background: rgba(255,255,255,0.3);
  color: white;
  border: none;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.nav-btn:hover, .close-btn:hover {
  background: rgba(255,255,255,0.5);
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
}

.prev-btn {
  left: 20px;
}

.next-btn {
  right: 20px;
}

/* Адаптивность */
@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .modal-content {
    flex-direction: column;
  }
  
  .image-container {
    max-width: 100%;
  }
  
  .nav-btn, .close-btn {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
}
</style>