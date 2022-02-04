<template>  
<div class="products-page">
  <Section class="products-page__filtration-section" :headerName="'Filtration'">
    <div class="products-page__sorting">
      <div class="products-page__sorting-inscription">
        Sort
      </div>
      <div class="products-page__sorting-wrap">
        <span class="products-page__sorting-criteria-inscription">Criteria</span>
        <div class="products-page__select-dropdown dropdown">
          {{sortCriteriaInscription}}
          <div class="header__navigation__dropdown-content">
            <span class="header__navigation__dropdown-link" 
            @click="changeCriteria('productRating')">
              Rating
            </span>
            <span class="header__navigation__dropdown-link" 
            @click="changeCriteria('productPrice')">
              Price
            </span>
            <span class="header__navigation__dropdown-link" 
            @click="changeCriteria('creationDate')">
              Creation date
            </span>
          </div>
        </div>
      </div>
      <div class="products-page__sorting-type-wrap">
        <span class="products-page__sorting-type-inscription">Type</span>
        <div class="products-page__select-dropdown dropdown">
          {{sortTypeInscription}}
          <div class="header__navigation__dropdown-content">
            <span class="header__navigation__dropdown-link" 
            @click="ascendingClick()">Ascending</span>
            <span class="header__navigation__dropdown-link" 
            @click="descendingClick()">Descending</span>
          </div>
        </div>
      </div>
    </div>
    <div class="products-page__genre-filtration">
      <div class="products-page__genre-inscription">
        Genre
      </div>
      <div class="products-page__genre-wrap">
        <p class="products-page__genre-radio"><input type="radio" 
        checked name="genre" @change="genreGhanged('')"> All genres</p>
        <p class="products-page__genre-radio"><input type="radio" name="genre"
        @change="genreGhanged('shooter')">Shooter</p>
        <p class="products-page__genre-radio"><input type="radio" name="genre"
        @change="genreGhanged('action')">Action</p>
        <p class="products-page__genre-radio"><input type="radio" name="genre"
        @change="genreGhanged('arcade')">Arcade</p>
        <p class="products-page__genre-radio"><input type="radio" name="genre"
        @change="genreGhanged('adventure')">Adventure</p>
      </div>
    </div>
    <div class="products-page__price-filtration">
      <div class="products-page__price-inscription">
        Price
      </div>
      <div class="products-page__price-wrap">
        <p class="products-page__price-radio"><input type="radio" checked name="price" 
        @change="priceGhanged(0, false)">All prices</p>
        <p class="products-page__price-radio"><input type="radio" name="price" 
        @change="priceGhanged(5, true)">Below 5$</p>
        <p class="products-page__price-radio"><input type="radio" name="price"
        @change="priceGhanged(10, true)">Below 10$</p>
        <p class="products-page__price-radio"><input type="radio" name="price"
        @change="priceGhanged(20, true)">Below 20$</p>
        <p class="products-page__price-radio"><input type="radio" name="price"
        @change="priceGhanged(50, true)">Below 50$</p>
        <p class="products-page__price-radio"><input type="radio" name="price"
        @change="priceGhanged(40, false)">Over 40$</p>
      </div>
    </div>
    <div class="products-page__platform-filtration">
      <div class="products-page__platform-inscription">
        Platform
      </div>
      <div class="products-page__platform-wrap">
        <p class="products-page__platform-radio"><input type="radio" checked name="platform" 
        @change="platformGhanged('')">All platforms</p>
        <p class="products-page__platform-radio"><input type="radio" name="platform" 
        @change="platformGhanged('1')">PC</p>
        <p class="products-page__platform-radio"><input type="radio" name="platform" 
        @change="platformGhanged('2')">PS</p>
        <p class="products-page__platform-radio"><input type="radio" name="platform"
        @change="platformGhanged('3')">Xbox</p>
      </div>
    </div>
  </Section>
  <Section :headerName="'All products'">
    <div class="products-page__products">
      <div class="products-page__product-card"
      v-for="product in filteredProducts" :key="product.id">
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

// eslint-disable-next-line no-shadow
enum SortType {
  ASC = 'asc',
  DSC = 'desc',
}

// eslint-disable-next-line no-shadow
enum SortCriteria {
  rating = 'productRating',
  price = 'productPrice',
  creationDate = 'creationDate',
}

// eslint-disable-next-line no-shadow
enum FilterField {
  genre = 'productGenre',
  price = 'productPrice',
  platform = 'categoryId',
}

@Options({
  components: {
    ProductCard,
    Section
  },

  mounted() {
    axios
      .get('http://localhost:3000/products')
      .then((response) => {
        this.products = response.data;
      });
  }
})

export default class Products extends Vue {
  products: IProduct[] = [];

  filterPredicates = {
    genre: '',
    price: {
      sum: 0,
      less: false,
    },
    platform: ''
  }

  currentSortType: SortType = SortType.ASC;
  currentSortCriteria: SortCriteria = SortCriteria.rating;

  sortCriteriaInscription = 'Rating';
  sortTypeInscription = 'Asceding';

  get filteredProducts() {
    return this.products
      .filter(this.productFiltering())
      .sort(this.productSorting());
  }

  genreGhanged(genre: string) {
    this.filterPredicates.genre = genre;
  }

  priceGhanged(price: number, less: boolean) {
    this.filterPredicates.price.sum = price;
    this.filterPredicates.price.less = less;
  }

  platformGhanged(platform: string) {
    this.filterPredicates.platform = platform;
  }

  changeCriteria(criteria: string) {
    switch (criteria) {
      case 'productRating':
        this.currentSortCriteria = SortCriteria.rating;
        this.sortCriteriaInscription = 'Rating';
        break;
      case 'productPrice':
        this.currentSortCriteria = SortCriteria.price;
        this.sortCriteriaInscription = 'Price';
        break;
      case 'creationDate':
        this.currentSortCriteria = SortCriteria.creationDate;
        this.sortCriteriaInscription = 'Creation date';
        break;
      default:
        this.currentSortCriteria = SortCriteria.rating;
        this.sortCriteriaInscription = 'Rating';    
    }
    this.sortProducts();
  }

  ascendingClick() {
    this.sortTypeInscription = 'Asceding';
    this.currentSortType = SortType.ASC;
  }

  descendingClick() {
    this.sortTypeInscription = 'Desceding';
    this.currentSortType = SortType.DSC;
  }

  sortProducts() {
    this.products.sort(this.productSorting());
  }

  productSorting(): (a, b) => number {
    return (a: IProduct, b: IProduct):number => {
      if (a[this.currentSortCriteria] > b[this.currentSortCriteria]) {
        return this.currentSortType === SortType.ASC ? 1 : -1;
      }
      if (a[this.currentSortCriteria] < b[this.currentSortCriteria]) {
        return this.currentSortType === SortType.ASC ? -1 : 1;
      }
      return 0;
    }
  }

  productFiltering(): (product) => boolean {
    return (product: IProduct):boolean => ((product[FilterField.genre]
      .toLowerCase().includes(this.filterPredicates.genre))
        && (this.filterPredicates.price.less 
          ? product[FilterField.price] < this.filterPredicates.price.sum 
          : product[FilterField.price] > this.filterPredicates.price.sum)
        && (product[FilterField.platform].includes(this.filterPredicates.platform)))
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/dropdown-styles.scss';
.products-page {
  display: flex;

  &__sorting-inscription,
  &__genre-inscription,
  &__price-inscription,
  &__platform-inscription {
    font-size: 28px;
    border-bottom: 1px solid $color-black;
    margin-top: 15px;
  }

  &__sorting-wrap,
  &__sorting-type-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }

  &__sorting-type-inscription,
  &__sorting-criteria-inscription {
    font-size: 23px;
  }

  &__filtration-section {
    width: 25%;
  }

  &__select-dropdown {
    width: 160px;
    text-align: center;
    font-size: 23px;
    border-radius: 5px;
    border: 2px solid $color-black;
  }

  &__select-dropdown:hover {
    background: $color-pink;
  }

  &__genre-radio,
  &__price-radio,
  &__platform-radio {
    font-size: 20px;
    margin: 2px;
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
