import { buildStores, mount } from '~/test/utils'
import RegistrationDialog from '@/components/RegistrationDialog'

describe('RegistrationDialog', () => {
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
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
