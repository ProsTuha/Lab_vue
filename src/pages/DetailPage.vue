<template>
  <div class="product-details">
    <div class="product-details__basic-info">
      <div class="product-details__basic-info__view">
        <div class="product-details__basic-info__view__poster">
          <img class="product-details__basic-info__view__poster__img" 
          :src="require('@/img/products/card/'+ product.productImagePath)" 
          :alt="product.productName">
          <h1 class="product-details__basic-info__view__poster__title">{{product.productName}}</h1>
        </div>
      </div>
      <div class="product-details__basic-info__main">
        <div class="product-details__basic-info__main-wrap">
          <div class="product-details__basic-info__main-wrap__description">
          <p>
            <span class="product-details__basic-info__main-wrap__description-inscription">
              Description:
            </span>
            {{product.productDescription}}
          </p>
        </div>
        <div class="product-details__basic-info__main-wrap__genre">
          <p>
            <span class="product-details__basic-info__main-wrap__genre-inscription">
              Genres:
            </span>
            {{product.productGenre}}
          </p>
        </div>
        <div class="product-details__basic-info__main-wrap__publisher">
          <p>
            <span class="product-details__basic-info__main-wrap__publisher-inscription">
              Publisher:
            </span>
            {{product.publisher}} ({{product.country}})
          </p>
        </div>
        <div class="product-details__basic-info__main-wrap__rating">
          <span class="product-details__basic-info__main-wrap__rating-inscription">
            Rating:
          </span>
          <div class="product-details__basic-info__main-wrap__rating-star" 
          v-for="star in raitingStars.slice(0, product.productRating)" :key="star">
            {{star}}
          </div>
        </div>
        <div class="product-details__basic-info__main-wrap__price">
          <p>
            <span class="product-details__basic-info__main-wrap__price-inscription">
              Price:
            </span>
            {{product.productPrice}}$
          </p>
        </div>
        <div class="product-details__basic-info__main-wrap__adding">
          <button class="product-details__basic-info__main-wrap__adding-button" href="#">
            Add to cart
          </button>
        </div>
        </div>
      </div>
    </div>
    <div class="product-details__additional-info">
      <div class="product-details__additional-info__table">
        <div class="product-details__additional-info__table__row">
          <span class="product-details__additional-info__table__row__creation-inscription">
            Creation date:
          </span>
          {{product.creationDate}}
        </div>
        <div class="product-details__additional-info__table__row">
          <span class="product-details__additional-info__table__row__edition-inscription">
            Edition:
          </span>
          {{product.edition}}
        </div>
        <div class="product-details__additional-info__table__row">
          <span class="product-details__additional-info__table__row__announcement-inscription">
            Announcement date:
          </span>
          {{product.announcementDate}}
        </div>
        <div class="product-details__additional-info__table__row">
          <span class="product-details__additional-info__table__row__requirements-inscription">
            System requirements:
          </span>
          {{product.systemRequirements}}
        </div>
        <div class="product-details__additional-info__table__row">
          <span class="product-details__additional-info__table__row__tags-inscription">
            Tags:
          </span>
          {{product.tags}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Options, Vue } from 'vue-class-component'
import { IProduct } from '@/interfaces'

@Options({
  mounted() {
    axios
      .get(`http://localhost:3000/products?id_like=${this.$route.params.id}`)
      .then((response) => {
        [this.product] = response.data;
      });
  }
})

export default class DetailPage extends Vue {
  product: IProduct = {
    id: -1,
    categoryId: -1,
    productName: '',
    productDescription: '',
    productPrice: -1,
    productGenre: '', 
    productRating: -1,
    productImagePath: '',
    creationDate: '',
    publisher: '',
    country: '',
    edition: '',
    announcementDate: '',
    tags: '',
    systemRequirements: ''
  };
  raitingStars: string[] = ['★', '★', '★', '★', '★'];
}
</script>

<style lang="scss" scoped>
  .product-details {
    background: white;

    &__basic-info {
      display: flex;
      justify-content: space-between;
      background: rgba(0, 0, 0, 0.397); 
      margin: 7px 10px 0;
      border-radius: 20px;

      &__view {
        width: 20%;

        &__poster {
          border-radius: 20px;
          width: 100%;
          margin: 15px 0px 15px 20px;

          &__img {
            height: 450px;
            width: 100%;
            border-radius: 20px;
            border: 2px solid black;
            box-shadow: 0 0 1px $color-white, 0 0 2px $color-purple, 0 0 4px $color-white, 
            0 0 8px $color-purple, 0 0 16px $color-purple, 0 0 20px $color-purple, 
            0 0 25px $color-purple;
            object-fit: cover;
          }

          &__title {
            width: 100%;     
            line-height: 70px;
            font-size: 60px;
            font-weight: 600;
            margin: 5px 0 10px 0px;
            color: black;
            text-align: center;
            background: $color-purple;
            border-radius: 20px;
            border: 2px solid black;
          }
        }
      }

      &__main {
        width: 75%;
        background: #9933cc4d;
        margin: 15px 20px 15px 5px;
        border-radius: 20px;
        border: 2px solid black;
        box-shadow: 0 0 1px $color-white, 0 0 2px $color-purple, 0 0 4px $color-white, 
        0 0 8px $color-purple, 0 0 16px $color-purple, 0 0 20px $color-purple, 
        0 0 25px $color-purple;
      }

      &__main-wrap {
        margin: 0 15px 5px 15px;

        &__description,
        &__genre,
        &__rating,
        &__publisher,
        &__price{
          color: black;
          font-size: 30px;
          text-align: left;
        }

        &__description {
          font-size: 27px;
        }

        &__description-inscription,
        &__genre-inscription,
        &__rating-inscription,
        &__publisher-inscription,
        &__price-inscription {
          font-size: 35px;
          color: rgba(0, 0, 0, 0.5);
          margin-left: 20px;
        }

        &__adding-button {
          position: absolute;
          bottom: 115px;
          right: 100px;
          height: 60px;
          border-radius: 20px;
          width: 200px;
          background: $color-pink;
          border: 2px solid black;
          font-size: 30px; 
        }

         &__rating-star {
            display: inline-block;
            color: $rating-star;
          }

        &__adding-button:hover {
          box-shadow: 0 0 1px $color-white, 0 0 2px $color-pink, 0 0 4px $color-white, 
          0 0 8px $color-pink, 0 0 16px $color-pink, 0 0 20px $color-pink, 
          0 0 25px $color-pink;
        }
      }
    }

    &__additional-info {
      background: #9933cc4d;
      margin: 15px 10px 15px;
      border-radius: 20px;
      border: 2px solid black;
      box-shadow: 0 0 1px $color-white, 0 0 2px $color-purple, 0 0 4px $color-white, 
      0 0 8px $color-purple, 0 0 16px $color-purple, 0 0 20px $color-purple, 
      0 0 25px $color-purple;
      border-radius: 20px; 

      &__table {
        margin: 15px 20px 15px 20px;

        &__row {
          font-size: 27px;
          margin: 10px 0;

          &__creation-inscription,
          &__edition-inscription,
          &__announcement-inscription,
          &__requirements-inscription,
          &__tags-inscription {
            font-size: 32px;
            color: rgba(0, 0, 0, 0.5);
            font-weight: 500;
          }
        }
      }
    }
  }
</style>
