<template>
  <div class="hello">
    <h1>{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator'
import { inversifyContainer } from '@/apps/test/inversify/inversify.config'
import { TYPES } from '@/apps/test/inversify/types';

export default class IndexPage extends Vue {
  @Prop(String)
  readonly title!: string;

  mounted() {
    console.log(inversifyContainer.get(TYPES.Warrior))
  }
}
</script>
