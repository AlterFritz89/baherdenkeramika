<template>
  <div class="feedback-page">
    <div class="feedback-container">
      <h1 class="feedback-title">{{ $t('feedback.title') }}</h1>
      
      <form class="feedback-form" @submit.prevent="submitForm">
        <div class="form-group">
          <input 
            type="text" 
            v-model="form.name" 
            :placeholder="$t('feedback.name_placeholder')"
            required
          >
        </div>
        
        <div class="form-group">
          <input 
            type="email" 
            v-model="form.email" 
            :placeholder="$t('feedback.email_placeholder')"
            required
          >
        </div>
        
        <div class="form-group">
          <textarea 
            v-model="form.message" 
            :placeholder="$t('feedback.message_placeholder')"
            required
          ></textarea>
        </div>
        
        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? $t('feedback.sending') : $t('feedback.submit') }}
        </button>
      
        <div v-if="success" class="success-message">
          {{ $t('feedback.success') }}
        </div>
        <div v-if="error" class="error-message">
          {{ $t('feedback.error') }}
        </div>
      </form>
      <div class="feedback-list">
        <h2>{{ $t('feedback.approved_feedbacks') }}</h2>
        
        <div v-if="loadingFeedbacks">Загрузка отзывов...</div>
        <div v-else-if="feedbacks.length === 0">Нет одобренных отзывов</div>
        
        <div v-for="feedback in feedbacks" :key="feedback.id" class="feedback-item">
          <p><strong>{{ feedback.name }}</strong> ({{ feedback.email }})</p>
          <p>{{ feedback.message }}</p>
          <small>{{ new Date(feedback.created_at).toLocaleString() }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      },
      feedbacks: [],
      loading: false,
      loadingFeedbacks: false,
      success: false,
      error: false,
      isCached: false
    }
  },
  async mounted() {
    // Пробуем загрузить из кеша сразу
    const cached = localStorage.getItem('cachedFeedbacks');
    if (cached) {
      this.feedbacks = JSON.parse(cached);
      this.isCached = true;
    }
    // Затем загружаем свежие данные
    await this.loadApprovedFeedbacks();
  },
  methods: {
    async loadApprovedFeedbacks() {
      this.loadingFeedbacks = true;
      this.isCached = false;
      try {
        // Добавляем случайный параметр для избежания кеширования
        const timestamp = new Date().getTime();
        const response = await fetch(`http://localhost:8000/api/feedback/approved/?t=${timestamp}`);
        
        if (!response.ok) throw new Error('Ошибка загрузки');
        
        this.feedbacks = await response.json();
        
        // Сохраняем в локальное хранилище
        localStorage.setItem('cachedFeedbacks', JSON.stringify(this.feedbacks));
      } catch (error) {
        console.error('Ошибка:', error);
        // Пробуем загрузить из кеша, если API не доступен
        const cached = localStorage.getItem('cachedFeedbacks');
        if (cached) {
          this.feedbacks = JSON.parse(cached);
          this.isCached = true;
        }
      } finally {
        this.loadingFeedbacks = false;
      }
    },
    async submitForm() {
      this.loading = true;
      this.success = false;
      this.error = false;
      
      try {
        const csrfToken = document.cookie.match(/csrftoken=([^;]+)/)?.[1];
        const response = await fetch('http://localhost:8000/api/feedback/approved/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          body: JSON.stringify(this.form)
        });

        if (!response.ok) throw new Error('Ошибка сервера');
        
        this.success = true;
        this.form = { name: '', email: '', message: '' };
        
        // Очищаем кеш и перезагружаем отзывы
        localStorage.removeItem('cachedFeedbacks');
        await this.loadApprovedFeedbacks();
      } catch (error) {
        console.error('Ошибка:', error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
/* Ваши существующие стили остаются без изменений */
.feedback-item {
  background: #f8f9fa;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  border-left: 4px solid #42b983;
}

.success-message {
  color: #42b983;
  margin-top: 10px;
}

.error-message {
  color: #dc3545;
  margin-top: 10px;
}
.pending { opacity: 0.6; background: #fff8e1; }
.approved { background: #e8f5e9; }

/* Адаптивные стили (оставь свои, но добавь это) */
.feedback-item {
  background: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

@media (max-width: 768px) {
  .feedback-form, .feedback-item {
    padding: 15px;
  }
}

.empty-message {
  text-align: center;
  color: #666;
  margin-top: 20px;
}

.approved-feedbacks {
  margin-top: 40px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.feedback-item {
  background: #f9f9f9;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
}

.feedback-meta {
  color: #666;
  font-size: 0.9em;
  margin-top: 10px;
}

.feedback-page {
  padding: 40px 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  display: flex;
  align-items: top;
  justify-content: center;
}

.feedback-container {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
}

.feedback-title {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.feedback-form {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.form-group textarea {
  min-height: 150px;
  resize: vertical;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #369f6e;
}

.submit-btn:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.success-message,
.error-message {
  margin-top: 20px;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
}

@media (max-width: 768px) {
  .feedback-page {
    padding: 20px;
  }
  
  .feedback-form {
    padding: 20px;
  }
}
</style>