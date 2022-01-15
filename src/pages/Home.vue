<template>
  <div class="home">
    <div class="home__content">
      <div class="home__content__search">
        <Section headerName="Search">
          <div class="home__content__search__input">
            <Input :inputType="'text'" 
            @input-event="createRequest"
            :placeholder="'Enter game name'"/>
          </div>
          <div class="home__content__search__result">
            <ProductCard v-for="product in products" 
            :key="product.id"
            :product="product"/>
          </div>
        </Section>
      </div>
      <div class="home__content__categories">
        <Section headerName="Categories">
          <div class="home__content__categories-wrap">
            <CategoryCard v-for="category in platformCategories" 
            class="home__content__categories-wrap__category"
            :key="category.id" 
            :category="category"/>
          </div>
        </Section>
      </div>
      <div class="home__content__last-products">
        <Section headerName="Recently added">
          <div class="home__content__last-products-wrap">
            <ProductCard v-for="product in sortedLastProducts.slice(0,3)" 
            :key="product.id" 
            :product="product"
            class="home__content__last-products-wrap__product"/>
          </div>
        </Section>
      </div>
    </div> 
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import axios from 'axios'
import CategoryCard from '@/components/CategoryCard.vue'
import ProductCard from '@/components/ProductCard.vue'
import Section from '@/components/Section.vue'
import Input from '@/components/Input.vue'
import { IProduct, ICategory } from '@/interfaces'

@Options({
  components: {
    CategoryCard,
    ProductCard,
    Section,
    Input
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
  products: IProduct[] = []
  recentlyProducts: IProduct[] = []
  platformCategories: ICategory[] = []
  ifProductsLoading = true
  
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
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;

  &__content {

    &__search {

      &__input {
        width: 80%;
        margin: 0 auto;
        font-size: 150%;
      }

      &__result {
        margin-top: 10px;
      }
    }
    
    &__last-products-wrap {
      display: flex;
      justify-content: space-between;
      height: 370px;

      &__product {
        width: 235px;
      }
    }

    &__categories-wrap {
      display: flex;
      justify-content: space-between;
      width: 100%;

      &__category {
        margin: 0 15px;
      }
    }
  }
}
</style>
