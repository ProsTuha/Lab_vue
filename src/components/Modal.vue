<template>
<teleport to="#modal" :disabled="!teleportModal">
  <div class="modal" v-if="showModal">
    <div class="modal-top">
      <div class="modal-top__title">
        {{title}}
      </div>
      <div class="modal-top__close-wrap" @click="closeWindow">
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
  </teleport>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    title: String,
    buttons: {
      type: Array
    },
    teleportModal: {
      type: Boolean,
      default: false
    },
    showModal: {
      type: Boolean,
      default: true
    }
  }
})

export default class ModalWindow extends Vue {
  closeWindow() {
    this.$emit('update:showModal', false);
    this.$emit('update:teleportModal', false);
  }
}
</script>

<style lang="scss" scoped>
  .modal {
    width: 33%;
    background: #121212;
    border-radius: 20px;
    padding: 10px;
    position: absolute;
    top: 25%;
    left: calc(67%/2);
    z-index: 1;

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

    &__button:hover {
      box-shadow: 0 0 1px $color-white, 0 0 2px $color-pink, 0 0 4px $color-white, 
      0 0 8px $color-pink, 0 0 16px $color-pink, 0 0 20px $color-pink, 
      0 0 25px $color-pink;
    }

    &__button:active {
      background: $color-white;
    }
  }

  .modal-top {
    height: 40px;
    display: flex;
    justify-content: space-between;
    color: $color-white;
    margin-bottom: 25px;

    &__close-wrap {
      font-size: 40px;
      text-align: right;
      margin-right: 20px;
      height: 20px;
      line-height: 20px;
      margin-top: 10px;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background: $color-purple;
      }
    }

    &__title {
      font-size: 35px;
      text-align: left;
      margin-left: 20px;
      line-height: 40px;
    }
  }
</style>
