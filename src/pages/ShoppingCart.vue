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
        <select name="categories" class="cart__table-cell cart__table-select" 
        @change="setCategory(index, $event)">
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
      <router-link :to="routerPath">
        <button class="cart__checkout-button" @click="setData()">Checkout</button>
      </router-link>
    </div>
  </Section>
  <Alert v-if="emptyBasket" :isError="true" :message="alertMessage"/>
</div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState } from 'vuex';
import Section from '@/components/Section.vue';
import Alert from '@/components/Alert.vue';

enum Plartform {
  PC = 1,
  PS = 2,
  Xbox = 3
}

@Options({
  components: {
    Section,
    Alert
  },
  mounted() {
    this.user.cartProducts.forEach((element) => {
      this.totalPrice = +(this.totalPrice + element.productPrice).toFixed(2);
    });
    for (let i = 0; i < this.user.cartProducts.length; i += 1) {
      this.productCartCategories.push(this.createCaregory(this.user.cartProducts[i].categoryId[0]));
    }
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
    },
    setCategory(index: number, event) {
      this.productCartCategories[index] = event.target.value;
    },
    setData() {
      if (this.user.cartProducts.length !== 0) {
        this.$store.commit('setTotalPrice', this.totalPrice)
        this.$store.commit('setProductPlatform', this.productCartCategories);
        this.routerPath = '/order';
      } else {
        this.emptyBasket = true;
        setTimeout(() => {
          this.emptyBasket = false
        }, 2000)
        this.routerPath = '/shopping-cart';
      }
    }
  }
})

export default class ShoppingCart extends Vue {
  today = new Date();
  day = '';
  mounth = '';
  year = '';

  routerPath = '/ordering' || '/shopping-cart';

  emptyBasket = false;
  alertMessage = 'Your basket is empty!';

  productCartCategories = []

  categoryId = -1;

  totalPrice = 0;

  createCaregory(id: number): string {
    switch (id) {
      case Plartform.PC: 
        return 'PC';
      case Plartform.PS: 
        return 'PS';
      case Plartform.Xbox: 
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
