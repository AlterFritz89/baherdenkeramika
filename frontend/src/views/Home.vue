<template>
  <div class="home-page">
    <h1>{{ $t('news.title') }}</h1>
    
    <div v-for="newsItem in newsItems" :key="newsItem.id" class="news-item">
      <h2 class="news-title">
        {{ $i18n.locale === 'ru' ? newsItem.title_ru : newsItem.title_tk }}
      </h2>
      
      <img 
        v-if="newsItem.image"
        :src="getImageUrl(newsItem.image)"
        class="news-image"
      >

      <div class="news-content">
        <p class="preview-text">
          {{ newsItem.isExpanded 
            ? ($i18n.locale === 'ru' ? newsItem.full_text_ru : newsItem.full_text_tk)
            : ($i18n.locale === 'ru' ? newsItem.preview_ru : newsItem.preview_tk) 
          }}
        </p>
        <button 
          @click="toggleExpand(newsItem)"
          class="read-more-btn"
        >
          {{ newsItem.isExpanded ? $t('news.close') : $t('news.readMore') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      newsItems: []
    }
  },
  async created() {
    await this.fetchNews()
  },
  methods: {
    async fetchNews() {
      try {
        const response = await axios.get('http://localhost:8000/api/news/?ordering=-created_at')
        // Добавляем флаг isExpanded к каждой новости
        this.newsItems = response.data.map(item => ({
          ...item,
          isExpanded: false
        }))
      } catch (error) {
        console.error('Ошибка загрузки новостей:', error)
      }
    },
    toggleExpand(newsItem) {
      newsItem.isExpanded = !newsItem.isExpanded
    },
    getImageUrl(imagePath) {
    if (!imagePath) return '';
    // Проверяем, содержит ли путь уже полный URL
    if (imagePath.startsWith('http')) return imagePath;
    // Добавляем базовый URL только если его нет
    return `http://localhost:8000${imagePath}`;
  }
  }
}
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}

.news-item {
  margin-bottom: 40px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.news-title {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.news-image {
  width: 300px;
  height: auto;
  margin-bottom: 15px;
  border-radius: 4px;
}

.preview-text {
  line-height: 1.6;
  margin-bottom: 15px;
  white-space: pre-line;
  text-align: justify;
}

.read-more-btn {
  background-color: orange;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.read-more-btn:hover {
  background-color: #e69500;
}
</style>