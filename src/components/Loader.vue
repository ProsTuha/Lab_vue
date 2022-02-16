<template>
<teleport to="#loader" :disabled="!disabled">
<div class="load-section">
  <div class="load-section__roller">
    <div class="load-section__wrap">
    </div>
    <div class="load-section__wrap">
    </div>
    <div class="load-section__wrap">
    </div>
    <div class="load-section__wrap">
    </div>
    <div class="load-section__wrap">
    </div>
    <div class="load-section__wrap">
    </div>
    <div class="load-section__wrap">
    </div>
    <div class="load-section__wrap">
    </div>
  </div>
</div>
</teleport>
</template>

<script>
import { Vue, Options } from 'vue-class-component';

@Options({
  props: {
    showLoader: Boolean
  }
})
export default class Loader extends Vue {
  disabled = false;
}
</script>

<style lang="scss" scoped>
.load-section {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  &__roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  }

  &__wrap {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
  }

  &__wrap:after {
    content: " ";
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: $color-orange;
    margin: -4px 0 0 -4px;
  }

  &__wrap:nth-child(1) {
    animation-delay: -0.036s;
  }

  &__wrap:nth-child(1):after {
    top: 63px;
    left: 63px;
  }

  &__wrap:nth-child(2) {
    animation-delay: -0.072s;
  }

  &__wrap:nth-child(2):after {
    top: 68px;
    left: 56px;
  }

  &__wrap:nth-child(3) {
    animation-delay: -0.108s;
  }

  &__wrap:nth-child(3):after {
    top: 71px;
    left: 48px;
  }

  &__wrap:nth-child(4) {
    animation-delay: -0.144s;
  }

  &__wrap:nth-child(4):after {
    top: 72px;
    left: 40px;
  }

  &__wrap:nth-child(5) {
    animation-delay: -0.18s;
  }

  &__wrap:nth-child(5):after {
    top: 71px;
    left: 32px;
  }

  &__wrap:nth-child(6) {
    animation-delay: -0.216s;
  }

  &__wrap:nth-child(6):after {
    top: 68px;
    left: 24px;
  }

  &__wrap:nth-child(7) {
    animation-delay: -0.252s;
  }

  &__wrap:nth-child(7):after {
    top: 63px;
    left: 17px;
  }

  &__wrap:nth-child(8) {
    animation-delay: -0.288s;
  }

  &__wrap:nth-child(8):after {
    top: 56px;
    left: 12px;
  }

  @keyframes lds-roller {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
