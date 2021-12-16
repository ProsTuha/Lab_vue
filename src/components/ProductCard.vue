<template>
  <div class="product-cards">
    <div class="product-cards__wrapper" v-for="product in products" :key="product.id">
      <router-link class="product-cards__wrapper__link" :to="'/products/product-info'">
      <div class="product-cards__wrapper__card">
        <div class="product-cards__wrapper__card__front">
          <img class="product-cards__wrapper__card__front__logo" 
          :src="require('@/img/products/card/'+ product.productImagePath)" 
          :alt="product.productName">

          <div class="product-cards__wrapper__card__front__info">
            <div class="product-cards__wrapper__card__front__info__name">
              {{product.productName}}
            </div>
            <div class="product-cards__wrapper__card__front__info__rating">
              {{product.productRating}}
            </div>
            <div class="product-cards__wrapper__card__front__info__price">
              {{product.productPrice}}
            </div>
          </div>
        </div>
      
        <div class="product-cards__wrapper__card__back">
          Description
        </div>
      </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { IProduct } from '@/interfaces';

@Options({
  
})

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

    &__card {
      perspective: 1000px;
      height: 100%;

      &__front {
        position: relative;
        width: 100%;
        height: 100%;
        //border: 5px solid red;
        //z-index: 1;
        backface-visibility: hidden;

        &__logo {
          width: 13%;
        }
      }

      &__back {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: red;
        //z-index: 0;
        backface-visibility: hidden;
        transform: rotateY(180deg);
      }

      &:hover &__front {
        background-color: #fff;
        transform: rotateY(180deg);
      }

      &:hover &__back {
        background-color: red;
        transform: rotateY(360deg);
      }
    }
  }
}
</style>
