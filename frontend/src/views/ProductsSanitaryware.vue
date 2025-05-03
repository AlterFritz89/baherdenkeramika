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
        {{ getLocalizedName(category) }}
      </button>
    </div>

    <div v-if="loading" class="loading-spinner">
      <div class="spinner"></div>
    </div>

    <div v-else class="products-gallery">
      <div 
        v-for="product in filteredProducts" 
        :key="product.id"
        class="product-card"
        @click="selectedProduct = product"
      >
        <img 
          :src="getImageUrl(product.image_url)" 
          :alt="getLocalizedName(product)"
          class="product-image"
          @error="handleImageError"
        >
        <div class="product-info">
          <h3>{{ getLocalizedName(product) }}</h3>
          <p class="price">{{ product.price }} {{ $t('currency') }}</p>
        </div>
      </div>
    </div>

    <ProductModal 
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="selectedProduct = null"
      @add-to-cart="addToCart"
    />

    <button @click="$router.go(-1)" class="back-btn">
      {{ $t('back.back') }}
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import ProductModal from '@/views/ProductModal.vue';

export default {
  name: 'SanitarywareProducts',
  components: {
    ProductModal
  },
  data() {
    return {
      products: [],
      categories: [],
      activeCategory: null,
      selectedProduct: null,
      loading: true,
      error: null
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => product.category.id === this.activeCategory);
    }
  },
  methods: {
    getLocalizedName(item) {
      return item[`name_${this.$i18n.locale}`] || item.name_tk || '';
    },
    getImageUrl(imagePath) {
      if (!imagePath) return '/images/placeholder.jpg';
      return imagePath;
    },
    handleImageError(e) {
      e.target.src = '/images/placeholder.jpg';
    },
    addToCart(product) {
      this.$store.dispatch('cart/addItem', product);
      this.$toast.success(this.$t('cart.added_to_cart'));
    },
    async fetchData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('http://localhost:8000/api/sanitary/products/'),
          axios.get('http://localhost:8000/api/sanitary/categories/')
        ]);
        
        this.products = productsRes.data;
        this.categories = categoriesRes.data;
        this.activeCategory = this.categories[0]?.id || null;
      } catch (error) {
        this.error = error;
        this.$toast.error(this.$t('errors.loading_data'));
      } finally {
        this.loading = false;
      }
    }
  },
  async created() {
    await this.fetchData();
  }
}
</script>

<style scoped>
/* Ваши существующие стили остаются без изменений */
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
.loading-spinner {
  display: flex;
  justify-content: center;
  padding: 50px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>