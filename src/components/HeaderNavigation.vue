<template>
  <header class="header">
    <div class="header__inner-wrap">
      <div class="header__logo">
        <router-link class="header__logo-link" to="/">Game Store</router-link>
      </div>
      <nav class="header__navigation">
        <router-link class="header__navigation-link" to="/">
          Home
        </router-link>
        <router-link class="header__navigation-link" to="/products">
          Products
        </router-link>
        <div class="header__navigation-link dropdown">
          Categories
          <div class="header__navigation__content dropdown-content">
            <router-link class="header__navigation__link dropdown-link" 
            to="/products/pc-products">PC</router-link>

            <router-link class="header__navigation__link dropdown-link" 
            to="/products/playstation-products">PlayStation</router-link>

            <router-link class="header__navigation__link dropdown-link" 
            to="/products/xbox-products">Xbox</router-link>
          </div>
        </div>
        <router-link class="header__navigation-link" to="/about">
          About
        </router-link>
        <router-link class="header__shopping-cart" to="/shopping-cart" v-if="isAuthorized">
          <img src="@/img/others/cart-icon.png" alt="cart" class="header__cart-img">
          {{cartCount}}
        </router-link>
        <div class="header__navigation-link" @click="showSignIn" v-if="!isAuthorized">
          Sign In
        </div>
        <div class="header__navigation-link" @click="showSignUp" v-if="!isAuthorized">
          Sign Up
        </div>
        <router-link class="header__user-login" v-if="isAuthorized" to="/profile">
          {{user.login}}
        </router-link>
        <router-link class="header__navigation-link" to="/admin" v-if="user.role === 'ADMIN'">
          Admin
        </router-link>
        <router-link class="header__log-out" 
        @click="logOut" v-if="isAuthorized" to="/">
          <img src="@/img/others/logout-icon.png" class="header__log-out-img" alt="Log Out">
        </router-link>
      </nav>
    </div>
  </header>

  <Modal :title="'Authorization'" v-model:modal="signIn" v-if="signIn">
    <SignInModal @authorized="authorizedUser"/>
  </Modal>

  <Modal :title="'Registration'" v-model:modal="signUp" v-if="signUp">
    <SignUpModal @registered="registeredUser"/>
  </Modal>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapState } from 'vuex';
import SignInModal from '@/components/SignInModal.vue';
import SignUpModal from '@/components/SignUpModal.vue';
import Modal from '@/components/Modal.vue';

@Options({
  components: {
    SignInModal,
    SignUpModal,
    Modal
  },
  computed: {
    ...mapState(['isAuthorized', 'user']),
    cartCount() {
      return this.user.cartProducts.length;
    }
  }
})
export default class HeaderNavigation extends Vue {
  modal = false;
  signIn = false;
  signUp = false;

  isAuthorized: any;
  user: any;

  showSignUp() {
    this.modal = true;
    this.signUp = true;
    this.signIn = false;
  }

  showSignIn() {
    this.modal = true;
    this.signIn = true;
    this.signUp = false;
  }

  authorizedUser() {
    this.signIn = false;
    this.$store.commit('userLogIn');
  }

  registeredUser() {
    this.signUp = false;
    this.$store.state.isAuthorized = true;
  }

  logOut() {
    this.$store.commit('userLogOut');
    this.$store.commit('clearUserData');
  }
}

</script>

<style scoped lang="scss">
@import '@/assets/dropdown-styles.scss';
  .header {
    background-color: $color-black;
    height: 65px;
    vertical-align: middle;

    &__navigation {
      display: inherit;
    }

    &__navigation-link {
      font-size: 23px;
      font-weight: 500;
      color: $color-gray;
      height: 100%;
      width: 92px;
      text-align: center;
      line-height: 65px;
      text-decoration: none;
      padding: 0 7px;
      cursor: pointer;

      &:focus {
        color: $color-orange;
      }

      &:hover {
        border-bottom: 5px solid $color-orange;
        background-color: $navigation-bg-hover;
        height: 60px;
        color: $color-white;
      }

      &--active {
        color: $color-orange;
      }
    }

    &__inner-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 17px;
      height: 100%;
    }

    &__logo-link {
      font-size: 40px;
      font-weight: 500;
      color: $color-gray;
      height: 100%;
      line-height: 65px;
      text-decoration: none;

      &:hover,
      &:focus {
        color: $color-orange;
      }
    }

    &__user-login {
      font-size: 20px;
      color: $color-orange;
      line-height: 65px;
      text-decoration: none;
    }

    &__log-out {
      height: 30px;
      margin: 17.5px 10px 17.5px;
      width: 30px;
      text-align: center;
      border-radius: 5px;
      background: $color-pink;
    }

    &__log-out:hover {
      background: $color-orange;
      transition: background 0.5s;
    }

    &__log-out-img {
      margin: 3.5px;
      height: 23px;
    }

    &__shopping-cart {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      text-decoration: none;
      height: 40px;
      margin: 12.5px 10px 12.5px;
      width: 80px;
      text-align: center;
      border-radius: 5px;
      background: $color-pink;
      font-size: 25px;
      color: $color-orange;

      &:hover {
        background: $color-orange;
        transition: background 0.5s;
        color: $color-pink;
      }
    }

    &__cart-img {
      height: 35px;
      margin: 2.5px;
    }
  }
</style>
