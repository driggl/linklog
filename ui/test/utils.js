import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import * as VueTestUtils from '@vue/test-utils'

Vue.use(Vuetify)
Vue.use(Vuex)

export function shallow(Component, config) {
  const localVue = VueTestUtils.createLocalVue()
  localVue.use(Vuetify)
  localVue.use(Vuex)
  if (!process || process.env.NODE_ENV !== 'test') {
    localVue.use(VueRouter)
  }

  return VueTestUtils.shallowMount(Component, {
    vuetify: new Vuetify({ theme: {} }),
    stubs: [
      'Nuxt',
      'router-link',
      'nuxt-link',
      'infinite-loading',
      'client-only'
    ],
    localVue,
    sync: false,
    ...config
  })
}

export function mount(Component, config) {
  const localVue = VueTestUtils.createLocalVue()
  localVue.use(Vuetify)
  localVue.use(Vuex)
  if (!process || process.env.NODE_ENV !== 'test') {
    localVue.use(VueRouter)
  }

  return VueTestUtils.mount(Component, {
    vuetify: new Vuetify({ theme: {} }),
    stubs: [
      'Nuxt',
      'router-link',
      'nuxt-link',
      'infinite-loading',
      'client-only'
    ],
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
