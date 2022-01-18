<template>  
  <Section :headerName="'All products'">
    <div class="products">
      <div class="products__product-card"
      v-for="product in products" :key="product.id">
        <ProductCard :product="product"/>
      </div>
    </div>
  </Section>
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
        this.products = response.data
      });
  }
})

export default class Products extends Vue {
  products: IProduct[] = []
}
</script>

<style lang="scss" scoped>
.products {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  &__product-card {
    height: 370px;
    width: 33%;
    margin-bottom: 20px;
  }
}
</style>
