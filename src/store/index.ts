import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

interface IWarnAndError {
  message: string;
  vueAplic: any;
  information: string;
}

interface IStore {
  isAuthorized : boolean;
  user: {
    login: string;
    password: string;
  };  
  warns: IWarnAndError[];
  errors: IWarnAndError[];
}

export default createStore<IStore>({
  plugins: [createPersistedState({})],

  state: {
    isAuthorized: false,
    user: {
      login: '',
      password: ''
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
      state.user.login = userData.login;
      state.user.password = userData.password;
    },
    clearUserData(state) {
      state.user.login = '';
      state.user.password = '';
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
