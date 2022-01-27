import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { IUser } from '@/interfaces'

interface IWarnAndError {
  message: string;
  vueAplic: any;
  information: string;
}

interface IStore {
  isAuthorized : boolean;
  user: IUser;
  warns: IWarnAndError[];
  errors: IWarnAndError[];
}

export default createStore<IStore>({
  plugins: [createPersistedState({})],

  state: {
    isAuthorized: false,
    user: {
      id: -1,
      login: '',
      role: '',
      firstName: '',
      lastName: '',
      password: '',
      sex: '',
      age: 0,
      address: '',
      shippingAddress: '',
      paymentCard: ''
    },
    warns: [],
    errors: []
  },
  getters: {},
  mutations: {
    userLogIn(state) {
      state.isAuthorized = true;
    },
    userLogOut(state) {
      state.isAuthorized = false;
    },
    setUserData(state, userData) {
      state.user = userData;
    },
    clearUserData(state) {
      state.user.login = '';
      state.user.password = '';
      state.user.id = -1;
      state.user.role = '';
      state.user.firstName = '';
      state.user.lastName = '';
      state.user.sex = '';
      state.user.age = 0;
      state.user.address = '';
      state.user.shippingAddress = '';
      state.user.paymentCard = '';
    },
    addWarn(state, warning) {
      if (state.warns.length < 5) {
        state.warns.push(warning);
      } else {
        state.warns.shift();
        state.warns.push(warning);
      }
    },
    addError(state, error) {
      if (state.errors.length < 5) {
        state.errors.push(error);
      } else {
        state.errors.shift();
        state.errors.push(error);
      }
    }
  },
  actions: {}
})
