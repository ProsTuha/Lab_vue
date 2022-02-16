import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { IUser, IProduct } from '@/interfaces';

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
      paymentCard: '',
      cartProducts: [],
      cartPrice: 0
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
      state.user.id = userData.id;
      state.user.role = userData.role;
      state.user.firstName = userData.firstName;
      state.user.lastName = userData.lastName;
      state.user.sex = userData.sex;
      state.user.age = userData.age;
      state.user.address = userData.address;
      state.user.shippingAddress = userData.shippingAddress;
      state.user.paymentCard = userData.paymentCard;
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

    addToCart(state, product: IProduct) {
      state.user.cartProducts.push(product);
    },

    removeFromCart(state, index) {
      state.user.cartProducts.splice(index, 1);
    },

    clearCart(state) {
      state.user.cartProducts.length = 0;
    },

    setTotalPrice(state, price: number) {
      state.user.cartPrice = price;
    },

    setProductPlatform(state, categories: []) {
      const field = 'selectedCategory';
      for (let i = 0; i < state.user.cartProducts.length; i += 1) {
        state.user.cartProducts[i][field] = categories[i];
      }
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
