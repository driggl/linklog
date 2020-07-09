import sinon from 'sinon'
import { buildStores, createApp, mount } from '~/test/utils'
import LoginDialog from '@/components/LoginDialog'

describe('LoginDialog', () => {
  createApp()
  let wrapper
  function mountComponent(config = {}) {
    wrapper = mount(LoginDialog, {
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
            loginFormDisplayed: () => true
          },
          mutations: {
            HIDE_LOGIN_FORM: config.HIDE_LOGIN_FORM || (() => {}),
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
    const HIDE_LOGIN_FORM = sinon.stub()

    mountComponent({ HIDE_LOGIN_FORM })
    expect(wrapper.findComponent({ name: 'BaseDialogForm' }).props()).toMatchObject({
      submitTitle: 'Log in',
      title: 'Login',
      visible: true
    })

    wrapper.findComponent({ name: 'BaseDialogForm' }).vm.$emit('hide')
    sinon.assert.calledOnce(HIDE_LOGIN_FORM)
  })

  test('Contains github authentication button', () => {
    const LOGIN = sinon.stub()
    mountComponent({ LOGIN })

    const githubButton = wrapper.findComponent({ ref: 'github-button' })
    expect(githubButton.props()).toMatchObject({ color: 'secondary' })
    expect(githubButton.text()).toContain('Continue with github')

    githubButton.trigger('click')
    sinon.assert.calledWithExactly(LOGIN, 'github')
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
      label: 'Password'
    })
  })
})
