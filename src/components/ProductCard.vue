<template>
  <div class="product-cards">
    <div class="product-cards__wrapper" v-for="product in products" :key="product.id">
        <div class="product-cards__wrapper__card">
          <div class="product-cards__wrapper__card__front">
            <img class="product-cards__wrapper__card__front__logo" 
            :src="require('@/img/products/card/'+ product.productImagePath)" 
            :alt="product.productName">
  
            <div class="product-cards__wrapper__card__front__info">
              <div class="product-cards__wrapper__card__front__info__name">
                {{product.productName}}
              </div>
              <div class="product-cards__wrapper__card__front__info__price">
                {{product.productPrice + '$'}}
              </div>
              <div class="product-cards__wrapper__card__front__info__genre">
                {{product.productGenre}}
              </div>
              <div class="product-cards__wrapper__card__front__info__rating">
                <div class="product-cards__wrapper__card__front__info__rating-star" 
                v-for="star in raitingStars.slice(0, product.productRating)" :key="star">
                  {{star}}
                </div>
              </div>
            </div>
          </div>
          <div class="product-cards__wrapper__card__back">
            <router-link class="product-cards__wrapper__link" :to="'/products/product-info'">
            <div class="product-cards__wrapper__card__back__description">
              {{product.productDescription}}
            </div>
            </router-link>
            <div class="product-cards__wrapper__card__back__add-to-cart">
              <button class="product-cards__wrapper__card__back__add-to-cart__button" href="#">
                Add to cart
              </button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    products: {
      type: Array
    }
  }
})

export default class ProductCard extends Vue {
  raitingStars: string[] = ['★', '★', '★', '★', '★'];
}
</script>

<style lang="scss" scoped>
.product-cards {
  display: flex;
  justify-content: space-between;

  &__wrapper {
    width: 100%;
    height: 100%;

    &__link {
      text-decoration: none;
    }

    &__card {
      width: 100%;
      height: 100%;
      perspective: 1000px;
      
      &__front {
        position: inherit;
        background-color: $color-black;
        height: 100%;
        width: 70%;
        backface-visibility: hidden;
        transition: 1s;
        margin: 0 auto;
        font-size: 1.1em;
        color: $color-white;
        overflow: hidden;

        &__logo {
          display: block;
          width: 100%;
          height: 261px;
          margin: 0 auto;
          border-radius: 10px 10px 0 0;
          object-fit: cover;
        }

        &__info {
          padding: 1% 4% 1%;

          &__name {
            color: $color-purple;
            font-weight: 600;
          }
          
          &__name,
          &__price {
            float: left;
            width: 50%;
          }

          &__price {
            text-align: right;
          }
          &__genre {
            font-size: 0.9em;
            font-weight: lighter;
          }

          &__rating-star {
            display: inline-block;
            color: $rating-star;
          }
        }
      }

      &__back {
        position: absolute;
        top: 0;
        width: 70%;
        height: 100%;
        background-color: $color-black;
        backface-visibility: hidden;
        transform: rotateY(180deg);
        transition: 1s;
        text-align: center;
        font-size: 1em;
        font-weight: 800;
        
        &__add-to-cart {
          position: absolute;
          width: 100%;
          top: 85%;

          &__button {
            background-color: $color-purple;
            border-radius: 5px;
            border: 0;
            
          }
        }
      }

      &__front,
      &__back {
        border: 4px $color-purple solid;
        border-radius: 15px;
        box-shadow: 0 0 1px $color-white, 0 0 2px $color-purple, 0 0 4px $color-white, 
        0 0 8px $color-purple, 0 0 16px $color-purple, 0 0 20px $color-purple, 
        0 0 25px $color-purple, 0 0 30px $color-purple;
      }

      &:hover &__front {  
        transform: rotateY(180deg);
      }

      &:hover &__back {
        transform: rotateY(360deg);
      }
    }
  }
}
</style>
