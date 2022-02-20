<template>
<div class="products">
  <Section class="products__section" :headerName="'Products list'">
    <div class="products__table-header">
      <p class="products__header-name">Id</p>
      <p class="products__header-name">Name</p>
      <p class="products__header-name">Publisher</p>
    </div>
    <div class="products__table-row" v-for="product in allProducts" 
    :key="product.id">
      <div class="products__table-cells">
        <p class="products__table-cell">{{product.id}}</p>
        <p class="products__table-cell">{{product.productName}}</p>
        <p class="products__table-cell">{{product.publisher}}</p>
      </div>
      <router-link :to="'/admin/products/edit/' + product.id" class="products__edit-product">
        <img class="products__edit" src="@/img/others/edit-icon.png" alt="edit">
      </router-link>
      <div class="products__delete-product" @click="deleteProduct(product.id)">
        <img class="products__basket" src="@/img/others/basket-icon.png" alt="basket">
      </div>
    </div>
    <router-link class="products__adding-link" to="/admin/products/add">
      <div class="products__adding-plus">
        +
      </div>
    </router-link>
  </Section>
  <Alert v-if="this.alert" :isError="this.error" :isSuccess="!this.error" 
  :message="this.alertMessage"/>
</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
import { IProduct } from '@/interfaces';
import Section from '@/components/Section.vue';
import Alert from '@/components/Alert.vue';

@Options({
  components: {
    Section,
    Alert
  },
  mounted() {
    axios
      .get('http://localhost:3000/products')
      .then((response) => {
        this.allProducts = response.data.sort((a, b) => a.id - b.id);
      })
  }
})

export default class AdminProducts extends Vue {
  allProducts: IProduct[] = [];

  error = false;
  alertMessage = '';
  alert = false;

  alertErrorMessage = 'There were errors in the process :(';
  alertSuccessMessage = 'Success!';

  deleteProduct(index: number) {
    axios
      .delete(`http://localhost:3000/products/${index}`)
      .catch((error) => {
        if (error) {
          this.alertMessage = this.alertErrorMessage;
          this.showAlert(false);
        } else {
          this.alertMessage = this.alertSuccessMessage;
          this.showAlert(true);
        }
      })
      .then(() => {
        axios
          .get('http://localhost:3000/products')
          .then((response) => {
            this.allProducts = response.data.sort((a, b) => a.id - b.id);
          })
      });
  }

  showAlert(isSuccess: boolean) {
    if (!isSuccess) {
      this.error = true;
      this.alert = true;
    } else {
      this.alert = true;
    }
    window.setTimeout(() => { 
      this.alert = false;
      this.error = false; 
    }, 2000)
  }
}
</script>

<style lang="scss" scoped>
.products {

  &__section {
    width: 85%;
    margin-bottom: 1%;
    min-height: 500px;
  }

  &__table-header {
    display: flex;
    width: 90%;
    justify-content: space-around;
    border-bottom: 2px solid $color-white;
  }

  &__header-name {
    width: 32%;
    text-align: center;
    font-size: 28px;
    margin: 0;
    color: $color-white;
  }

  &__table-cells {
    display: flex;
    background: #111;
    justify-content: space-between;
    width: 90%;
    color: $color-orange;
    font-size: 25px;
    margin: 5px 0;
    border-radius: 15px;
  }

  &__table-row {
    display: flex;
    justify-content: space-between;
  }

  &__table-cell {
    width: 32%;
    text-align: center;
    margin: 20px 0;
  }

  &__delete-product,
  &__edit {
    height: 40px;
    width: 40px;
    margin: 20px 0;
    background: $color-orange;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background: $color-pink;
      transition: background 0.5s;
    }
  }

  &__basket {
    width: 30px;
    margin: 5px;
  }

  &__adding-link {
    text-decoration: none;
    color: $color-black;
  }

  &__adding-plus {
    width: 90%;
    background: $color-orange;
    border-radius: 15px;
    font-size: 50px;
    text-align: center;
    cursor: pointer;

    &:hover {
      background: $color-pink;
      transition: background 0.5s;
    }
  }
}
</style>
