import { mount } from '~/test/utils'
import { getArticle } from '~/test/fixtures/articles'
import ArticleForm from '@/components/ArticleForm'

describe('ArticleForm', () => {
  let wrapper
  function mountComponent() {
    wrapper = mount(ArticleForm, {
      propsData: {
        article: getArticle(),
        progress: false
      }
    })
  }

  test('Contains input field for article title', () => {
    mountComponent()
    expect(wrapper.findComponent({ ref: 'title-input' }).props()).toMatchObject({
      value: 'First sample article',
      label: 'Title'
    })
  })

  test('Contains textarea field for article content', () => {
    mountComponent()
    expect(wrapper.findComponent({ ref: 'content-input' }).props()).toMatchObject({
      value: 'This is sample content\n\n# Header 1\n\n## Header 2',
      label: 'Content',
      autoGrow: true
    })
  })

  test('Contains cancel button', () => {
    mountComponent()
    const cancelButton = wrapper.findComponent({ ref: 'cancel-button' })
    expect(cancelButton.text()).toEqual('Cancel')
    expect(cancelButton.props()).toMatchObject({
      to: '/'
    })
  })

  test('Contains save button', () => {
    mountComponent()
    const saveButton = wrapper.findComponent({ ref: 'save-button' })
    expect(saveButton.text()).toEqual('Save')
    expect(saveButton.props()).toMatchObject({
      type: 'submit',
      color: 'primary',
      loading: false
    })
  })

  test('Emits "save" event during submition', () => {
    mountComponent()
    wrapper.findComponent({ name: 'v-form' }).trigger('submit')
    expect(wrapper.emitted('save').length).toEqual(1)
  })
})
