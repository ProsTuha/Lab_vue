<template>
<div class="products-page">
  <Section class="products-page__section-filtration" :headerName="'Filtration'">
    <div class="products-page__sorting">
      <div class="products-page__sorting-inscription">
        Sort
      </div>
      <div class="products-page__sorting-wrap">
        <span class="products-page__sorting-criteria-inscription">Criteria</span>
        <div class="products-page__select-dropdown dropdown">
          {{sortCriteriaInscription}}
          <div class="products-page__content dropdown-content">
            <span class="products-page__link dropdown-link" 
            v-for="criteria in criteriaSet" :key="criteria.inscription" 
            @click="changeCriteria(criteria.criteria)">
              {{criteria.inscription}}
            </span>
          </div>
        </div>
      </div>
      <div class="products-page__sorting-type-wrap">
        <span class="products-page__sorting-type-inscription">Type</span>
        <div class="products-page__select-dropdown dropdown">
          {{sortTypeInscription}}
          <div class="products-page__content dropdown-content">
            <span class="header__navigation__link dropdown-link" 
            @click="ascendingClick()">Ascending</span>
            <span class="header__navigation__link dropdown-link" 
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
        <p class="products-page__genre-radio" v-for="genre in genreSet" :key="genre.inscription">
          <input type="radio" :checked="genre.checked" name="genre" 
          @change="genreGhanged(genre.value)">{{genre.inscription}}</p>
      </div>
    </div>
    <div class="products-page__price-filtration">
      <div class="products-page__price-inscription">
        Price
      </div>
      <div class="products-page__price-wrap">
        <p class="products-page__price-radio" v-for="price in priceSet" :key="price.inscription">
          <input type="radio" :checked="price.checked" name="price" 
          @change="priceGhanged(price.value, price.less)">{{price.inscription}}</p>
      </div>
    </div>
    <div class="products-page__platform-filtration">
      <div class="products-page__platform-inscription">
        Platform
      </div>
      <div class="products-page__platform-wrap">
        <p class="products-page__platform-radio" v-for="platform in platformSet" 
        :key="platform.inscription">
          <input type="radio" :checked="platform.checked" name="platform" 
          @change="platformGhanged(platform.value)">{{platform.inscription}}</p>
      </div>
    </div>
  </Section>
  <Section class="products-page__section-products" :headerName="'All products'">
    <div class="products-page__products">
      <div class="products-page__product-card"
      v-for="product in filteredProducts" :key="product.id">
        <ProductCard @cart-actions="showCartAlert" 
        @non-authorized="showNonAuthorizedAlert" :product="product"/>
      </div>
    </div>
  </Section>
</div>
<Alert v-if="showAlert" :isSuccess="isSuccess" :isError="!isSuccess" :message="alertMessage"/>
<Loader v-if="showLoader" :showLoader="showLoader"/>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
import ProductCard from '@/components/ProductCard.vue';
import Section from '@/components/Section.vue';
import Alert from '@/components/Alert.vue';
import Loader from '@/components/Loader.vue'
import { IProduct } from '@/interfaces';

enum SortType {
  ASC = 'asc',
  DSC = 'desc',
}

enum SortCriteria {
  rating = 'productRating',
  price = 'productPrice',
  creationDate = 'creationDate',
}

enum FilterField {
  genre = 'productGenre',
  price = 'productPrice',
  platform = 'categoryId',
}

enum PlatformCategories {
  products = 'products',
  pcProducts = 'pc-products',
  psProducts = 'playstation-products',
  xboxProducts = 'xbox-products',
}

enum PlatformNumbers {
  pc = 1,
  ps = 2,
  xbox = 3

}

@Options({
  components: {
    ProductCard,
    Section,
    Alert,
    Loader
  },

  mounted() {
    this.showLoader = true;
    axios
      .get('http://localhost:3000/products')
      .then((response) => {
        this.products = response.data;
        this.showLoader = false;
      });
    this.wasMounted = true;

    const { path } = this.$route;
    
    switch (path.slice(path.lastIndexOf('/') + 1)) {
      case PlatformCategories.products:
        this.platformSet[0].checked = true;
        this.filterPredicates.platform = [PlatformNumbers.pc, PlatformNumbers.ps, 
          PlatformNumbers.xbox];
        break;
      case PlatformCategories.pcProducts:
        this.platformSet[1].checked = true;
        this.filterPredicates.platform = [PlatformNumbers.pc];
        break;
      case PlatformCategories.psProducts:
        this.platformSet[2].checked = true;
        this.filterPredicates.platform = [PlatformNumbers.ps];
        break;
      case PlatformCategories.xboxProducts:
        this.platformSet[3].checked = true;
        this.filterPredicates.platform = [PlatformNumbers.xbox];
        break;
      default:
        this.platformSet[0].checked = true;
        this.filterPredicates.platform = [PlatformNumbers.pc, PlatformNumbers.ps, 
          PlatformNumbers.xbox]
    }
  },

  computed: {
    filteredProducts() {
      this.showLoader = this.wasMounted;
      return this.products
        .filter(this.productFiltering())
        .sort(this.productSorting());
    }
  },

  watch: {
    filteredProducts() {
      setTimeout(() => { this.showLoader = false }, 500)
    }
  }
})

export default class Products extends Vue {
  products: IProduct[] = []; 

  wasMounted = false;

  currentSortType: SortType = SortType.ASC;
  currentSortCriteria: SortCriteria = SortCriteria.rating;

  sortCriteriaInscription = 'Rating';
  sortTypeInscription = 'Asceding';

  showAlert = false;
  isSuccess = true;
  alertMessage = 'Successfully added to cart';

  showLoader = false;
  
  criteriaSet = [{
    inscription: 'Rating',
    criteria: 'productRating'
  },
  {
    inscription: 'Price',
    criteria: 'productPrice'
  },
  {
    inscription: 'Creation date',
    criteria: 'creationDate'
  }];

  genreSet = [{
    inscription: 'All genres',
    value: '',
    checked: false
  }, {
    inscription: 'Shooter',
    value: 'shooter',
    checked: false
  }, {
    inscription: 'Action',
    value: 'action',
    checked: false
  }, {
    inscription: 'Arcade',
    value: 'arcade',
    checked: false
  }, {
    inscription: 'Adventure',
    value: 'adventure',
    checked: false
  }];

  priceSet = [{
    inscription: 'All prices',
    value: 0,
    less: false,
    checked: true
  }, {
    inscription: 'Below 5$',
    value: 5,
    less: true,
    checked: false
  }, {
    inscription: 'Below 10$',
    value: 10,
    less: true,
    checked: false
  }, {
    inscription: 'Below 20$',
    value: 20,
    less: true,
    checked: false
  }, {
    inscription: 'Below 50$',
    value: 50,
    less: true,
    checked: false
  }, {
    inscription: 'Over 40$',
    value: 40,
    less: false,
    checked: false
  }];

  platformSet = [{
    inscription: 'All platforms',
    value: [1, 2, 3],
    checked: true
  }, {
    inscription: 'PC',
    value: [1],
    checked: false
  }, {
    inscription: 'PS',
    value: [2],
    checked: false
  }, {
    inscription: 'Xbox',
    value: [3],
    checked: false
  }];

  filterPredicates = {
    genre: '',
    price: {
      sum: 0,
      less: false,
    },
    platform: []
  }

  genreGhanged(genre: string) {
    this.filterPredicates.genre = genre;
  }

  priceGhanged(price: number, less: boolean) {
    this.filterPredicates.price.sum = price;
    this.filterPredicates.price.less = less;
  }

  platformGhanged(platform: []) {
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

  productSorting(): (a: IProduct, b: IProduct) => number {
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

  platformIncludes(productPlatforms: number[]) {
    for (let i = 0; i < this.filterPredicates.platform.length; i += 1) {
      if (productPlatforms.includes(this.filterPredicates.platform[i])) return true;
    }
    return false;
  }

  productFiltering(): (product: IProduct) => boolean {
    return (product: IProduct):boolean => ((product[FilterField.genre]
      .toLowerCase().includes(this.filterPredicates.genre))
        && (this.filterPredicates.price.less 
          ? product[FilterField.price] < this.filterPredicates.price.sum 
          : product[FilterField.price] > this.filterPredicates.price.sum)
        && this.platformIncludes(product[FilterField.platform]))
  }

  showCartAlert(value) {
    this.showAlert = true;
    this.isSuccess = true;
    setTimeout(() => { this.showAlert = false }, 2000);
    this.alertMessage = value ? 'Successfully added to cart' : 'Successfully removed from cart'
  }

  showNonAuthorizedAlert() {
    this.showAlert = true;
    this.isSuccess = false;
    setTimeout(() => { this.showAlert = false }, 2000);
    this.alertMessage = 'First you need to log in / register'
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/dropdown-styles.scss';
.products-page {
  display: flex;
  margin: 10px 0;

  &__sorting-inscription,
  &__genre-inscription,
  &__price-inscription,
  &__platform-inscription {
    font-size: 28px;
    border-bottom: 1px solid $color-black;
    margin-top: 15px;
    color: $color-orange;
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
    color: $color-pink;
  }

  &__section-products {
    width: 65%;
  }

  &__section-filtration {
    width: 25%;
    color: $color-pink;
  }

  &__select-dropdown {
    width: 160px;
    text-align: center;
    font-size: 23px;
    border-radius: 5px;
    border: 2px solid $color-black;
    color: white;
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
