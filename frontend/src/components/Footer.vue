<template>
  <footer class="site-footer">
    <div class="footer-content">
      <p class="copyright">
        © 2025 | All rights reserved | 
        <span class="link-group">
          <a 
            href="https://deepseek.com" 
            target="_blank"
            class="footer-link deepseek"
            @click.prevent="redirectToDeepseek"
          >
            deepseek_ai
          </a>
          <span class="divider">+</span>
          <a 
            href="https://akmuradoff.com" 
            target="_blank"
            class="footer-link akmurad"
            @click.prevent="redirectToAkmuradoff"
          >
            akmuradoff
          </a>
        </span>
        <br />
        <span class="credits">Special credits to | Soyunov Jumageldi</span>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    redirectToDeepseek() {
      window.open('https://deepseek.com', '_blank');
    },
    redirectToAkmuradoff() {
      window.open('https://akmuradoff.com', '_blank');
    }
  }
}
</script>

<style scoped>
.site-footer {
  background-color: #000;
  color: #fff;
  padding: 30px 0;
  position: relative;
  bottom: 0;
  border-top: 1px solid #333;
  font-family: 'Arial', sans-serif;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 0 20px;
}

.copyright {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #aaa;
}

.link-group {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.footer-link {
  color: #4fc3f7;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  padding: 0 5px;
}

.footer-link:hover {
  color: #64ffda;
  text-shadow: 0 0 10px rgba(100, 255, 218, 0.7);
}

.footer-link::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: -3px;
  left: 0;
  background: linear-gradient(90deg, transparent, #4fc3f7, transparent);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.footer-link:hover::after {
  transform: scaleX(1);
}

.deepseek:hover {
  color: #9d7bff;
  text-shadow: 0 0 12px rgba(157, 123, 255, 0.7);
}

.akmurad:hover {
  color: #38ef7d;
  text-shadow: 0 0 12px rgba(56, 239, 125, 0.7);
}

.divider {
  color: #666;
  font-weight: bold;
  animation: pulse 2s infinite;
  user-select: none;
}

@keyframes pulse {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.credits {
  display: inline-block;
  margin-top: 8px;
  font-size: 0.85rem;
  color: #777;
}

@media (max-width: 768px) {
  .copyright {
    font-size: 0.82rem;
  }
  
  .divider {
    font-size: 0.9rem;
  }
}

/* Дополнительный "вау"-эффект для ссылок */
.footer-link {
  background: linear-gradient(90deg, transparent, rgba(79, 195, 247, 0.1), transparent);
  background-size: 200% 100%;
  background-position: 100% 0;
  transition: background-position 0.5s ease;
}

.footer-link:hover {
  background-position: 0 0;
}

/* Для "космического" DeepSeek */
.deepseek {
  text-shadow: 0 0 5px rgba(157, 123, 255, 0.5);
}

/* Для "крипто-зелёного" Akmuradoff */
.akmurad {
  text-shadow: 0 0 5px rgba(56, 239, 125, 0.5);
}
</style>