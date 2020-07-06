export const state = () => {
  const store = {
    loginFormDisplayed: false,
    registrationFormDisplayed: false
  }

  return store
}

export const getters = {
  loginFormDisplayed: (state) => state.loginFormDisplayed,
  registrationFormDisplayed: (state) => state.registrationFormDisplayed
}

export const mutations = {
  SHOW_LOGIN_FORM: (state) => {
    state.loginFormDisplayed = true
    state.registrationFormDisplayed = false
  },
  HIDE_LOGIN_FORM: (state) => {
    state.loginFormDisplayed = false
  },
  SHOW_REGISTRATION_FORM: (state) => {
    state.registrationFormDisplayed = true
    state.loginFormDisplayed = false
  },
  HIDE_REGISTRATION_FORM: (state) => {
    state.registrationFormDisplayed = false
  }
}
