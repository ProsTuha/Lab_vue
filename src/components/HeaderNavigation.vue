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
          <div class="header__navigation__dropdown-content">
            <router-link class="header__navigation__dropdown-link" 
            to="/products/pc-products">PC</router-link>

            <router-link class="header__navigation__dropdown-link" 
            to="/products/playstation-products">PlayStation</router-link>

            <router-link class="header__navigation__dropdown-link" 
            to="/products/xbox-products">Xbox</router-link>
          </div>
        </div>
        <router-link class="header__navigation-link" to="/about">
          About
        </router-link>
        <div class="header__navigation-link" @click="showSignIn">
          Sign In
        </div>
      </nav>
    </div>
  </header>

  <Modal :title="'Registration'" 
  :buttons="['Submit']" 
  v-model:teleportModal="teleportModal" 
  v-model:showModal="showModal">
    <SignInModal/>
  </Modal>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SignInModal from '@/components/SignInModal.vue';
import Modal from '@/components/Modal.vue';

@Options({
  components: {
    SignInModal,
    Modal
  }
})
export default class HeaderNavigation extends Vue {
  teleportModal = false;
  showModal = false;

  showSignIn() {
    this.teleportModal = true;
    this.showModal = true;
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
            color: $color-purple;
          }

          &:hover {
            border-bottom: 5px solid $color-purple;
            background-color: $navigation-bg-hover;
            height: 60px;
            color: $color-white;
          }

          &--active {
            color: $color-purple;
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
              color: $color-purple;
            }
        }
    }
</style>
