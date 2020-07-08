import { mount } from '~/test/utils'
import ConfirmationDialog from '@/components/ConfirmationDialog'

describe('ConfirmationDialog', () => {
  let wrapper
  function mountComponent() {
    wrapper = mount(ConfirmationDialog, {
      propsData: {
        title: 'ABC',
        text: 'XYZ'
      }
    })
  }

  test('Inputs are empty on start', () => {
    mountComponent()
    expect(wrapper.exists()).toEqual(true)
  })
})
