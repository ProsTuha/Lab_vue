import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  interface State{
    isAuthorized : boolean;
    user: {
      login: string;
      password: string;
    };
    warns: any[];
    errors: any[];
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
