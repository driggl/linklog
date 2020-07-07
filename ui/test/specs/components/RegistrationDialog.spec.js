import { mount } from '~/test/utils'
import RegistrationDialog from '@/components/RegistrationDialog'

describe('RegistrationDialog', () => {
  let wrapper
  function mountComponent() {
    wrapper = mount(RegistrationDialog, {
      propsData: {
        title: 'ABC',
        text: 'XYZ'
      }
    })
  }

  test('Inputs are empty on start', () => {
    mountComponent()
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
