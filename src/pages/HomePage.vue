<template>
  <div class="home">
    <div class="home__content">
      <div class="home__content__search">
        <Section class="home__section" headerName="Search">
          <div class="home__content__search-input">
            <Input :inputType="'text'" 
            @input-event="createRequest"
            :placeholder="'Enter game name'"/>
          </div>
          <div class="home__content__search-result">
            <ProductCard v-for="product in products" 
            :key="product.id"
            :product="product"
            class="home__content__search-result-card"/>
          </div>
        </Section>
      </div>
      <div class="home__content__categories">
        <Section class="home__section" headerName="Categories">
          <div class="home__content__categories-wrap">
            <CategoryCard v-for="category in platformCategories" 
            class="home__content__category"
            :key="category.id" 
            :category="category"/>
          </div>
        </Section>
      </div>
      <div class="home__content__last-products">
        <Section class="home__section" headerName="Recently added">
          <div class="home__content__last-products-wrap">
            <ProductCard @cart-actions="showCartAlert" 
            @non-authorized="showNonAuthorizedAlert"
            v-for="product in sortedLastProducts.slice(0,3)" 
            :key="product.id" 
            :product="product"
            class="home__content__last-product"/>
          </div>
        </Section>
      </div>
    </div> 
  </div>
  <Alert v-if="showAlert" :isSuccess="isSuccess" :isError="!isSuccess" :message="alertMessage"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import axios from 'axios'
import CategoryCard from '@/components/CategoryCard.vue'
import ProductCard from '@/components/ProductCard.vue'
import Section from '@/components/Section.vue'
import Alert from '@/components/Alert.vue';
import Input from '@/components/Input.vue'
import { IProduct, ICategory } from '@/interfaces'

@Options({
  components: {
    CategoryCard,
    ProductCard,
    Section,
    Input,
    Alert
  },
  computed: {
    sortedLastProducts() {
      this.recentlyProducts.sort((a, b) => {
        if (a.creationDate < b.creationDate) {
          return 1;
        }
        if (a.creationDate > b.creationDate) {
          return -1;
        }
        return 0;
      });
      return this.recentlyProducts;
    }
  },
  mounted() {
    axios
      .get('http://localhost:3000/products')
      .then((response) => {
        this.recentlyProducts = response.data
      });
    axios
      .get('http://localhost:3000/categories')
      .then((response) => {
        this.platformCategories = response.data
      });  
  }
})
export default class HomePage extends Vue {
  products: IProduct[] = [];
  recentlyProducts: IProduct[] = [];
  platformCategories: ICategory[] = [];
  ifProductsLoading = true;

  showAlert = false;
  isSuccess = true;
  alertMessage = 'Successfully added to cart';
  
  createRequest(value) {
    if (value !== '') {
      axios
        .get(`http://localhost:3000/products?productName_like=^${value}`)
        .then((response) => {
          this.products = response.data
        })
    } else {
      this.products.length = 0
    }
  }
  
  showCartAlert(value) {
    this.showAlert = true;
    this.isSuccess = true;
    setTimeout(() => { this.showAlert = false }, 2000);
    this.alertMessage = value ? 'Successfully added to cart' : 'Successfully removed from cart'
  }

  showNonAuthorizedAlert() {
    this.showAlert = true;
    this.isSuccess = false;
    setTimeout(() => { this.showAlert = false }, 2000);
    this.alertMessage = 'First you need to log in / register'
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;

  &__content {

    &__search-input {
      height: 40px;
      width: 60%;
      margin: 0 auto;
      font-size: 150%;
    }

    &__search-result {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    }

    &__search-result-card {
      margin-top: 15px;
      width: 235px;
      height: 370px;
      margin-bottom: 20px;
    }
    
    &__last-products-wrap {
      display: flex;
      justify-content: space-between;
      height: 370px;
    }

    &__last-product {
      width: 235px;
    }

    &__categories-wrap {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    &__category {
      margin: 0 15px;
    }
  }

  &__section {
    width: 65%;
  }
}
</style>
