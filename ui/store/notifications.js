export const state = () => {
  const store = {
    notification: null
  }

  return store
}

export const getters = {
  notification: (state) => state.notification
}

export const mutations = {
  SHOW_NOTIFICATON: (state, message) => {
    state.notification = message
  },
  HIDE_NOTIFICATION: (state) => {
    state.notification = null
  }
}
