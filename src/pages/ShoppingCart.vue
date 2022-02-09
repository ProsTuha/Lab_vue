<template>
<div class="cart">
  <Section class="cart__section" :headerName="'Shopping cart'">
    <div class="cart__table-header">
      <div class="cart__header-name">
        
      </div>
    </div>
    <div class="cart__table-row">

    </div>
  </Section>
</div>
</template>

<script>
import { Vue, Options } from 'vue-class-component';
import { mapState } from 'vuex';
import Section from '@/components/Section.vue';

@Options({
  components: {
    Section
  },
  computed: {
    ...mapState(['user'])
  }
})

export default class ShoppingCart extends Vue {

}
</script>

<style lang="scss" scoped>
.cart {

  &__section {
    width: 85%;
    margin-bottom: 1%;
    min-height: 500px;
  }
}

</style>
