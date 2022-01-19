<template>
  <div class="registration">
    <Modal :title="'Registration'" :buttons="buttons">
        <div class="registration__login-field row">
          Login
          <Input :type="'text'"/>
        </div>
        <div class="registration__password-field row">
          Password
          <Input :type="'password'"/>
        </div>
        <div class="registration__repeat-password-field row">
          Repeat password
          <Input :type="'password'"/>
        </div>
      </Modal>
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
  }
})

export default class SignInModal extends Vue {
  buttons: string[] = ['Submit']
}
</script>

<style lang="scss" scoped>
  .registration {

    .row {
      display: flex;
      justify-content: space-between;
      margin: 10px 15px;
    }
  }
</style>
