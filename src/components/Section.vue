<template>
  <div class="section">
    <div class="section__header">
      {{headerName}}
    </div>
    <div class="section__content">
      <slot class="section__content__slot"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    headerName: {
      type: String,
      required: true
    }
  }
})

export default class Section extends Vue {
    
}
</script>

<style lang="scss" scoped>
.section {
  background-color: $section-bg;
  width: 100%;
  margin: 1% auto;
  border-radius: 40px;
  padding: 1% 0 3%;

  &__header {
    font-size: 2.3em;
    padding-left: 1em;
    width: 90%;
    margin: 0 auto;
    color: $color-pink;
    border-bottom: 1px solid $color-orange;
  }
  
  &__content {
    margin: 1em auto 0;
    padding: 0 4%;
    width: 90%;
  }
}
</style>
