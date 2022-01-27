<template>
  <div class="user-profile">
    <div class="user-profile__basic-info">
      <div class="user-profile__basic-info-view">
          <img class="user-profile__basic-info-img" 
          src="@/img/profiles/profile-avatar.png" 
          :alt="$store.state.user.firstName">
          <div class="user-profile__basic-info-signature">
            <h1 class="user-profile__basic-info-name">
              {{$store.state.user.firstName}} {{$store.state.user.lastName}}
            </h1>
            <h2 class="user-profile__basic-info-login">
              {{$store.state.user.login}}
            </h2>
            <h2 class="user-profile__basic-info-password">
              Password:
              {{$store.state.user.password}}
            </h2>
          </div>
      </div>
    </div>
    <div class="user-profile__additional-info">
      <div class="user-profile__sex">
        <p>
          <span class="user-profile__sex-inscription">
            Sex:<br>
          </span>
          <span v-if="$store.state.user.sex">{{$store.state.user.sex}}</span>
          <span class="user-profile__adding-plus" 
          title="Add info" v-if="!$store.state.user.sex" @click="addInfo">+</span>
        </p>
      </div>
      <div class="user-profile__age">
        <p>
          <span class="user-profile__age-inscription">
            Age:<br>
          </span>
          <span v-if="$store.state.user.age">{{$store.state.user.age}}</span>
          <span class="user-profile__adding-plus" 
          title="Add info" v-if="!$store.state.user.age" @click="addInfo">+</span>
        </p>
      </div>
      <div class="user-profile__role">
        <p>
          <span class="user-profile__role-inscription">
            Role:<br>
          </span>
          <span v-if="$store.state.user.role">{{$store.state.user.role}}</span>
          <AddInfo  class="user-profile__adding-plus" 
          title="Add info" v-if="!$store.state.user.role"/>
        </p>
      </div>
      <div class="user-profile__address">
        <p>
          <span class="user-profile__address-inscription">
            Address:<br>
          </span>
          <span v-if="$store.state.user.address">{{$store.state.user.address}}</span>
          <span class="user-profile__adding-plus" 
          title="Add info" v-if="!$store.state.user.address" @click="addInfo">+</span>
        </p>
      </div>
      <div class="user-profile__shipping-address">
        <p>
          <span class="user-profile__shipping-address-inscription">
          Shipping address:<br>
        </span>
        <span v-if="$store.state.user.shippingAddress">{{$store.state.user.shippingAddress}}</span>
        <span class="user-profile__adding-plus" 
        title="Add info" v-if="!$store.state.user.shippingAddress" @click="addInfo">+</span>
        </p>
      </div>
      <div class="user-profile__payment-card">
        <p>
          <span class="user-profile__payment-card-inscription">
            Payment card:<br>
          </span>
          <span v-if="$store.state.user.paymentCard">{{$store.state.user.paymentCard}}</span>
          <span class="user-profile__adding-plus" 
          title="Add info" v-if="!$store.state.user.paymentCard" @click="addInfo">+</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
import AddInfo from '@/components/AddInfo.vue';
import { IUser } from '@/interfaces';

@Options({
  components: {
    AddInfo
  },

  mounted() {
    axios
      .get(`http://localhost:3000/users?login_like=${this.$store.state.user.login}`)
      .then((response) => {
        this.$store.commit('setUserData', response.data[0]);
      });
  }
})

export default class UserProfile extends Vue {
}
</script>

<style lang="scss">
  .user-profile {
    display: flex;
    margin-top: 5px;

    &__basic-info {
      width: 20%;
      text-align: center;
    }

    &__basic-info-view {
      margin: 0 0 5px 5px;
    }

    &__basic-info-img {
      width: 100%;
      margin-bottom: 5px;
      border-radius: 20px;
      border: 5px solid $color-black;
      background: $color-purple;
    }

    &__basic-info-signature {
      background: $color-purple;
      border-radius: 20px;
      border: 5px solid $color-black;
      width: 100%;
    }

    &__additional-info {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 76%;
      margin: 0 5px 5px 40px;
      font-size: 30px;
      border-radius: 20px;
      border: 5px solid $color-black;
      background: $color-purple;
      padding-left: 10px;
    }

    &__role,
    &__sex,
    &__age,
    &__address,
    &__shipping-address,
    &__payment-card,
    &__password {
      width: 25%;
      margin: 5px 25px;
      text-align: center;
    }

    &__sex-inscription,
    &__age-inscription,
    &__role-inscription,
    &__address-inscription,
    &__shipping-address-inscription,
    &__payment-card-inscription,
    &__password-inscription {
      font-size: 35px;
      font-weight: 600; 
    }

    &__adding-plus {
      font-size: 40px;
      width: 46px;
      border-radius: 50px;
      border: 2px solid $color-black;
      background: $color-pink;
      margin: 5px auto 0;
    }

    &__adding-plus:hover {
      background: $color-purple;
      border: 0 solid $color-black;
      transition: background 0.4s  ;
      cursor: pointer;
    }
  }
</style>
