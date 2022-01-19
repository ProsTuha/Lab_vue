<template>
  <div class="modal" v-if="!closeWindow">
    <div class="modal-top">
      <div class="modal-top__title">
        {{title}}
      </div>
      <div class="modal-top__close-wrap" @click="closeWindow = true">
        ×
      </div>
    </div>
    <div class="modal__content">
      <slot>
        
      </slot>
    </div>
    <div class="modal__buttons">
      <div class="modal__button-wrap" v-for="button in buttons" :key="button">
        <button class="modal__button">
          {{button}}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    title: String,
    buttons: {
      type: Array
    }
  }
})

export default class ModalWindow extends Vue {
  closeWindow = false
}
</script>

<style lang="scss" scoped>
  .modal {
    width: 33%;
    margin: 0 auto;
    background: red;
    border-radius: 15px;

    &__buttons {
      display: flex;
      justify-content: center;
    }

    &__button-wrap {
      margin: 10px;
    }

    &__button {
      background: pink;
      border-radius: 10px;
      border: 2px solid black;
      width: 120px;
      height: 30px;
    }
  }

  .modal-top {
    height: 40px;
    display: flex;
    justify-content: space-between;

    &__close-wrap {
      font-size: 40px;
      text-align: right;
      margin-right: 20px;
      height: 20px;
      line-height: 20px;
      margin-top: 10px;
      border-radius: 5px;

      &:hover {
        background: white;
      }
    }

    &__title {
      font-size: 30px;
      text-align: left;
      margin-left: 20px;
      line-height: 40px;
    }
  }
</style>
