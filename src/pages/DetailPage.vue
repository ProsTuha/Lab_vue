<template>
  <div class="product-details">
    <h1 class="product-details__title">product.productName</h1>
    <div class="product-details__poster">
      <img :src="product.productImagePath" alt="icon">
    </div>

    <div class="product-details__information">
      <div class="product-details__information__basic-info">
        <div class="product-details__information__basic-info__description">
          <p>
            {{product.productDescription}}
          </p>
        </div>
      </div>
      <div class="product-details__information__basic-info__genre">
        {{product.productGenre}}
      </div>
      <div class="product-details__information__basic-info__rating">
        {{product.productRating}}
      </div>
      <div class="product-details__information__basic-info__price">
        {{product.productPrice}}
      </div>
    </div>
    <div class="product-details__information__additional-info">
      <div class="product-details__information__additional-info__table">
        <div class="product-details__information__additional-info__table__row">
          {{product.creationDate}}
        </div>
        <div class="product-details__information__additional-info__table__row">
          {{product.publisher}}
        </div>
        <div class="product-details__information__additional-info__table__row">
          {{product.country}}
        </div>
        <div class="product-details__information__additional-info__table__row">
          {{product.edition}}
        </div>
        <div class="product-details__information__additional-info__table__row">
          {{product.announcementDate}}
        </div>
        <div class="product-details__information__additional-info__table__row">
          {{product.systemRequirements}}
        </div>
        <div class="product-details__information__additional-info__table__row">
          {{product.tags}}
        </div>
      </div>
      <div class="product-details__information__additional-info__adding">
        <button class="product-details__information__additional-info__adding-button" href="#">
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    product: Object
  }
})

export default class DetailPage extends Vue {
        
}
</script>
