import { buildStores, mount } from '~/test/utils'
import DefaultLayout from '@/layouts/default.vue'

describe('Default layout', () => {
  let wrapper
  function mountComponent() {
    wrapper = mount(DefaultLayout, {
      mocks: {
        $auth: {
          loggedIn: true,
          user: {
            id: 56
          }
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
            SHOW_LOGIN_FORM: () => {},
            SHOW_REGISTRATION_FORM: () => {}
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

  test('Menu contains appropriate items', () => {
    mountComponent()
    expect(wrapper.findAll('.v-list-item').wrappers.map((w) => w.text())).toEqual(['Welcome'])
  })
})
