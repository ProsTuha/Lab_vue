<template>
    <div class="registration">
      <div class="registration__login-field row">
        Login
        <Input :inputType="'text'" class="registration__input"/>
      </div>
      <div class="registration__password-field row">
        Password
        <Input :inputType="'password'" class="registration__input"/>
      </div>
      <div class="registration__repeat-password-field row">
        Repeat password
        <Input :inputType="'password'" class="registration__input"/>
      </div>
      <div class="registration__sign-up-proposal">
        Don't have an Epic Games account? <span class="registration__sign-up-link">Sign Up</span>
      </div>  
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Modal from '@/components/Modal.vue'
import Input from '@/components/Input.vue'

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
  }
})

export default class SignInModal extends Vue {
  close = true
  buttons: string[] = ['Submit']
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
  }
</style>
