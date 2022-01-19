<template>
    <div class="products">
        <h1 class="products__content indicator">Products!</h1>
    </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import ProductCard from '@/components/ProductCard.vue';

@Options({
  components: {
    ProductCard
  }
})

export default class Products extends Vue {
        
}
</script>
