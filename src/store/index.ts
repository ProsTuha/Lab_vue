import { createStore } from 'vuex';

interface IStore {
  isAuthorized : boolean;
  user: {
    login: string;
    password: string;
  };
  warns: any[];
  errors: any[];
}

export default createStore<IStore>({
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
    setUserData(state, [login, password]) {
      state.user.login = login;
      state.user.password = password;
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
