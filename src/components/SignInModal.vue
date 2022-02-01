<template>
    <div class="authorization">
      <div class="authorization__login-field row">
        Login
        <Input :inputType="'text'" 
        :placeholder="'Enter your e-mail'" 
        @input-event="checkMail"
        class="authorization__input"/>
      </div>
      <div class="authorization__bad-mail-notice" v-if="badMail">
        {{errorLogin}}
      </div>
      <div class="authorization__password-field row">
        Password
        <Input :inputType="'password'" 
        :placeholder="'Password'" 
        @input-event="checkPassword"
        class="authorization__input"/>
      </div>
      <div class="authorization__bad-password-notice" v-if="badPassword">
        {{errorPassword}}
      </div>
      <div class="authorization__no-user" v-if="absentUser">
        User is not found
      </div>
      <div class="authorization__buttons">
        <div class="authorization__button-wrap">
          <button class="authorization__button" 
          @click="checkUser">
            Log In
          </button>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
import Input from '@/components/Input.vue';

@Options({
  components: {
    Input
  }
})

export default class SignInModal extends Vue {
  badMail = true;
  badPassword = true;
  absentUser = false;
  errorLogin = 'Fill in the field';
  errorPassword = 'Fill in the field';
  login = '';
  password = '';

  checkMail(value) {
    const reg = /^.+@.+\..+/;
    if (value.length !== 0) {
      if (reg.test(value) === false) {
        this.badMail = true;
        this.errorLogin = 'Invalid login';
      } else {
        this.badMail = false;
        this.login = value; 
      }
    } else {
      this.errorLogin = 'Fill in the field';
      this.badMail = true;
    }
  }

  checkPassword(value) {
    if (value.length !== 0) {
      if (value.length < 5) {
        this.badPassword = true;
        this.errorPassword = 'Password must contain at least 5 characters';
      } else {
        this.badPassword = false;
        this.password = value;
      }
    } else {
      this.errorPassword = 'Fill in the field';
      this.badPassword = true;
    }
  }

  checkUser() { 
    if (!this.badMail && !this.badPassword) {
      axios
        .get(`http://localhost:3000/users?login_like=${this.login}&password_like=${this.password}`)
        .then((response) => {
          if (response.data.length === 0) {
            this.absentUser = true;
          } else {
            this.absentUser = false;
            this.$emit('authorized'); 
            this.$store.commit('setUserData', response.data[0]);
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .authorization {
    .row {
      display: flex;
      justify-content: space-between;
      margin: 10px 15px;
      font-size: 25px;
      font-weight: 700;
      color: $color-gray;
    }

    &__input {
      width: 50%;
    }

    &__sign-up-proposal {
      color: $color-purple;
      font-size: 18px;
      margin: 10px 15px;
    }

    &__sign-up-link {
      text-decoration: underline;
      color: $color-white;
      cursor: pointer;
    }

    &__bad-mail-notice,
    &__bad-password-notice {
      color: $color-red;
      font-size: 20px;
      text-align: right;
      margin-right: 5%;
    }

    &__buttons {
      display: flex;
      justify-content: center;
    }

    &__button-wrap {
      margin: 10px;
    }

    &__button {
      background: $color-pink;
      font-size: 20px;
      font-weight: 600;
      border-radius: 10px;
      border: 2px solid $color-black;
      width: 120px;
      height: 30px;
      cursor: pointer;
    }

    &__button:hover {
      box-shadow: 0 0 1px $color-white, 0 0 2px $color-pink, 0 0 4px $color-white, 
      0 0 8px $color-pink, 0 0 16px $color-pink, 0 0 20px $color-pink, 
      0 0 25px $color-pink;
    }

    &__button:active {
      background: $color-white;
    }

    &__no-user {
      color: red;
      font-size: 20px;
      text-align: center;
    }
  }
</style>
