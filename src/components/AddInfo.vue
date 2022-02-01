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
  mounted() {
    this.inputValue = this.content;
  },
  props: {
    isEdit: false,
    hide: false,
    content: String
  },
  inheritAttrs: false,
  components: {
    Input
  },
  methods: {
    confirmAdding() {
      if (!this.wasInput) {
        this.inputValue = this.content;
      } 
      this.$emit('confirm', this.inputValue);
      this.$emit('update:hide', false)
      this.addingInfo = false;
      this.wasInput = false;
    }
  }
})

export default class AddInfo extends Vue {
  addingInfo = false;
  inputValue = '';
  wasInput = false;

  addInfo() {
    this.addingInfo = true;
    this.$emit('update:hide', true)
  }

  getValue(value) {
    this.inputValue = value;
    this.wasInput = true;
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
