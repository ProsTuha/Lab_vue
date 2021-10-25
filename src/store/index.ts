import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore<any>({
  state() {
    return {
      errors: [],
      warnings: []
    }
  },
  mutations: {
    addWarn(state, payload) {
      if (!state.warnings.includes(`TRACE: ${payload.trace}; MESSAGE: ${payload.message}`)) {
        state.warnings.push(`TRACE: ${payload.trace}; MESSAGE: ${payload.message}`)
      }
    },
    addError(state, payload) {
      if (!state.errors.includes(payload)) {
        state.errors.push(payload)
      }
    }
  }
});

export default store;
