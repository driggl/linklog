export const state = () => {
  return {}
}

export const getters = {}

export const mutations = {}

export const actions = {
  async REGISTER(_, registrationData) {
    await this.$axios.post('/sign_up', {
      data: {
        attributes: registrationData
      }
    })
  }
}
