<template>
  <div class="product-card">
    <div class="product-card__front">
      <img class="product-card__front-logo" 
      :src="require('@/img/products/card/'+ product.productImagePath)" 
      :alt="product.productName">
      <div class="product-card__front-info">
        <div class="product-card__info-name">
          {{productName}}
        </div>
        <div class="product-card__info-price">
          {{product.productPrice + '$'}}
        </div>
        <div class="product-card__info-genre">
          {{product.productGenre}}
        </div>
        <div class="product-card__info-rating">
          <div class="product-card__info-rating-star" 
          v-for="star in raitingStars.slice(0, product.productRating)" :key="star">
            {{star}}
          </div>
        </div>
      </div>
    </div>
    <div class="product-card__back">
      <router-link class="product-card__back-link" :to="'/product/' + product.id">
      <div class="product-card__back-description">
        {{product.productDescription}}
      </div>
      </router-link>
      <div class="product-card__back-adding">
        <button class="product-card__back-adding-button" href="#">
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    product: Object
  },
  computed: {
    productName() {
      if (this.product.productName.length > 10) {
        return `${this.product.productName.substr(0, 10)}...`
      }
      return this.product.productName
    }
  }
})

export default class ProductCard extends Vue {
  raitingStars: string[] = ['★', '★', '★', '★', '★'];
}
</script>

<style lang="scss" scoped>
.product-card {
  width: 100%;
  height: 100%;
  perspective: 1000px;
  margin-bottom: 20px;
  position: relative;
  cursor: pointer;
      
  &__front {
    position: absolute;
    background-color: $color-black;
    height: 100%;
    width: 100%;
    backface-visibility: hidden;
    transition: 1s;
    margin: 0 auto;
    font-size: 1.1em;
    color: $color-white;
    overflow: hidden;
  }

  &__front-logo {
    display: block;
    width: 100%;
    height: 80%;
    margin: 0 auto;
    border-radius: 10px 10px 0 0;
    object-fit: cover;
  }

  &__front-info {
    padding: 1% 4% 1%;
    position: relative;
  }

  &__info-name {
    color: $color-purple;
    font-weight: 600;
  }
          
  &__info-name,
  &__info-price {
    float: left;
    width: 50%;
  }

  &__info-price {
    text-align: right;
  }

  &__info-genre {
    font-size: 0.9em;
    font-weight: lighter;
  }

  &__info-rating-star {
    display: inline-block;
    color: $rating-star;
  }

  &__back {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background-color: $color-black;
    backface-visibility: hidden;
    transform: rotateY(180deg);
    transition: 1s;
    text-align: center;
    font-size: 1em;
    font-weight: 800;
  }

  &__back-adding {
    position: absolute;
    width: 100%;
    top: 85%;
  }

  &__back-adding-button {
    background-color: $color-purple;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
  }

  &__back-description {
    width: 100%;
    height: 100%;
  }

  &__back-link {
    text-decoration: none;
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
</style>
