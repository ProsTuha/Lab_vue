<template>
  <div class="home">
    <div class="home__content">
      <div class="home__content__input-wrap">
        <Input @input="value" :inputType="'text'" :placeholder="'Search'"/>
      </div>
      <div class="home__content__categories">
        <Section headerName="Categories">
          <CategoryCard/>
        </Section>
      </div>
      <div class="home__content__products">
        <Section headerName="Recently added">
          <ProductCard/>
        </Section>
      </div>
    </div> 
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CategoryCard from '@/components/CategoryCard.vue';
import ProductCard from '@/components/ProductCard.vue'
import Section from '@/components/Section.vue';
import Input from '@/components/Input.vue'

@Options({
  components: {
    CategoryCard,
    ProductCard,
    Section,
    Input
  }
})
export default class HomePage extends Vue {
  value = ''
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;

  &__content {

    &__input-wrap {
      width: 50%;
      margin: 0 auto;
      font-size: 150%;
    }
  }
}
</style>
