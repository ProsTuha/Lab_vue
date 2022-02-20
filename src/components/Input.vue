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
     v-if="isWritten && !isTime" class="input-wrap__cleaning-basket">
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
    },
    content: {
      type: [String, Number],
      default: ''
    }
  },
  watch: {
    content() {
      this.inputValue = this.content;
    }
  },
  mounted() {
    this.inputValue = this.content;
    this.isWritten = this.inputValue.length > 0;
    if (this.inputType === 'date' || this.inputType === 'time') this.isTime = true;
  }
})
export default class Input extends Vue {
    isWritten = false;
    isTime = false;
    inputValue = '';

    getValue() {
      this.isWritten = this.inputValue.length > 0;
      this.$emit('inputEvent', this.inputValue);
    }

    clearInput() {
      this.$emit('inputEvent', '')  
      this.inputValue = ''
      this.isWritten = false
    }
}
</script>

<style lang="scss" scoped>
.input-wrap {
  height: 100%;
  width: 100%;
  position: relative;

  &__form {
    height: 100%;
    width: 100%;

    .input-wrap__input {
      width: 100%;
      height: calc(100% - 4px);
      border: 2px solid $color-black;
      background: $input-background;
      border-radius: 20px;
      padding-left: 7px;
      padding-right: 40px;
    }
  }

  .input-wrap__input::placeholder {
    color: $placeholder;
  }

  &__cleaning-basket {
    position: absolute;
    right: -40px;
    height: 70%;
    top: 15%;
  }

  &__cleaning-basket:hover {
    border-radius: 5px;
    background: rgba(255, 0, 0, 0.404);
  }
}
</style>
