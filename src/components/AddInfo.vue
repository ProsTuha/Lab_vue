<template>
<div class="add-info">
  <div class="add-info__plus" @click="addInfo" v-if="!addingInfo" v-bind="$attrs">
    +
  </div>
  <div class="add-info__input" v-if="addingInfo">
    <Input/>
  </div>
</div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import Input from '@/components/Input.vue'

@Options({
  inheritAttrs: false,
  components: {
    Input
  }
})

export default class AddInfo extends Vue {
  addingInfo = false;

  addInfo() {
    this.addingInfo = true;
  }
}
</script>

<style lang="scss" scoped>
  .add-info {
    &__input {
      margin: 0 auto;
      width: 100%;
    }
  }
</style>
