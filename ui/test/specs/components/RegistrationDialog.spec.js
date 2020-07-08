import { buildStores, mount, createApp } from '~/test/utils'
import RegistrationDialog from '@/components/RegistrationDialog'

describe('RegistrationDialog', () => {
  createApp()
  let wrapper
  function mountComponent() {
    wrapper = mount(RegistrationDialog, {
      propsData: {
        title: 'ABC',
        text: 'XYZ'
      },
      store: buildStores([
        {
          name: 'portal',
          getters: {
            loginFormDisplayed: () => true,
            registrationFormDisplayed: () => true
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
    expect(wrapper.exists()).toEqual(true)
  })
})
