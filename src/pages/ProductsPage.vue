<template>  
<div class="products-page">
  <Section class="products-page__filtration-section" :headerName="'Filtration'">
    <div class="products-page__sorting">
      <div class="products-page__sorting-inscription">
        Sort
      </div>
      <div class="products-page__sorting-wrap">
        <span class="products-page__sorting-criteria-inscription">Criteria</span>
        <select name="Type" class="products-page__sorting-select">
        <option value="Rating">Rating</option>
        <option value="Price">Price</option>
        <option value="Creation date">Creation date</option>
      </select>
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
        this.products = response.data
      });
  }
})

export default class Products extends Vue {
  products: IProduct[] = []
}
</script>

<style lang="scss" scoped>
.products-page {
  display: flex;

  &__sorting-inscription {
    font-size: 28px;
    border-bottom: 1px solid $color-black;
  }

  &__sorting-wrap {
    display: flex;
    justify-content: space-between;
  }

  &__sorting-criteria-inscription {
    font-size: 23px;
  }

  &__filtration-section {
    width: 25%;
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
