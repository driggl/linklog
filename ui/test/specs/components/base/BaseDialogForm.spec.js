import { mount } from '~/test/utils'
import BaseDialogForm from '@/components/base/BaseDialogForm'

describe('BaseDialogForm', () => {
  let wrapper
  function mountComponent() {
    wrapper = mount(BaseDialogForm, {
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
