import { createApp, mount } from '~/test/utils'
import ConfirmationDialog from '@/components/ConfirmationDialog'

describe('ConfirmationDialog', () => {
  createApp()
  let wrapper
  function mountComponent() {
    wrapper = mount(ConfirmationDialog, {
      propsData: {
        title: 'ABC',
        text: 'XYZ',
        visible: true
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
    ).toEqual('ABC')
  })

  test('Contains message', () => {
    mountComponent()
    expect(
      wrapper
        .find('.v-card')
        .find('.v-card__text')
        .text()
    ).toEqual('XYZ')
  })

  test('Contains cancel button', () => {
    mountComponent()
    const cancelButton = wrapper.findComponent({ ref: 'cancel-button' })
    expect(cancelButton.text()).toEqual('Cancel')
    cancelButton.trigger('click')
    expect(wrapper.emitted('cancel').length).toEqual(1)
  })

  test('Contains confirm button', () => {
    mountComponent()
    const confirmButton = wrapper.findComponent({ ref: 'confirm-button' })
    expect(confirmButton.text()).toEqual('Yes')
    confirmButton.trigger('click')
    expect(wrapper.emitted('confirm').length).toEqual(1)
  })
})
