<template>
<div class="cart">
  <Section class="cart__section" :headerName="'Shopping cart'">
    <div class="cart__table-header">
      <p class="cart__header-name">Name</p>
      <p class="cart__header-name">Platform</p>
      <p class="cart__header-name">Order date</p>
      <p class="cart__header-name">Price</p>
    </div>
    <div class="cart__table-row" v-for="(product, index) in this.user.cartProducts" 
    :key="product.id">
      <div class="cart__table-cells">
        <p class="cart__table-cell">{{product.productName}}</p>
        <select name="categories" class="cart__table-cell cart__table-select">
        <option v-for="category in product.categoryId" 
        :key="category">
          {{createCaregory(category)}}
        </option>
        </select>
        <p class="cart__table-cell">{{currentDate}}</p>
        <p class="cart__table-cell">{{product.productPrice}}$</p>
      </div>
      <div class="cart__delete-product" @click="deleteProduct(index, product.productPrice)">
        <img class="cart__basket" src="@/img/others/basket-icon.png" alt="basket">
      </div>
    </div>
    <div class="cart__total-cost">
      <span class="cart__cost">Total cost: {{totalPrice}}</span>
      <button class="cart__checkout-button">Checkout</button>
    </div>
  </Section>
</div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState } from 'vuex';
import Section from '@/components/Section.vue';

@Options({
  components: {
    Section
  },
  mounted() {
    this.user.cartProducts.forEach((element) => {
      this.totalPrice = +(this.totalPrice + element.productPrice).toFixed(2);
    });
  },
  computed: {
    ...mapState(['user']),
    currentDate() {
      this.day = String(this.today.getDate()).padStart(2, '0');
      this.mounth = String(this.today.getMonth() + 1).padStart(2, '0'); 
      this.year = this.today.getFullYear();
      return `${this.day}/${this.mounth}/${this.year}`
    }
  },

  methods: {
    deleteProduct(index: number, price: number) {
      this.$store.commit('removeFromCart', index);
      this.totalPrice = +(this.totalPrice - price).toFixed(2);
    }
  }
})

export default class ShoppingCart extends Vue {
  today = new Date();
  day = '';
  mounth = '';
  year = '';

  productIndex = -1;
  totalPrice = 0;

  createCaregory(id: number): string {
    switch (id) {
      case 1: 
        return 'PC';
      case 2: 
        return 'PS';
      case 3: 
        return 'Xbox';
      default:
        return '' 
    }
  }
}
</script>

<style lang="scss" scoped>
.cart {

  &__section {
    width: 85%;
    margin-bottom: 1%;
    min-height: 500px;
  }

  &__table-header {
    display: flex;
    width: 95%;
    justify-content: space-around;
    border-bottom: 2px solid $color-white;
  }

  &__header-name {
    width: 20%;
    text-align: center;
    font-size: 28px;
    margin: 0;
    color: $color-white;
  }

  &__table-cells {
    display: flex;
    background: #111;
    justify-content: space-between;
    width: 95%;
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
    width: 25%;
    text-align: center;
    margin: 20px 0;
  }

  &__table-select {
    width: 150px;
    margin: 20px auto;
    height: 30px;
    font-size: 20px;
    background: #333;
    color: $color-orange;
  }

  &__delete-product {
    height: 40px;
    width: 40px;
    margin: 20px 0;
    background: $color-orange;
    border-radius: 8px;
    cursor: pointer;
  }

  &__delete-product:hover {
    background: $color-pink;
    transition: background 0.5s;
  }

  &__basket {
    width: 30px;
    margin: 5px;
  }

  &__total-cost {
    display: flex;
    justify-content: space-around;
    font-size: 30px;
    width: 95%;
    border-radius: 15px;
    border-top: solid 2px $color-white;
    border-bottom: solid 2px $color-white;
    background: $color-orange;
  }

  &__cost {
    margin: 10px 0;
  }

  &__checkout-button {
    background-color: $color-pink;
    color: $color-black;
    font-size: 30px;
    margin: 10px 0;
    border-radius: 10px;
    cursor: pointer;
    border: 0;
  }

  &__checkout-button:hover {
    transition: background 1s;
    background-color: $color-black;
    color: $color-pink;
  }
}

</style>
