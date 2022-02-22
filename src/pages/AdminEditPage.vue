<template>
  <div class="edition">
    <ProductInfo :sectionName="'Edit product'" @confirmation="showStatus"
    :productId="this.$route.params.id"/>
  </div>
  <Alert v-if="this.alert" :isError="this.error" :isSuccess="!this.error" 
  :message="this.alertMessage"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ProductInfo from '@/components/ProductInfo.vue';
import Alert from '@/components/Alert.vue';

@Options({
  components: {
    ProductInfo,
    Alert
  }
})

export default class AdminEdit extends Vue {
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

</style>
