<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    {{ testComputed }}

    <h2>Warnings list:</h2>
    <ul v-for="warn of warnings">
      <li>{{ warn }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {Prop} from 'vue-property-decorator'
  import {Options, Vue} from 'vue-class-component';
  import {mapState} from "vuex";

@Options({
  computed: {
    ...mapState({
      errors: state => (state as any).errors,
      warnings: state => (state as any).warnings
    })
  }
})
export default class IndexPage extends Vue {
  @Prop(String)
  readonly title!: string;
}
</script>
