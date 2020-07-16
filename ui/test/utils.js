import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import * as VueTestUtils from '@vue/test-utils'

Vue.use(Vuetify)
Vue.use(Vuex)

export function shallow(Component, configData = {}) {
  const { mocks, ...config } = configData
  const localVue = VueTestUtils.createLocalVue()
  localVue.use(Vuetify)
  localVue.use(Vuex)
  if (!process || process.env.NODE_ENV !== 'test') {
    localVue.use(VueRouter)
  }

  return VueTestUtils.shallowMount(Component, {
    vuetify: new Vuetify({ theme: {} }),
    mocks: {
      $cookies: {
        get: () => {},
        set: () => {}
      },
      ...mocks
    },
    stubs: ['Nuxt', 'router-link', 'nuxt-link', 'infinite-loading', 'client-only'],
    localVue,
    sync: false,
    ...config
  })
}

export function mount(Component, configData = {}) {
  const { mocks, ...config } = configData
  const localVue = VueTestUtils.createLocalVue()
  localVue.use(Vuetify)
  localVue.use(Vuex)
  if (!process || process.env.NODE_ENV !== 'test') {
    localVue.use(VueRouter)
  }

  return VueTestUtils.mount(Component, {
    vuetify: new Vuetify({ theme: {} }),
    mocks: {
      $cookies: {
        get: () => {},
        set: () => {}
      },
      ...mocks
    },
    stubs: ['Nuxt', 'router-link', 'nuxt-link', 'infinite-loading', 'client-only', ...(config.stubs || [])],
    localVue,
    sync: false,
    ...config
  })
}

export function buildStore(name, config) {
  return buildStores([{ name, ...config }])
}

export function buildStores(stores) {
  const modules = {}
  stores.forEach((config) => {
    modules[config.name] = {
      namespaced: true,
      state: config.state || {},
      getters: config.getters || {},
      actions: config.actions || {},
      mutations: config.mutations || {}
    }
  })

  return new Vuex.Store({ modules })
}

export function createApp() {
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.append(app)
}

export function delay(time = 0) {
  return new Promise((resolve) => setTimeout(() => resolve(), time))
}
