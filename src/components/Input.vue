<template>
  <div class="input-wrap">
    <form class="input-wrap__form" action="">
      <input @input="getValue" 
      v-model="inputValue" 
      :type="inputType" 
      :placeholder="placeholder" 
      class="input-wrap__input">
    </form>
    <img src="@/img/others/basket-icon.png" alt="clear" @click="clearInput"
     v-if="isWritten" class="input-wrap__cleaning-basket">
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    inputType: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    }
  }
})
export default class Input extends Vue {
    isWritten = false
    inputValue = ''

    getValue(event) {
      this.isWritten = event.target.value
      this.$emit('inputEvent', event.target.value)
    }

    clearInput() {
      this.$emit('inputEvent', '')  
      this.inputValue = ''
    }
}
</script>

<style lang="scss" scoped>
.input-wrap {
  height: 100%;
  width: 100%;

  &__form {
    height: 100%;
    width: 100%;

    .input-wrap__input {
      margin-top: 5px;
      width: 100%;
      height: 100%;
      padding: 10px;
      border: 2px solid $color-black;
      background: $input-background;
      border-radius: 20px;
    }
  }

  .input-wrap__input::placeholder {
    color: $placeholder;
  }

  &__cleaning-basket {
    height: 4%;
    position: absolute;
    top: 21.4%;
    right: 27%;
    margin: 2px;
  }

  &__cleaning-basket:hover {
    border-radius: 5px;
    background: rgba(255, 0, 0, 0.404);
  }
}
</style>
