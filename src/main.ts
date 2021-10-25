import { createApp } from 'vue';
import store from './store';
import App from './App.vue';

const app = createApp(App).use(store)

app.config.errorHandler = function (err, vm, info) {
  console.log('ERROR HANDLER', {
    error: (err as any).message,
  });

  store.commit('addError', (err as any).message)
};

app.config.warnHandler = function (msg, vm, trace) {
  console.log('WARN HANDLER', {
    message: msg
  });

  store.commit('addWarn', {
    message: msg,
    trace
  })
};

app.mount('#app');
