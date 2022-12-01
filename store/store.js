export const state = () => ({
  counter: 0,
  errors: [],
  alerts: [],
  lastError: 0,
  lastAlert: 0,
  isActive: false,
  order: 'created_at',
  sort: true,
  search: null,
  editId: null,

})

export const getters = {
  getAlerts(state) {
    return state.alerts;
  },
  isActive(state) {
    return state.isActive;
  },
  getErrors(state) {
    return state.errors;
  }
}

export const mutations = {
  clearErrors(state, alert) {
    state.errors = alert;
  },
  setErrors(state, alert) {
    if (state.lastError > Date.now()) {
      return;
    }
    state.errors.push(alert);
    state.lastError = Date.now() + 500;
  },

  clearAlerts(state, alert) {
    state.alerts = alert;
  },
  setAlerts(state, alert) {
    if (state.lastAlert > Date.now()) {
      return;
    }
    state.alerts.push(alert);
    state.lastAlert = Date.now() + 500;
  }
}

export const actions = {
  addAlert({state, commit}, payload) {
    commit('setAlerts', payload);
    setTimeout(() => {
      var tmp = [];
      state.alerts.forEach(v => {
        if (v === payload) {
          return
        }
        tmp.push(v);
      });
      commit('clearAlerts', tmp);
    }, 20000)
  },
  removeAlert({state, commit}, payload) {
    var tmp = [];
    state.alerts.forEach(v => {
      if (v === payload) {
        return
      }
      tmp.push(v);
    });
    commit('clearAlerts', tmp);
  },
  removeError({state, commit}, payload) {
    var tmp = [];
    state.errors.forEach(v => {
      if (v === payload) {
        return
      }
      tmp.push(v);
    });
    commit('clearErrors', tmp);
  },
  addError({state, commit}, payload) {
    commit('setErrors', payload);
    setTimeout(() => {
      var tmp = [];
      state.errors.forEach(v => {
        if (v === payload) {
          return
        }
        tmp.push(v);
      });
      commit('clearErrors', tmp);
    }, 20000)
  }
}
