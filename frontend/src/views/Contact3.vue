<template>
    <div class="contact-page">
      <div class="contact-container">
        <h1 class="contact-title">{{ $t('contact.title') }}</h1>
        
        <div class="contact-grid">
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
          <form class="feedback-form" @submit.prevent="submitForm">
            <h2 class="form-title">{{ $t('feedback.title') }}</h2>
            
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
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Contact',
    data() {
      return {
        form: {
          name: '',
          email: '',
          subject: '',
          message: ''
        },
        loading: false,
        success: false,
        error: false
      }
    },
    methods: {
      async submitForm() {
        this.loading = true;
        this.success = false;
        this.error = false;
  
        try {
          const telegramMessage = `
            📩 Новое сообщение с сайта:
            👤 Имя: ${this.form.name}
            ✉️ Email: ${this.form.email}
            📌 Тема: ${this.$t(`feedback.subjects.${this.form.subject}`)}
            📝 Сообщение: 
            ${this.form.message}
          `;
  
          const response = await fetch(`https://api.telegram.org/bot8033278186:AAGmwTJP3-KAA1H_mY-1yD0Gd4D0nWyCbY8/getUpdates`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: 6871095238,
              text: telegramMessage,
              parse_mode: 'Markdown'
            }),
          });
  
          if (!response.ok) {
            throw new Error('Ошибка отправки в Telegram');
          }
  
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
  /* Стили остаются без изменений */
  .contact-page {
    padding: 40px 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
  }
  
  .contact-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .contact-title {
    text-align: center;
    margin-bottom: 40px;
    color: #2c3e50;
    font-size: 2.5rem;
  }
  
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
  
  .info-card {
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .info-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
  
  .info-card i {
    font-size: 1.8rem;
    color: #42b983;
    margin-bottom: 15px;
  }
  
  .info-card h3 {
    margin: 0 0 10px 0;
    color: #2c3e50;
  }
  
  .info-card p {
    margin: 0;
    color: #7f8c8d;
  }
  
  .feedback-form {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  }
  
  .form-title {
    margin-top: 0;
    margin-bottom: 25px;
    color: #2c3e50;
    font-size: 1.8rem;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
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
    transition: border-color 0.3s;
  }
  
  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    border-color: #42b983;
    outline: none;
  }
  
  .form-group textarea {
    min-height: 120px;
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
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s;
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
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .contact-grid {
      grid-template-columns: 1fr;
    }
    
    .contact-title {
      font-size: 2rem;
    }
    
    .form-title {
      font-size: 1.5rem;
    }
  }
  
  @media (max-width: 480px) {
    .contact-page {
      padding: 20px 10px;
    }
    
    .info-card,
    .feedback-form {
      padding: 20px;
    }
  }
  </style>
  