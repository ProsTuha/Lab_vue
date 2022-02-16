<template>
<teleport to="#modal" :disabled="!modal">
  <div class="modal" v-if="modal">
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
  </div>
  </teleport>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    title: String,
    modal: {
      type: Boolean,
      default: false
    }
  }
})

export default class ModalWindow extends Vue {
  closeWindow() {
    this.$emit('update:modal', false);
  }
}
</script>

<style lang="scss" scoped>
  .modal {
    width: 28%;
    background: #121212;
    border-radius: 20px;
    padding: 10px;
    position: absolute;
    top: 25%;
    left: calc(67%/2);
    z-index: 1;
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
        background: $color-orange;
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
