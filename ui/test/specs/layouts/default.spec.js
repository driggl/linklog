import sinon from 'sinon'
import { buildStores, mount } from '~/test/utils'
import DefaultLayout from '@/layouts/default.vue'

describe('Default layout', () => {
  let wrapper
  function mountComponent(config = {}) {
    wrapper = mount(DefaultLayout, {
      mocks: {
        $auth: {
          loggedIn: !!config.user,
          user: config.user || null
        }
      },
      store: buildStores([
        {
          name: 'portal',
          getters: {
            loginFormDisplayed: () => false,
            registrationFormDisplayed: () => false
          },
          mutations: {
            SHOW_LOGIN_FORM: config.SHOW_LOGIN_FORM || (() => {}),
            SHOW_REGISTRATION_FORM: config.SHOW_REGISTRATION_FORM || (() => {})
          }
        },
        {
          name: 'notifications',
          getters: {
            notification: () => null
          },
          mutations: {
            SHOW_NOTIFICATON: () => {},
            HIDE_NOTIFICATION: () => {}
          }
        }
      ])
    })
  }
  const USER = { id: 321, attributes: { login: 'xjohn' } }

  test('Login and registration button are displayed only for not logged in user', () => {
    const SHOW_LOGIN_FORM = sinon.stub()
    const SHOW_REGISTRATION_FORM = sinon.stub()
    mountComponent({ SHOW_LOGIN_FORM, SHOW_REGISTRATION_FORM })

    wrapper.findComponent({ ref: 'login-button' }).trigger('click')
    sinon.assert.calledOnce(SHOW_LOGIN_FORM)

    wrapper.findComponent({ ref: 'register-button' }).trigger('click')
    sinon.assert.calledOnce(SHOW_REGISTRATION_FORM)

    expect(wrapper.findComponent({ ref: 'login-button' }).exists()).toEqual(true)
    expect(wrapper.findComponent({ ref: 'register-button' }).exists()).toEqual(true)

    mountComponent({ user: USER })
    expect(wrapper.findComponent({ ref: 'login-button' }).exists()).toEqual(false)
    expect(wrapper.findComponent({ ref: 'register-button' }).exists()).toEqual(false)
  })

  test('User name and logout button are displayed for logged in user', () => {
    mountComponent()
    expect(wrapper.findComponent({ ref: 'logout-button' }).exists()).toEqual(false)
    expect(wrapper.text()).not.toContain('Logged in as')

    mountComponent({ user: USER })
    expect(wrapper.findComponent({ ref: 'logout-button' }).exists()).toEqual(true)
    expect(wrapper.text()).toContain('Logged in as: xjohn')
  })
})
