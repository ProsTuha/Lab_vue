<template>
  <teleport to="#alert">
    <div class="alert">
        <div class="alert__inner" 
        :class="{'error': isError, 
        'success': isSuccess, 
        'info': isInfo, 
        'warning': isWarning}" 
        role="alert">
            {{message}}
        </div>
    </div>    
  </teleport>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

  @Options({
    props: {
      isError: {
        type: Boolean,
        default: false
      },
      isSuccess: {
        type: Boolean,
        default: false
      },
      isWarning: {
        type: Boolean,
        default: false
      },
      isInfo: {
        type: Boolean,
        default: false,
      }, 
      message: {
        type: String,
        default: 'Success!'
      }
    },
    mounted() {
      window.setTimeout(() => { this.show = false }, 2000)
    }      
  })

export default class App extends Vue {
  show = true;
}
</script>

<style lang="scss" scoped>
@import "@/assets/mixins.scss";

.alert {
  @include alert;

  &__inner {
    height: 50px;
    line-height: 50px;
    border-radius: 15px;
  }
}

.error {
  background-color: $alert-bg-error;
}

.success {
  background-color: $alert-bg-success;
}

.warning {
  background-color: $alert-bg-warning;
}

.info {
  background-color: $alert-bg-info;
}
</style>
