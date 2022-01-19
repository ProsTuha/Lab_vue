<template>
  <div class="home">
    <div class="home__content">
      <div class="home__content__search">
        <Section headerName="Search">
          <div class="home__content__search-input">
            <Input :inputType="'text'" 
            @input-event="createRequest"
            :placeholder="'Enter game name'"/>
          </div>
          <div class="home__content__search-result">
            <ProductCard v-for="product in products" 
            :key="product.id"
            :product="product" class="home__content__search-result-card"/>
          </div>
        </Section>
      </div>
      <div class="home__content__categories">
        <Section headerName="Categories">
          <CategoryCard/>
        </Section>
      </div>
      <div class="home__content__last-products">
        <Section headerName="Recently added">
          <div class="home__content__last-products-wrap">
            <ProductCard v-for="product in sortedLastProducts.slice(0,3)" 
            :key="product.id" 
            :product="product"
            class="home__content__last-product"/>
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
import { IProduct } from '@/interfaces'

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
  }
})
export default class HomePage extends Vue {
  products: IProduct[] = []
  recentlyProducts: IProduct[] = []
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

    &__input {
      width: 80%;
      margin: 0 auto;
      font-size: 150%;
    }
    
    &__search-result {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
    }

    &__search-result-card {
    height: 370px;
    width: 33%;
    }

    &__last-products-wrap {
      display: flex;
      height: 370px;
    }

    &__last-product {
      width: 235px;
    }
  }
}
</style>
