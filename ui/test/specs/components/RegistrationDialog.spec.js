import sinon from 'sinon'
import { buildStores, createApp, mount } from '~/test/utils'
import RegistrationDialog from '@/components/RegistrationDialog'

describe('RegistrationDialog', () => {
  createApp()
  let wrapper
  function mountComponent(config = {}) {
    wrapper = mount(RegistrationDialog, {
      propsData: {
        visible: true
      },
      mocks: {
        $auth: {
          loginWith: config.LOGIN || (() => {})
        }
      },
      store: buildStores([
        {
          name: 'portal',
          getters: {
            registrationFormDisplayed: () => true
          },
          mutations: {
            HIDE_REGISTRATION_FORM: config.HIDE_REGISTRATION_FORM || (() => {}),
            SHOW_REGISTRATION_FORM: config.SHOW_REGISTRATION_FORM || (() => {})
          }
        },
        {
          name: 'notifications',
          mutations: {
            SHOW_NOTIFICATON: config.SHOW_NOTIFICATON || (() => {})
          }
        }
      ])
    })
  }

  test('Uses BaseDialogForm', () => {
    const HIDE_REGISTRATION_FORM = sinon.stub()

    mountComponent({ HIDE_REGISTRATION_FORM })
    expect(wrapper.findComponent({ name: 'BaseDialogForm' }).props()).toMatchObject({
      submitTitle: 'Register',
      title: 'Registration',
      visible: true
    })

    wrapper.findComponent({ name: 'BaseDialogForm' }).vm.$emit('hide')
    sinon.assert.calledOnce(HIDE_REGISTRATION_FORM)
  })

  test('Contains input field for name', () => {
    mountComponent()
    expect(wrapper.findComponent({ ref: 'name-input' }).props()).toMatchObject({
      value: '',
      label: 'Name'
    })
  })

  test('Contains input field for login', () => {
    mountComponent()
    expect(wrapper.findComponent({ ref: 'login-input' }).props()).toMatchObject({
      value: '',
      label: 'Login'
    })
  })

  test('Contains input field for password', () => {
    mountComponent()
    expect(wrapper.findComponent({ ref: 'password-input' }).props()).toMatchObject({
      value: '',
      label: 'Password',
      type: 'password'
    })
  })
})
