<template>
  <div class="contact-page">
    <div class="contact-container">
      <h1 class="contact-title">{{ $t('contact.title') }}</h1>
      
      <div class="contact-info-container">
        <!-- Контактная информация -->
        <div class="contact-info">
          <div class="info-card">
            <i class="fas fa-map-marker-alt"></i>
            <h3>{{ $t('contact.address') }}</h3>
            <p>{{ $t('contact.address2') }}</p>
          </div>
          
          <div class="info-card">
            <i class="fas fa-phone"></i>
            <h3>{{ $t('contact.phone') }}</h3>
            <p>{{ $t('contact.phone2') }}</p>
          </div>
          
          <div class="info-card">
            <i class="fas fa-envelope"></i>
            <h3>{{ $t('contact.email') }}</h3>
            <p>{{ $t('contact.email2') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPage'
}
</script>

<style scoped>
.contact-page {
  padding: 10px 10px;
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
  font-size: 1.5rem;
}

.contact-info-container {
  display: flex;
  justify-content: left;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 600px;
  width: 100%;
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
  line-height: 1.6;
}

/* Адаптивность */
@media (max-width: 768px) {
  .contact-title {
    font-size: 2rem;
  }
  
  .contact-info {
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .contact-page {
    padding: 20px 10px;
  }
  
  .info-card {
    padding: 20px;
  }
}
</style>