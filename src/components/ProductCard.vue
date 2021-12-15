<template>
  <div class="product-cards">
    <div class="product-cards__wrapper" v-for="product in products" :key="product.id">
      <router-link class="product-cards__link" :to="'/products/product-info'">
        <div class="product-cards__wrapper__front">
          <img class="product-cards__wrapper__front__logo" 
          :src="require('@/img/products/card/'+ product.productImagePath)" 
          :alt="product.productName">

          <div class="product-cards__wrapper__front__info">
            <div class="product-cards__wrapper__front__info__name">
              {{product.productName}}
            </div>
            <div class="product-cards__wrapper__front__info__rating">
              {{product.productRating}}
            </div>
            <div class="product-cards__wrapper__front__info__price">
              {{product.productPrice}}
            </div>
          </div>
        </div>
        <div class="product-cards__wrapper__back">
          Description
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { IProduct } from '@/interfaces';

export default class ProductCard extends Vue {
  products: IProduct[] = [
    {
      id: 1,
      categoryId: 1,
      productName: 'Overwatch',
      productDescription: 'Some description',
      productPrice: 23.99,
      productGenre: 'Shooter',
      productRating: 5,
      productImagePath: 'Overwatch.jpg'
    }
  ]
}
</script>

<style lang="scss" scoped>
.product-cards {

  &__wrapper {
    
    &__front {
      width: 100%;
      height: 100%;
      border: 2px solid black;

      &__logo {
        width: 13%;
      }
    }

    &__back {
      width: 100%;
      height: 100%;
      background-color: red;
    }
  }
}
</style>
