<template>
<div class="add-info">
  <div class="add-info__plus" @click="addInfo" v-if="!addingInfo && !isEdit" v-bind="$attrs">
    +
  </div>
  <div class="add-info__edit" @click="addInfo" v-if="!addingInfo && isEdit" v-bind="$attrs">
    <img class="add-info__edit-img" src="@/img/others/edit-icon.png" alt="Edit info">
  </div>
  <div class="add-info__input" v-if="addingInfo">
    <Input @input-event="getValue" :content="content"/>
    <img src="@/img/others/confirm-icon.png" class="add-info__confirm-img" 
    alt="confirm" @click="confirmAdding">
  </div>
</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Input from '@/components/Input.vue';

@Options({
  props: {
    isEdit: false,
    hide: false,
    content: ''
  },
  inheritAttrs: false,
  components: {
    Input
  }
})

export default class AddInfo extends Vue {
  addingInfo = false;
  inputValue = '';

  addInfo() {
    this.addingInfo = true;
    this.$emit('update:hide', true)
  }

  confirmAdding() {
    this.$emit('confirm', this.inputValue);
    this.$emit('update:hide', false)
    this.addingInfo = false;
  }

  getValue(value) {
    this.inputValue = value;
  }
}
</script>

<style lang="scss" scoped>
  .add-info {

    &__input {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__confirm-img {
      width: 15%;
      margin-left: 20px;
    }

    &__confirm-img:hover {
      background: green;
      border-radius: 10px;
      transition: background 1s;
    }

    &__edit-img {
      width: 100%;
    }
  }
</style>
