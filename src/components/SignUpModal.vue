<template>
    <div class="registration">
      <div class="registration__login-field row">
        Login
        <Input :inputType="'text'" 
        :placeholder="'Enter your e-mail'" 
        @input-event="checkMail"
        class="registration__input"/>
      </div>
      <div class="registration__bad-mail-notice" v-if="badMail">
        {{errorLogin}}
      </div>
      <div class="registration__password-field row">
        Password
        <Input :inputType="'password'" 
        :placeholder="'Password'" 
        @input-event="checkPassword"
        class="registration__input"/>
      </div>
      <div class="registration__bad-password-notice" v-if="badPassword">
        {{errorPassword}}
      </div>
      <div class="registration__repeat-password-field row">
        Repeat password
        <Input :inputType="'password'" 
        :placeholder="'Repeat password'"
        @input-event="checkRepeatPassword" 
        class="registration__input"/>
      </div>
      <div class="registration__bad-repeat-notice" v-if="badRepeat">
        {{errorRepeat}}
      </div>
      <div class="registration__buttons">
        <div class="registration__button-wrap">
          <button class="registration__button" @click="registerUser">
            Register
          </button>
        </div>
    </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
import Modal from '@/components/Modal.vue';
import Input from '@/components/Input.vue';

@Options({
  components: {
    Modal,
    Input
  },
  props: {
    teleportModal: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    axios
      .get('http://localhost:3000/users')
      .then((response) => {
        this.userCount = response.data.length;
      })
  }
})

export default class SignInModal extends Vue {
  badMail = true;
  badPassword = true;
  badRepeat = true;
  userCount = 0;
  errorLogin = 'Fill in the field';
  errorPassword = 'Fill in the field';
  errorRepeat = 'Fill in the field';
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

  checkRepeatPassword(value) {
    if (value.length !== 0) {
      if (value.length < 5 || value !== this.password) {
        this.badRepeat = true;
        this.errorRepeat = 'Password mismatch';
      } else {
        this.badRepeat = false;
      }
    } else {
      this.errorRepeat = 'Fill in the field';
      this.badRepeat = true;
    }
  }

  registerUser() {
    if (!this.badMail && !this.badPassword && !this.badRepeat) {
      axios
        .post('http://localhost:3000/users', {
          id: this.userCount + 1,
          login: this.login,
          password: this.password
        });
      this.$emit('registered');
      this.$store.commit('setUserData', { login: this.login, password: this.password });
    }
  }
}
</script>

<style lang="scss" scoped>
  .registration {
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
    &__bad-password-notice,
    &__bad-repeat-notice {
      color:  $color-red;
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
      border: 2px solid black;
      width: 120px;
      height: 30px;
      cursor: pointer;
    }
  }
</style>
