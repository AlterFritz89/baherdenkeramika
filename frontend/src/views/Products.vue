<template>
    <div class="products-page">
      <h1>{{ $t('products.title') }}</h1>
  
      <div class="product-links">
        <router-link to="/products/tiles" class="product-card">
          <h2>{{ $t('products.tiles.heading') }}</h2>
          <p>{{ $t('products.tiles.description') }}</p>
        </router-link>
  
        <router-link to="/products/sanitaryware" class="product-card">
          <h2>{{ $t('products.sanitaryware.heading') }}</h2>
          <p>{{ $t('products.sanitaryware.description') }}</p>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Products'
  }
  </script>
  
  <style scoped>
  .products-page {
    padding: 20px;
    text-align: center;
  }
  
  .product-links {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
  }
  
  .product-card {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    width: 45%;
    text-decoration: none;
    color: inherit;
    transition: transform 0.3s ease;
  }
  
  .product-card:hover {
    transform: scale(1.05);
  }
  
  .product-card h2 {
    margin-bottom: 10px;
    font-size: 1.5rem;
  }
  
  .product-card p {
    font-size: 1rem;
    color: #555;
  }
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    .product-card {
      width: 100%;
    }
  }
  </style>