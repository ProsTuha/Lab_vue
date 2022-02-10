<template>
  <div class="category">
    <router-link class="category__link"  
    :to="'/products/' + category.categoryName.toLowerCase() + '-products'">
      <img class="category__logo" 
      :src="require('@/img/platform-categories/'+ category.logoPath)" 
      :alt="category.categoryName">
      
      <div class="category__name">
        {{category.categoryName}}
      </div>  
    </router-link>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    category: Object
  }
})

export default class CategoryCards extends Vue {
  
}
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: $color-black;
  text-align: center;
  border-radius: 15px;
  text-decoration: none;

  &__link {
    text-decoration: none;
    margin: 5px;
    background: $color-orange;
    border-radius: 15px;
  }

  &__logo {
    width: 25%;
    margin: 5% auto 0;
  }

  &__name {
    font-size: 1.5em;
    font-weight: 500;
    margin-bottom: 2%;
    color: $color-black;
  }

  &__platform-links {
    width: 98%;
    text-decoration: none;
    margin: 2px auto 2%;
    background: $color-white;
    border-radius: 15px;
  }

  &__logo {
    width: 25%;
    margin: 5% auto 0;
  }

  &__name {
    font-size: 1.5em;
    font-weight: 500;
    margin-bottom: 2%;
    color: $color-black;
  }

  &:hover {
    background-color: $color-orange;

    .category__link {
      background-color: $color-white;
    }
  }
}
</style>
