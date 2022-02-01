import { Store } from 'vuex';
import { IUser } from '@/interfaces';

declare module '@vue/runtime-core' {
  interface State{
    isAuthorized : boolean;
    user: IUser;
    warns: any[];
    errors: any[];
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
