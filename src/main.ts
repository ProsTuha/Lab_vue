import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/router'
import './assets/main-styles.scss'
import './interfaces'
import store from '@/store'

const app = createApp(App).use(router).use(store);

const errors: any[] = [];
app.config.errorHandler = function (err, vm, info) {
  errors.push(err);
  console.log('APP ERROR:\n', err, '\n', vm, '\n', info, '\n');
  store.commit('addError', { message: err, vueAplic: vm, information: info });
};

const warnings: any[] = [];
app.config.warnHandler = function (msg, vm, trace) {
  warnings.push(msg);
  console.log('APP ERROR:\n', msg, '\n', vm, '\n', trace, '\n');
  store.commit('addWarn', { message: msg, vueAplic: vm, information: trace });
};

app.mount('#app');
