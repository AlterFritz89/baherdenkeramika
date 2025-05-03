<template>
    <div>
      <!-- Анимация появится при showDeepseek = true -->
      <div v-if="showDeepseek" class="deepseek-animation" @click="showDeepseek = false">
        <div class="deepseek-message">
          <span v-for="(char, i) in message" :key="i" :style="{ animationDelay: `${i * 0.1}s` }">
            {{ char }}
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EasterEgg',
    data() {
      return {
        showDeepseek: false,
        message: 'DEEPSEEK_AI+AKMURADOFF_ПРИВЕТСТВУЕТ_ВАС'.split(''), // Разбиваем строку на символы
      };
    },
    mounted() {
      // Обработчик секретной комбинации Ctrl + Shift + D
      const handleKeyDown = (e) => {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
          this.showDeepseek = !this.showDeepseek; // Переключаем пасхалку
          e.preventDefault(); // Отменяем стандартное поведение браузера
        }
      };
  
      // Вешаем слушатель на глобальное окно
      window.addEventListener('keydown', handleKeyDown);
  
      // Удаляем слушатель при уничтожении компонента
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('keydown', handleKeyDown);
      });
    },
  };
  </script>
  
  <style scoped>
  .deepseek-animation {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
  .deepseek-message {
    font-family: 'Courier New', monospace;
    font-size: 2rem;
    color: #0f0; /* Зелёный текст, как в матрице */
    text-shadow: 0 0 10px #0f0;
    text-align: center;
  }
  
  .deepseek-message span {
    display: inline-block;
    opacity: 0;
    animation: appear 0.5s forwards;
  }
  
  @keyframes appear {
    to {
      opacity: 1;
      transform: translateY(0);
    }
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
  </style>