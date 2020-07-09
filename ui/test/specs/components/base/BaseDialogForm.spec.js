import sinon from 'sinon'
import { createApp, delay, mount } from '~/test/utils'
import BaseDialogForm from '@/components/base/BaseDialogForm'

describe('BaseDialogForm', () => {
  createApp()
  let wrapper
  function mountComponent(config = {}) {
    wrapper = mount(BaseDialogForm, {
      propsData: {
        title: 'Dialog form',
        submitTitle: 'Submit',
        visible: true,
        submit: config.SUBMIT || (() => {})
      }
    })
  }

  test('Contains title', () => {
    mountComponent()
    expect(
      wrapper
        .find('.v-card')
        .find('.v-card__title')
        .text()
    ).toEqual('Dialog form')
  })

  test('Contains submit button', () => {
    mountComponent()
    const submitButton = wrapper.findComponent({ ref: 'submit-button' })
    expect(submitButton.text()).toEqual('Submit')
  })

  test('"hide" event is emitted after successful submit', async () => {
    const SUBMIT = sinon.stub()
    mountComponent({ SUBMIT })
    wrapper.findComponent({ name: 'v-form' }).trigger('submit')
    await delay()
    sinon.assert.calledOnce(SUBMIT)
    expect(wrapper.find('.error-message').exists()).toEqual(false)
    expect(wrapper.emitted('hide').length).toEqual(1)
  })

  test('Error message is displayed after unsuccessful submit', async () => {
    mountComponent()
    expect(wrapper.find('.error-message').exists()).toEqual(false)

    const SUBMIT = sinon.stub().throws({ response: { data: { errors: [{ title: 'Error', detail: 'detail' }] } } })
    mountComponent({ SUBMIT })
    wrapper.findComponent({ name: 'v-form' }).trigger('submit')
    await delay()
    expect(wrapper.find('.error-message').text()).toEqual('Error - detail')
  })

  test('Error message is removed after re-show of dialog', async () => {
    expect(wrapper.find('.error-message').exists()).toEqual(true)
    wrapper.setProps({ visible: false })
    await delay()
    wrapper.setProps({ visible: true })
    await delay()
    expect(wrapper.find('.error-message').exists()).toEqual(false)
  })
})
