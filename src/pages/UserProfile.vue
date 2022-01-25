<template>
  <div class="user-profile">
    <div class="user-profile__basic-info">
      <div class="user-profile__basic-info-view">
        <div class="user-profile__basic-info-poster">
          <img class="user-profile__basic-info-img" 
          src="@/img/profiles/profile-avatar.png" 
          :alt="$store.state.user.firstName">
          <!-- <h1 class="product-details__basic-info-title">{{product.productName}}</h1> -->
        </div>
      </div>
      <div class="product-details__basic-info__main">
        <div class="product-details__basic-info__main-wrap">
          <div class="product-details__basic-info-description">
          <p>
            <span class="product-details__basic-info-description-inscription">
              Description:
            </span>
            <!-- {{product.productDescription}} -->
          </p>
        </div>
        <div class="product-details__basic-info-genre">
          <p>
            <span class="product-details__basic-info-genre-inscription">
              Genres:
            </span>
            <!-- {{product.productGenre}} -->
          </p>
        </div>
        <div class="product-details__basic-info-publisher">
          <p>
            <span class="product-details__basic-info-publisher-inscription">
              Publisher:
            </span>
            <!-- {{product.publisher}} ({{product.country}}) -->
          </p>
        </div>
        <div class="product-details__basic-info-rating">
          <span class="product-details__basic-info-rating-inscription">
            Rating:
          </span>
        </div>
        <div class="product-details__basic-info-price">
          <p>
            <span class="product-details__basic-info-price-inscription">
              Price:
            </span>
            <!-- {{product.productPrice}}$ -->
          </p>
        </div>
        <div class="product-details__basic-info-adding">
          <button class="product-details__basic-info-adding-button" href="#">
            Add to cart
          </button>
        </div>
        </div>
      </div>
    </div>
    <div class="product-details__additional-info">
      <div class="product-details__additional-info__table">
        <div class="product-details__table-row">
          <span class="product-details__table-row__creation-inscription">
            Creation date:
          </span>
          <!-- {{product.creationDate}} -->
        </div>
        <div class="product-details__table-row">
          <span class="product-details__table-row__edition-inscription">
            Edition:
          </span>
          <!-- {{product.edition}} -->
        </div>
        <div class="product-details__table-row">
          <span class="product-details__table-row__announcement-inscription">
            Announcement date:
          </span>
          <!-- {{product.announcementDate}} -->
        </div>
        <div class="product-details__table-row">
          <span class="product-details__table-row__requirements-inscription">
            System requirements:
          </span>
          <!-- {{product.systemRequirements}} -->
        </div>
        <div class="product-details__table-row">
          <span class="product-details__table-row__tags-inscription">
            Tags:
          </span>
          <!-- {{product.tags}} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue } from 'vue-class-component';
import { IUser } from '@/interfaces'

export default class UserProfile extends Vue {
    
}
</script>

<style lang="scss" scoped>

</style>
