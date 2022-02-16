<template>
    <div class="footer">
        <div class="footer__slogan">
            Incredible Convenient
        </div>
        <FooterLogos/>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FooterLogos from './Logo-components/FooterLogos.vue';

@Options({
  components: {
    FooterLogos
  },
})

export default class Footer extends Vue {
  
}
</script>

<style lang="scss">
.footer {
  width: 100%;
  height: 140px;
  background-color: $color-black;
  color: $color-orange;
  text-align: center;
  font-size: 25px;
  font-weight: 400;
  padding-top: 20px;
}
</style>
