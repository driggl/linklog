import { buildStores, createApp, mount } from '~/test/utils'
import LoginDialog from '@/components/LoginDialog'

describe('LoginDialog', () => {
  createApp()
  let wrapper
  function mountComponent() {
    wrapper = mount(LoginDialog, {
      propsData: {
        visible: true
      },
      store: buildStores([
        {
          name: 'portal',
          getters: {
            loginFormDisplayed: () => true
          },
          mutations: {
            HIDE_LOGIN_FORM: () => {},
            SHOW_REGISTRATION_FORM: () => {}
          }
        },
        {
          name: 'notifications',
          mutations: {
            SHOW_NOTIFICATON: () => {}
          }
        }
      ])
    })
  }

  test('Inputs are empty on start', () => {
    mountComponent()
    expect(wrapper.find('#login-input').element.value).toEqual('')
    expect(wrapper.find('#password-input').element.value).toEqual('')
  })
})
