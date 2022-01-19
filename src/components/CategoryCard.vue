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
import { ICategory } from '@/interfaces';

@Options({
  props: {
    category: Object
  }
})

export default class CategoryCards extends Vue {
  categories: ICategory[] = [
    {
      id: 1, 
      logoPath: 'pc-logo.png',
      categoryName: 'PC'
    }, 
    {
      id: 2,
      logoPath: 'playstation-logo.png',
      categoryName: 'PlayStation'
    },
    {
      id: 3,
      logoPath: 'xbox-logo.png',
      categoryName: 'Xbox'
    }
  ];
}
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 1% 1%;
  margin: 0 auto;
  background-color: $color-purple;
  text-align: center;
  border-radius: 15px;
  text-decoration: none;

  &__link {
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
    background-color: $color-black;

    .category__link {
      background-color: $color-purple;
    }
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
    background-color: $color-black;

    .category__link {
      background-color: $color-purple;
    }
  }
}
</style>
