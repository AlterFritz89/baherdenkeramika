<template>
    <div ref="rocket" class="rocket">🚀</div>
  </template>
  
  <script>
  import { gsap } from "gsap";
  
  export default {
    mounted() {
      this.animateRocket();
    },
    methods: {
      animateRocket() {
        const rocket = this.$refs.rocket;
        
        // Стартовая позиция (левый верхний угол)
        gsap.set(rocket, { x: 0, y: 0 });
  
        const move = () => {
          const x = Math.random() * (window.innerWidth - 50);
          const y = Math.random() * (window.innerHeight - 50);
          const rotation = Math.random() * 360;
          const duration = 5 + Math.random() * 5;
  
          gsap.to(rocket, {
            x,
            y,
            rotation,
            duration,
            ease: "power1.inOut",
            onComplete: move,  // Зацикливаем анимацию
          });
        };
  
        move();  // Запускаем анимацию
      },
    },
  };
  </script>
  
  <style scoped>
  .rocket {
    position: fixed;
    font-size: 24px;
    z-index: 9999;
    will-change: transform;  /* Оптимизация для анимации */
  }
  </style>