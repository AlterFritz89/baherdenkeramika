<template>
  <div class="feedback-page">
    <div class="feedback-container">
      <h1 class="feedback-title">{{ $t('feedback.title') }}</h1>
      
      <div class="content-grid">
        <!-- Контактная информация -->
        <div class="contact-info">
          <div class="info-card">
            <i class="fas fa-map-marker-alt"></i>
            <h3>{{ $t('contact.address') }}</h3>
            <p>{{ $t('contact.placeholderaddress') }}</p>
          </div>
          
          <div class="info-card">
            <i class="fas fa-phone"></i>
            <h3>{{ $t('contact.phone') }}</h3>
            <p>{{ $t('contact.placeholderphone') }}</p>
          </div>
          
          <div class="info-card">
            <i class="fas fa-envelope"></i>
            <h3>{{ $t('contact.email') }}</h3>
            <p>{{ $t('contact.placeholderemail') }}</p>
          </div>
        </div>
        
        <!-- Форма обратной связи -->
        <form form class="feedback-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">{{ $t('feedback.name') }}</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              :placeholder="$t('feedback.name_placeholder')"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="email">{{ $t('feedback.email') }}</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              :placeholder="$t('feedback.email_placeholder')"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="subject">{{ $t('feedback.subject') }}</label>
            <select id="subject" v-model="form.subject" required>
              <option value="">{{ $t('feedback.select_subject') }}</option>
              <option value="question">{{ $t('feedback.question') }}</option>
              <option value="order">{{ $t('feedback.order') }}</option>
              <option value="cooperation">{{ $t('feedback.cooperation') }}</option>
              <option value="other">{{ $t('feedback.other') }}</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="message">{{ $t('feedback.message') }}</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              :placeholder="$t('feedback.message_placeholder')"
              required
            ></textarea>
          </div>
          
          <button type="submit" class="submit-btn" :disabled="loading">
            <span v-if="!loading">{{ $t('feedback.submit') }}</span>
            <span v-else>{{ $t('feedback.sending') }}...</span>
          </button>
          
          <div v-if="success" class="success-message">
            {{ $t('feedback.success') }}
          </div>
          
          <div v-if="error" class="error-message">
            {{ $t('feedback.error') }}
          </div>
        </form>
      </div>

      <!-- Одобренные отзывы -->
      <div class="feedback-list" v-if="feedbacks.length">
        <h2 class="feedback-list-title">{{ $t('feedback.approved_comments') }}</h2>
        <div class="feedback-item" v-for="feedback in feedbacks" :key="feedback.id">
          <p><strong>{{ feedback.name }}</strong> ({{ $t(`feedback.subjects.${feedback.subject}`) }})</p>
          <p>{{ feedback.message }}</p>
          <small>{{ new Date(feedback.created_at).toLocaleDateString($i18n.locale) }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FeedbackForm',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      feedbacks: [],
      loading: false,
      success: false,
      error: false
    }
  },
  async created() {
    await this.fetchFeedbacks();
  },
  methods: {
    async fetchFeedbacks() {
      try {
        const response = await axios.get('http://localhost:8000/api/feedback/');
        this.feedbacks = response.data;
      } catch (err) {
        console.error('Ошибка загрузки отзывов:', err);
      }
    },
    async submitForm() {
      this.loading = true;
      this.success = false;
      this.error = false;

      try {
        await axios.post('http://localhost:8000/api/feedback/', this.form);
        this.success = true;
        this.form = { name: '', email: '', subject: '', message: '' };
      } catch (err) {
        console.error('Ошибка отправки:', err);
        this.error = true;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.feedback-page {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.feedback-container {
  max-width: 1200px;
  width: 100%;
}

.feedback-title {
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
  font-size: 1.8rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.info-card i {
  font-size: 1.5rem;
  color: #42b983;
  margin-bottom: 10px;
}

.info-card h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 8px;
}

.info-card p {
  font-size: 0.9rem;
  color: #666;
}

.feedback-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #2c3e50;
  font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
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
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
}

.feedback-list {
  margin-top: 30px;
}

.feedback-list-title {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #2c3e50;
}

.feedback-item {
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.feedback-item p {
  margin: 5px 0;
  font-size: 0.9rem;
}

.feedback-item small {
  color: #666;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .feedback-page {
    padding: 15px;
  }

  .feedback-container {
    max-width: 100%;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .feedback-title {
    font-size: 1.5rem;
  }

  .feedback-form {
    padding: 15px;
  }
}
</style>