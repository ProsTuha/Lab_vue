<template>
    <div class="about">
      <div class="about__text">
        The project was developed by <span class="about__text_underlined">Matvei Antonov</span>, 
        a student of the <span class="about__text_underlined">Student Lab, ITA</span> :)
      </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import SignInModal from '@/components/SignInModal.vue'

@Options({
  components: {
    SignInModal
  }
})

export default class About extends Vue {
  
}
</script>

<style lang="scss" scoped>
.about {
  height: 496px;
  position: relative;

  &__text {
    position: absolute;
    text-align: center;
    font-size: 28px;
    width: 35%;
    padding: 15px;
    left: 32.5%;
    border-radius: 20px;
    top: 35%;
    margin: 0 auto;
    background: $color-orange;

    &_underlined {
      text-decoration: underline;
    }
  }
}
</style>
