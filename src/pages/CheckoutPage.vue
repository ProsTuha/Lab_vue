<template>
<div class="checkout">
  <Section class="checkout__section" :headerName="'Ordering'" v-if="!showOrder">
    <div class="checkout__form-fields">
      <div class="checkout__form-field">
        <span class="checkout__form-inscription">Name:</span>
        <Input class="checkout__input" @input-event="checkName" 
        :placeholder="'Enter name'"/>
      </div>
      <div class="checkout__bad-notice" v-if="badName">
        {{errorName}}
      </div>
      <div class="checkout__form-field">
        <span class="checkout__form-inscription">Surname:</span>
        <Input class="checkout__input" @input-event="checkSurname" 
        :placeholder="'Enter surname'"/>
      </div>
      <div class="checkout__bad-notice" v-if="badSurname">
        {{errorSurname}}
      </div>
      <div class="checkout__form-field">
        <span class="checkout__form-inscription">Delivery address:</span>
        <Input class="checkout__input" @input-event="checkAddress" 
        :placeholder="'Enter delivery address'"/>
      </div>
      <div class="checkout__bad-notice" v-if="badAddress">
        {{errorAddress}}
      </div>
      <div class="checkout__form-field">
        <span class="checkout__form-inscription">Phone number:</span>
        <Input class="checkout__input" @input-event="checkPhone" 
        :placeholder="'Enter phone number'" 
        :inputType="'tel'" v-mask="'+###(##)###-##-##'"/>
      </div>
      <div class="checkout__bad-notice" v-if="badPhone">
          {{errorPhone}}
      </div>
      <div class="checkout__form-field">
        <span class="checkout__form-inscription">Delivery day:</span>
        <Input :inputType="'date'" class="checkout__input" @input-event="checkDay" 
        :placeholder="'Enter delivery day'"/>
      </div>
      <div class="checkout__bad-notice" v-if="badDay">
          {{errorDay}}
      </div>
      <div class="checkout__form-field">
        <span class="checkout__form-inscription">Time:</span>
        <Input :inputType="'time'" class="checkout__input" @input-event="checkTime" 
        :placeholder="'Enter time to deliver'"/>
      </div>
      <div class="checkout__bad-notice" v-if="badTime">
          {{errorTime}}
      </div>
      <div class="checkout__buttons">
        <div class="checkout__cancel">
          <router-link to="/shopping-cart">
            <button class="checkout__cancel-button">Cancel</button>
          </router-link>
        </div>
        <div class="checkout__confirm">
          <router-link :to="'/order/thanks/'+ order.id"> 
            <button class="checkout__confirm-button" @click="confirmInfo()">Confirm</button>
          </router-link>
        </div>
      </div>
    </div>
  </Section>
  <Section class="checkout__order-section" v-if="showOrder" :headerName="'Your order'">
    <div class="checkout__response">
      <div class="checkout__order-number">
        Your order number: 
        <span class="checkout__number">{{order.id}}</span>
      </div>
      <div class="checkout__thanks">
        Thanks for your order! :)
      </div>
    </div>
    <div class="checkout__order-list">
      <p class="checkout__header-name">Name</p>
      <p class="checkout__header-name">Platform</p>
      <p class="checkout__header-name">Price</p>
    </div>
    <div class="checkout__table-row" v-for="product in order.productList" 
    :key="product.id">
      <div class="checkout__table-cells">
        <p class="checkout__table-cell">{{product.productName}}</p>
        <p class="checkout__table-cell">{{product.selectedCategory}}</p>
        <p class="checkout__table-cell">{{product.productPrice}}$</p>
      </div>
    </div>
    <div class="checkout__total-cost">
      <span class="checkout__cost">Total cost: {{user.cartPrice}}$</span>

      <router-link to="/">
        <button class="checkout__button" @click="goHomePage()">Go home page</button>
      </router-link>
    </div>
  </Section>
</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
import { mapState } from 'vuex';
import Input from '@/components/Input.vue';
import Section from '@/components/Section.vue';
import { IOrder } from '@/interfaces';

enum Statuses {
  processed = 'Processed', 
  confirmed = 'Confirmed',
  sent = 'Sent',
  canceled = 'Canceled',
  delivered = 'Delivered',
  completed = 'Сompleted'
}

@Options({
  components: {
    Input,
    Section
  }, 
  computed: {
    ...mapState(['user']),
  },
  methods: {
    goHomePage() {
      this.$store.commit('clearCart');
    },

    confirmInfo() {
      if (!this.badName && !this.badSurname && !this.badAddress 
      && !this.badPhone && !this.badDay && !this.badTime) {
        this.order.userId = this.user.id;
        this.order.productList = this.user.cartProducts;
        this.order.status = Statuses.processed;
        this.createRandomNumber();
        axios.post('http://localhost:3000/orders', this.order).then(() => {
          this.showOrder = true;
        });
      }
    }
  },
  mounted() {
    this.showOrder = this.$route.params.order_id;
    axios
      .get(`http://localhost:3000/orders?id_like=^${this.$route.params.order_id}`)
      .then((response) => {
        if (response.data.length !== 0 && response.data[0].userId === this.user.id) {
          console.log(response.data);
          [this.order] = response.data;
        } else {
          this.order.id = 'Order was not found! :('
        }
      })
  },
})

export default class Checkout extends Vue {
  order: IOrder = {
    id: '',
    userId: 0,
    productList: [],
    status: ''
  }

  emptyFieldError = 'Fill in the field';

  errorName = this.emptyFieldError;
  errorSurname = this.emptyFieldError;
  errorAddress = this.emptyFieldError;
  errorPhone = this.emptyFieldError;
  errorDay = this.emptyFieldError;
  errorTime = this.emptyFieldError;

  badName = true;
  badSurname = true;
  badAddress = true;
  badPhone = true;
  badDay = true;
  badTime = true;

  name = '';
  surname = '';
  deliveryAddress = '';
  phoneNumber = '';
  deliveryDay = '';
  time = '';

  showOrder = false;

  phoneInput = '';

  checkName(value) {
    if (value.length !== 0) {
      this.badName = false;
      this.name = value;
    } else {
      this.errorName = this.emptyFieldError;
      this.badName = true;
    }
  }
  checkSurname(value) {
    if (value.length !== 0) {
      this.badSurname = false;
      this.surname = value;
    } else {
      this.errorSurname = this.emptyFieldError;
      this.badSurname = true;
    }
  }
  checkAddress(value) {
    const reg = /^[a-zA-Z0-9\s,'-]*$/;
    if (value.length !== 0) {
      if (reg.test(value) === false) {
        this.badAddress = true;
        this.errorAddress = 'Invalid delivery address';
      } else {
        this.badAddress = false;
        this.deliveryAddress = value; 
      }
    } else {
      this.errorAddress = this.emptyFieldError;
      this.badAddress = true;
    }
  }
  checkPhone(value) {
    const reg = /(?:\+|\d)[\d\-() ]{9,}\d/g;
    if (value.length !== 0) {
      if (reg.test(value) === false) {
        this.badPhone = true;
        this.errorPhone = 'Invalid phone number';
      } else {
        this.badPhone = false;
        this.phoneNumber = value; 
      }
    } else {
      this.errorPhone = this.emptyFieldError;
      this.badPhone = true;
    }
  }
  checkDay(value) {
    if (value.length !== 0) {
      this.badDay = false;
      this.deliveryDay = value;
    } else {
      this.errorDay = this.emptyFieldError;
      this.badDay = true;
    }
  }

  checkTime(value) {
    if (value.length !== 0) {
      this.badTime = false;
      this.time = value;
    } else {
      this.errorTime = this.emptyFieldError;
      this.badTime = true;
    }
  }

  createRandomNumber() {
    let result = '';
    const resultLength = 13;
    const words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    const maxPosition = words.length - 1;
    let position;
    for (let i = 0; i < resultLength; i += 1) {
      position = Math.floor(Math.random() * maxPosition);
      result += words.substring(position, position + 1);
    }
    this.order.id = result;
    return result;
  }
}
</script>

<style lang="scss" scoped>
.checkout {

  &__section {
    width: 30%;
  }

  &__ordering-title {
    text-align: center;
  }

  &__form-fields {
    width: 70%;
    margin: 0 auto;
  }

  &__form-field {
    margin: 5px auto;
  }

  &__form-inscription {
    font-size: 25px;
    color: $color-white;
  }

  &__input {
    height: 40px;
    font-size: 25px;
  }

  &__confirm-button,
  &__cancel-button {
    border: 0;
    background: $color-pink;
    border-radius: 15px;
    font-size: 25px;
    cursor: pointer;
  }

  &__confirm-button:hover, 
  &__cancel-button:hover {
    background: $color-black;
    color: $color-pink;
    transition: background 0.5s;
  }

  &__buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 15px;
  }

  &__bad-notice {
    color: $color-red;
    font-size: 20px;
    text-align: right;
    margin-right: 5%;
  }

  &__complete-section {
    width: 70%;
  }

  &__order-list {
    margin-top: 10px;
    display: flex;
    width: 100%;
    justify-content: space-around;
    border-bottom: 2px solid $color-white;
  }

  &__header-name {
    width: 33.3%;
    text-align: center;
    font-size: 28px;
    margin: 0;
    color: $color-white;
  }

  &__table-cells {
    display: flex;
    background: #111;
    justify-content: space-between;
    width: 100%;
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
    width: 33.3%;
    text-align: center;
    margin: 20px 0;
  }

  &__total-cost {
    display: flex;
    justify-content: space-around;
    font-size: 30px;
    width: 100%;
    border-radius: 15px;
    border-top: solid 2px $color-white;
    border-bottom: solid 2px $color-white;
    background: $color-orange;
  }

  &__cost {
    margin: 10px 0;
  }

  &__response {
    display: flex;
    justify-content: space-between;
  }

  &__thanks {
    font-size: 35px;
    color: $color-orange;
    background: $color-pink;
    border-radius: 15px;
    padding: 15px;
  }

  &__order-number {
    border-radius: 15px;
    font-size: 35px;
    text-align: center;
    background: $color-orange;
    padding: 15px;
  }

  &__number {
    font-size: 50px;
    color: $color-red;
  }

  &__button {
    background-color: $color-pink;
    color: $color-black;
    font-size: 30px;
    margin: 10px 0;
    border-radius: 10px;
    cursor: pointer;
    border: 0;
  }

  &__button:hover {
    transition: background 1s;
    background-color: $color-black;
    color: $color-pink;
  }
}

</style>
