<template>
  <header class="site-header">
    <div class="header-container">
      <!-- Левая часть (лого + название) -->
      <div class="header-left">
        <div class="logo-container">
          <img src="@/assets/logo.gif" alt="Логотип" class="logo">
        </div>
        <div class="header-text">
          <h1 class="company-name">{{ $t('welcome') }}</h1>
          <!-- Десктопная навигация -->
          <nav class="main-nav desktop-only">
            <router-link to="/" class="nav-link">{{ $t('navigation.home') }}</router-link>
            <span class="nav-separator">|</span>
            <router-link to="/about" class="nav-link">{{ $t('navigation.about') }}</router-link>
            <span class="nav-separator">|</span>
            <router-link to="/products" class="nav-link">{{ $t('navigation.products') }}</router-link>
            <span class="nav-separator">|</span>
            <router-link to="/contact" class="nav-link">{{ $t('navigation.contact') }}</router-link>
          </nav>
        </div>
      </div>

      <!-- Правая часть (десктопные языки + бургер) -->
      <div class="header-right">
        <div class="language-switcher-desktop desktop-only">
          <button @click="switchLanguage('tm')" :class="{ active: $i18n.locale === 'tm' }">TKM</button>
          <button @click="switchLanguage('ru')" :class="{ active: $i18n.locale === 'ru' }">RUS</button>
        </div>
        
        <!-- Бургер-кнопка (только мобильные) -->
        <button 
          class="burger-menu mobile-only" 
          @click="toggleMenu"
          :aria-expanded="isMenuOpen"
        >
          <span class="burger-line"></span>
          <span class="burger-line"></span>
          <span class="burger-line"></span>
        </button>
      </div>
    </div>

    <!-- Мобильное меню (слева направо) -->
    <div class="mobile-menu" :class="{ active: isMenuOpen }">
      <nav class="mobile-nav">
        <router-link to="/" class="mobile-nav-link" @click="closeMenu">{{ $t('navigation.home') }}</router-link>
        <router-link to="/about" class="mobile-nav-link" @click="closeMenu">{{ $t('navigation.about') }}</router-link>
        <router-link to="/products" class="mobile-nav-link" @click="closeMenu">{{ $t('navigation.products') }}</router-link>
        <router-link to="/contact" class="mobile-nav-link" @click="closeMenu">{{ $t('navigation.contact') }}</router-link>
        
        <!-- Языковые кнопки внутри меню -->
        <div class="language-switcher-mobile">
          <button @click="switchLanguage('tm')" :class="{ active: $i18n.locale === 'tm' }">TKM</button>
          <button @click="switchLanguage('ru')" :class="{ active: $i18n.locale === 'ru' }">RUS</button>
        </div>
      </nav>
    </div>
    <!-- Оверлей для затемнения фона -->
    <div class="mobile-menu-overlay" :class="{ active: isMenuOpen }" @click="closeMenu"></div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    switchLanguage(lang) {
    this.$i18n.locale = lang;
    localStorage.setItem('locale', lang);
    this.closeMenu();
},
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    }
  }
}
</script>

<style scoped>
/* Общие стили (десктоп) */
.site-header {
  background-color: orange;
  color: white;
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-container {
  width: 60px;
  flex-shrink: 0;
}

.logo {
  width: 100%;
  height: auto;
  display: block;
}

.company-name {
  font-size: 1.2rem;
  margin: 0;
  line-height: 1.2;
  white-space: nowrap;
}

.main-nav {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0 5px;
}

.nav-link:hover {
  opacity: 0.8;
}

.nav-link.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}

.nav-separator {
  margin: 0 5px;
  color: rgba(255, 255, 255, 0.7);
}

.language-switcher-desktop {
  display: flex;
  gap: 10px;
}

.language-switcher-desktop button {
  background: none;
  border: 1px solid white;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.language-switcher-desktop button.active {
  background: white;
  color: orange;
}

/* Бургер-меню (мобильные) */
.burger-menu {
  display: none;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
}

.burger-line {
  display: block;
  width: 22px;
  height: 2px;
  background: white;
  margin: 4px 0;
  transition: transform 0.3s, opacity 0.3s;
}

.burger-menu[aria-expanded="true"] .burger-line:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.burger-menu[aria-expanded="true"] .burger-line:nth-child(2) {
  opacity: 0;
}

.burger-menu[aria-expanded="true"] .burger-line:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

/* Мобильное меню (слева направо) */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 80%;
  max-width: 300px;
  background: orange;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1001;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
}

.mobile-menu.active {
  transform: translateX(0);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100%;
}

.mobile-nav-link {
  color: white;
  text-decoration: none;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 1rem;
}

.mobile-nav-link:hover {
  opacity: 0.8;
}

.language-switcher-mobile {
  display: flex;
  gap: 10px;
  padding: 15px 0;
  justify-content: left;
}

.language-switcher-mobile button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
}

.language-switcher-mobile button.active {
  background: white;
  color: orange;
}

/* Оверлей для затемнения фона */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 1000;
}

.mobile-menu-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Адаптивность */
@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }

  .mobile-only {
    display: block !important;
  }

  .burger-menu {
    display: flex;
    flex-direction: column;
  }

  .header-container {
    padding: 10px 20px;
  }

  .company-name {
    font-size: 1rem;
  }
}
</style>