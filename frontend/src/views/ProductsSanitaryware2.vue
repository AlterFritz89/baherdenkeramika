<template>
  <div class="sanitaryware-page">
    <div class="page-header">
      <h1>{{ $t('products.sanitaryware.heading') }}</h1>
      <p>{{ $t('products.sanitaryware.description') }}</p>
    </div>

    <div class="categories">
      <button 
        v-for="category in categories"
        :key="category.id"
        @click="activeCategory = category.id"
        :class="{ active: activeCategory === category.id }"
      >
        {{ category.name[$i18n.locale] }}
      </button>
    </div>

    <div class="products-gallery">
      <div 
        v-for="product in filteredProducts" 
        :key="product.id"
        class="product-card"
        @click="selectedProduct = product"
      >
        <img 
          :src="getImageUrl(product.image)" 
          :alt="product.name[$i18n.locale]"
          class="product-image"
        >
        <div class="product-info">
          <h3>{{ product.name[$i18n.locale] }}</h3>
          <p class="price">{{ product.price }} {{ $t('currency') }}</p>
        </div>
      </div>
    </div>

    <!-- Модальное окно с деталями продукта -->
    <div v-if="selectedProduct" class="modal-overlay" @click.self="selectedProduct = null">
      <div class="modal-content">
        <img 
          :src="getImageUrl(selectedProduct.image)" 
          :alt="selectedProduct.name[$i18n.locale]"
          class="modal-image"
        >
        <div class="modal-text">
          <h2>{{ selectedProduct.name[$i18n.locale] }}</h2>
          <div class="specs">
            <p><strong>{{ $t('products.sanitaryware.material') }}:</strong> {{ selectedProduct.characteristics.material[$i18n.locale] }}</p>
            <p><strong>{{ $t('products.sanitaryware.dimensions') }}:</strong> {{ selectedProduct.characteristics.dimensions[$i18n.locale] }}</p>
            <p><strong>{{ $t('products.sanitaryware.color') }}:</strong> {{ selectedProduct.characteristics.color[$i18n.locale] }}</p>
            <p><strong>{{ $t('products.sanitaryware.price') }}:</strong> {{ selectedProduct.price }} {{ $t('currency') }}</p>
          </div>
          <div class="modal-buttons">
            <button @click="selectedProduct = null" class="close-btn">
              {{ $t('news.close') }}
            </button>
            <button @click="addToCart(selectedProduct)" class="cart-btn">
              {{ $t('add.add_to_cart') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button @click="$router.go(-1)" class="back-btn">
        {{ $t('back.back') }}
      </button>
</template>

<script>
// Получение продуктов
axios.get('http://localhost:8000/api/products/')
  .then(response => {
    this.products = response.data;
  });
  
const sanitarywareProducts = [
  {
    id: 1,
    category: 1, // Унитазы
    name: {
      tk: "Standart WC",
      ru: "Унитаз стандартный"
    },
    image: "wc1.png",
    price: 2500,
    characteristics: {
      material: {
        tk: "Farfor",
        ru: "Фарфор"
      },
      dimensions: {
        tk: "36x66x40 sm",
        ru: "36×66×40 см"
      },
      color: {
        tk: "Ak",
        ru: "Белый"
      }
    }
  },
  {
    id: 2,
    category: 2, // Раковины
    name: {
      tk: "Tegelek çokek",
      ru: "Раковина круглая"
    },
    image: "sink1.jpg",
    price: 1800,
    characteristics: {
      material: {
        tk: "Keramika",
        ru: "Керамика"
      },
      dimensions: {
        tk: "40x40 sm",
        ru: "Ø40 см"
      },
      color: {
        tk: "Ak",
        ru: "Белый"
      }
    }
  },
  // Дополните список своими продуктами
];

const categories = [
  { id: 1, name: { tk: "Unitaz", ru: "Унитазы" } },
  { id: 2, name: { tk: "El ýuwar", ru: "Раковины" } },
  { id: 3, name: { tk: "Unitaz daşy", ru: "Чашаген" } },
  { id: 4, name: { tk: "Diwara asylýan unitaz", ru: "Настенный унитаз" } }
];

export default {
  name: 'SanitarywareProducts',
  data() {
    return {
      products: sanitarywareProducts,
      categories: categories,
      activeCategory: 1, // Выбранная категория по умолчанию
      selectedProduct: null
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => product.category === this.activeCategory);
    }
  },
  methods: {
    getImageUrl(imageName) {
      // Для файлов в public/
      return `/images/sanitaryware/${imageName}`;
    },
    addToCart(product) {
      // Здесь логика добавления в корзину
      this.$store.dispatch('cart/addItem', product);
      this.selectedProduct = null;
    }
  }
}
</script>

<style scoped>
.sanitaryware-page {
  padding: 0px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 10px;
  text-align: center;
}

.back-btn {
  padding: 8px 15px;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
  transition: all 0.3s;
}

.back-btn:hover {
  background: #e0e0e0;
}

.categories {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.categories button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.categories button.active {
  background: #2c3e50;
  color: white;
  border-color: #2c3e50;
}

.products-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}

.product-card {
  cursor: pointer;
  transition: transform 0.3s;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
}

.product-info {
  padding: 15px;
}

.product-info h3 {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
}

.price {
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  display: flex;
  max-width: 900px;
  width: 90%;
}

.modal-image {
  width: 400px;
  height: auto;
  object-fit: contain;
  border-radius: 4px;
  margin-right: 30px;
}

.modal-text {
  flex: 1;
}

.specs {
  margin: 20px 0;
}

.specs p {
  margin: 10px 0;
}

.modal-buttons {
  display: flex;
  gap: 15px;
  margin-top: 25px;
}

.close-btn {
  padding: 10px 20px;
  background: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.cart-btn {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.cart-btn:hover {
  background: #369f6e;
}

/* Адаптация для мобильных */
@media (max-width: 768px) {
  .modal-content {
    flex-direction: column;
    padding: 20px;
  }
  
  .modal-image {
    width: 200px;
    margin-right: 0;
    margin-bottom: 20px;
  }
  
  .products-gallery {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
}
</style>