import { mount } from '~/test/utils'
import DefaultLayout from '@/layouts/default.vue'

describe('Default layout', () => {
  let wrapper
  function mountComponent() {
    wrapper = mount(DefaultLayout)
  }

  test('Menu contains appropriate items', () => {
    mountComponent()
    expect(
      wrapper.findAll('.v-list-item').wrappers.map((w) => w.text())
    ).toEqual(['Welcome'])
  })
})
