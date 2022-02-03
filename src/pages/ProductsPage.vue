<template>  
<div class="products-page">
  <Section class="products-page__filtration-section" :headerName="'Filtration'">
    <div class="products-page__sorting">
      <div class="products-page__sorting-inscription">
        Sort
      </div>
      <div class="products-page__sorting-wrap">
        <span class="products-page__sorting-criteria-inscription">Criteria</span>
        <div class="products-page__select-dropdown dropdown">
          {{sortInscription}}
          <div class="header__navigation__dropdown-content">
            <span class="header__navigation__dropdown-link" 
            @click="sortInscription = 'Rating', sortProducts()">
              Rating
            </span>
            <span class="header__navigation__dropdown-link" 
            @click="sortInscription = 'Price', sortProducts()">
              Price
            </span>
            <span class="header__navigation__dropdown-link" 
            @click="sortInscription = 'Creation date', sortProducts()">
              Creation date
            </span>
          </div>
        </div>
      </div>
      <div class="products-page__sorting-type-wrap">
        <span class="products-page__sorting-type-inscription">Type</span>
        <div class="products-page__select-dropdown dropdown">
          {{sortType}}
          <div class="header__navigation__dropdown-content">
            <span class="header__navigation__dropdown-link" 
            @click="ascendingClick">Ascending</span>
            <span class="header__navigation__dropdown-link" 
            @click="descendingClick">Descending</span>
          </div>
        </div>
      </div>
    </div>
    <div class="products-page__genre-filtration">
      <div class="products-page__genre-inscription">
        Genre
      </div>
      <div class="products-page__genre-wrap">
        <p class="products-page__genre-radio"><input type="radio" 
        checked name="genre" @change="filterProductsByGenre('')"> All genres</p>
        <p class="products-page__genre-radio"><input type="radio" name="genre"
        @change="genre = 'shooter', filterProducts()">Shooter</p>
        <p class="products-page__genre-radio"><input type="radio" name="genre"
        @change="genre = 'action', filterProducts()">Action</p>
        <p class="products-page__genre-radio"><input type="radio" name="genre"
        @change="genre = 'arcade', filterProducts()">Arcade</p>
        <p class="products-page__genre-radio"><input type="radio" name="genre"
        @change="genre = 'adventure', filterProducts()">Adventure</p>
      </div>
    </div>
    <div class="products-page__price-filtration">
      <div class="products-page__price-inscription">
        Price
      </div>
      <div class="products-page__price-wrap">
        <p class="products-page__price-radio"><input type="radio" checked name="price" 
        @change="price = 0, filterProducts()">All prices</p>
        <p class="products-page__price-radio"><input type="radio" name="price" 
        @change="price = 5, less = true, filterProducts()">Below 5$</p>
        <p class="products-page__price-radio"><input type="radio" name="price"
        @change="price = 10, less = true, filterProducts()">Below 10$</p>
        <p class="products-page__price-radio"><input type="radio" name="price"
        @change="price = 20, less = true, filterProducts()">Below 20$</p>
        <p class="products-page__price-radio"><input type="radio" name="price"
        @change="price = 50, less = true, filterProducts()">Below 50$</p>
        <p class="products-page__price-radio"><input type="radio" name="price"
        @change="price = 40, less = false, filterProducts()">Over 40$</p>
      </div>
    </div>
    <div class="products-page__platform-filtration">
      <div class="products-page__platform-inscription">
        Platform
      </div>
      <div class="products-page__platform-wrap">
        <p class="products-page__platform-radio"><input type="radio" checked name="platform" 
        @change="platform = '', filterProducts()">All platforms</p>
        <p class="products-page__platform-radio"><input type="radio" name="platform" 
        @change="platform = '1', filterProducts()">PC</p>
        <p class="products-page__platform-radio"><input type="radio" name="platform" 
        @change="platform = '2', filterProducts()">PS</p>
        <p class="products-page__platform-radio"><input type="radio" name="platform"
        @change="platform = '3', filterProducts()">Xbox</p>
      </div>
    </div>
  </Section>
  <Section :headerName="'All products'">
    <div class="products-page__products">
      <div class="products-page__product-card"
      v-for="product in products" :key="product.id">
        <ProductCard :product="product"/>
      </div>
    </div>
  </Section>
</div>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
import ProductCard from '@/components/ProductCard.vue';
import Section from '@/components/Section.vue';
import { IProduct } from '@/interfaces';

@Options({
  components: {
    ProductCard,
    Section
  },

  mounted() {
    axios
      .get('http://localhost:3000/products')
      .then((response) => {
        this.allProducts = response.data;
        this.products = response.data;
        this.sortProducts();
      });
  }
})

export default class Products extends Vue {
  allProducts: IProduct[] = [];
  products: IProduct[] = [];
  sortInscription = 'Rating';
  sortType = 'Descending';
  ascending = false;
  descending = true;

  wasFiltered = false;

  genre = '';
  
  price = 0;
  less = false;

  platform = '';

  filterProducts() {
    if (this.wasFiltered) {
      this.products = this.allProducts.slice();
      this.wasFiltered = false;
    }
    this.wasFiltered = true;
    if (this.genre) {
      this.filterProductsByGenre();
    }
    if (this.price) {
      this.filterProductsByPrice();
    }
    if (this.platform) {
      this.filterProductsByPlatform();
    }
  }

  filterProductsByGenre() {
    this.products = this.products.filter((product) => product.productGenre
      .toLowerCase().includes(this.genre));
  }
  
  filterProductsByPrice() {
    this.products = this.products.filter((product) => (this.less 
      ? product.productPrice < this.price : product.productPrice > this.price));
  }

  filterProductsByPlatform() {
    this.products = this.products.filter((product) => product.categoryId.includes(this.platform));
  }

  ascendingClick() {
    this.sortType = 'Ascending';
    this.ascending = true;
    this.descending = false;
    this.sortProducts();
  }

  descendingClick() {
    this.sortType = 'Descending';
    this.ascending = false;
    this.descending = true;
    this.sortProducts();
  }

  sortProducts() {
    if (this.ascending) {
      if (this.sortInscription === 'Rating') {
        this.products.sort((a, b) => a.productRating - b.productRating);
      } else if (this.sortInscription === 'Price') {
        this.products.sort((a, b) => a.productPrice - b.productPrice);
      } else if (this.sortInscription === 'Creation date') {
        this.products.sort((a, b) => {
          if (a.creationDate < b.creationDate) {
            return -1;
          }
          if (a.creationDate > b.creationDate) {
            return 1;
          }
          return 0;
        });
      }
    } else if (this.descending) {
      if (this.sortInscription === 'Rating') {
        this.products.sort((a, b) => b.productRating - a.productRating);
      } else if (this.sortInscription === 'Price') {
        this.products.sort((a, b) => b.productPrice - a.productPrice);
      } else if (this.sortInscription === 'Creation date') {
        this.products.sort((a, b) => {
          if (a.creationDate < b.creationDate) {
            return 1;
          }
          if (a.creationDate > b.creationDate) {
            return -1;
          }
          return 0;
        });
      }
    }
    return this.products;
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/dropdown-styles.scss';
.products-page {
  display: flex;

  &__sorting-inscription,
  &__genre-inscription,
  &__price-inscription,
  &__platform-inscription {
    font-size: 28px;
    border-bottom: 1px solid $color-black;
    margin-top: 15px;
  }

  &__sorting-wrap,
  &__sorting-type-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }

  &__sorting-type-inscription,
  &__sorting-criteria-inscription {
    font-size: 23px;
  }

  &__filtration-section {
    width: 25%;
  }

  &__select-dropdown {
    width: 160px;
    text-align: center;
    font-size: 23px;
    border-radius: 5px;
    border: 2px solid $color-black;
  }

  &__select-dropdown:hover {
    background: $color-pink;
  }

  &__genre-radio,
  &__price-radio,
  &__platform-radio {
    font-size: 20px;
    margin: 2px;
  }

  &__products {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  }

  &__product-card {
    margin-top: 15px;
    height: 370px;
    width: 235px;
    margin-bottom: 20px;
  }
}
</style>
