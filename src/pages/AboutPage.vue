<template>
    <div class="about">
      <SignInModal/>
      <h1 class="about__content indicator">About!</h1>
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

</style>
