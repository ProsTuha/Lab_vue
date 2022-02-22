<template>
  <div class="adding">
    <ProductInfo :sectionName="'AddProduct'" @confirmation="showStatus"/>
  </div>
  <Alert v-if="this.alert" :isError="this.error" :isSuccess="!this.error" 
  :message="this.alertMessage"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Alert from '@/components/Alert.vue'; 
import Input from '@/components/Input.vue';
import ProductInfo from '@/components/ProductInfo.vue';

@Options({
  components: {
    Input,
    Alert,
    ProductInfo
  }
})

export default class AdminAdd extends Vue {
  error = false;
  alertMessage = '';
  alert = false;
  
  showStatus(emitParam) {
    if (emitParam.isSuccess) {
      this.error = false;
      this.alert = true;
      this.alertMessage = emitParam.message;
      window.setTimeout(() => { 
        this.alert = false;
        this.error = false;
        this.$router.push('/admin/products'); 
      }, 1000);
    } else {
      this.error = true;
      this.alert = true;
      this.alertMessage = emitParam.message;
      window.setTimeout(() => { 
        this.alert = false;
        this.error = false; 
      }, 1000);
    }
  }
}
</script>

<style lang="scss" scoped>
.adding {

  &__section {
    width: 65%;
  }

  &__wrap {
    display: flex;
    justify-content: space-evenly;
  }

  &__product-image-wrap {
    width: 30%;
    text-align: center;
  }

  &__image {
    object-fit: cover;
    width: 235px;
    height: 296px;
    border: 5px solid $color-orange;
    border-radius: 15px;
  }

  &__image-inscription {
    font-size: 30px;
    color: $color-orange;
    text-align: left;
  }

  &__product-info {
    width: 45%;
  }

  &__information-inscription {
    font-size: 30px;
    color: $color-orange;
    text-align: left;
  }

  &__product-fields {
    width: 90%;
    float: right;
  }

  &__field {
    display: flex;
    justify-content: space-between;
    font-size: 27px;
    color: $color-pink;
    margin-top: 10px;
    line-height: 40px;
  }

  &__input {
    width: 50%;
    height: 40px;
    font-size: 23px;
    margin-right: 50px;
  }

  &__requirements {
    display: flex;
    font-size: 27px;
    color: $color-pink;
    margin-top: 10px;
  }

  &__description-input,
  &__requirements-input {
    height: 200px;
    width: 62%;
    resize: none;
    font-size: 20px;
    border: 2px solid $color-black;
    border-radius: 15px;
    background: $color-orange;
    
    &::placeholder {
      color: $placeholder;
    }
  }

  &__requirements-input {
    width: 100%;
  }

  &__platform-checkboxes {
    display: flex;
    justify-content: space-between;
  }

  &__platform-checkbox {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 30px;
    color: $color-orange;
  }

  &__platform-field {
    font-size: 27px;
    color: $color-pink;
    margin-top: 10px;
  }

  &__platform-input {
    width: 25px;
    height: 25px;
  }

  &__description-field,
  &__image-field {
    font-size: 27px;
    text-align: left;
    color: $color-pink;
    margin-top: 10px;
  }

  &__description-input {
    width: 100%;
  }

  &__image-input {
    width: 100%;
    font-size: 20px;
    border: 2px solid black;
    background: $color-orange;

  }
  
  &__announcement-field {
    font-size: 27px;
    text-align: left;
    color: $color-pink;
  }

  &__announcement-input {
    width: 85%;
  }

  &__buttons {
    display: flex;
    justify-content: right;
    margin-top: 40px;
  }

  &__button-link {
    width: 18%;
    margin: 10px;
    margin-left: 80px;
  }

  &__confirm-button {
    width: 18%;
    margin: 10px;
    margin-left: 80px;
    height: 50px;
    border: 2px solid $color-black;
    border-radius: 15px;
    font-size: 25px;
    background: $color-pink;
    cursor: pointer;
  }

  &__cancel-button {
    width: 100%;
    height: 50px;
    border: 2px solid $color-black;
    border-radius: 15px;
    font-size: 25px;
    background: $color-pink;
    cursor: pointer;
  }

  &__cancel-button:hover {
    transition: background 0.5s;
    background: $color-orange;
  }

  &__confirm-button {
    background: $color-orange;

    &:hover {
      transition: background 0.5s;
      background: $color-pink;
    }
  }
}
</style>
