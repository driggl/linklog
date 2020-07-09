import { mount, buildStore, createApp, delay } from '~/test/utils'
import ArticleDetailsPage from '@/pages/articles/_slug/index.vue'
import { getArticle } from '~/test/fixtures/articles'

describe('ArticleDetailsPage', () => {
  createApp()
  let wrapper
  async function mountComponent(config = {}) {
    wrapper = mount(ArticleDetailsPage, {
      mocks: {
        $route: {
          params: { slug: 'first-sample-article' }
        },
        $auth: {
          loggedIn: !!config.user,
          user: config.user || null
        }
      },
      stubs: ['disqus', 'v-btn'],
      store: buildStore('articles', {
        actions: {
          GET_ARTICLE: () => getArticle()
        }
      })
    })
    await wrapper.vm.$options.fetch.bind(wrapper.vm)()
  }

  test('title, author and content are displayed', async () => {
    await mountComponent()
    expect(wrapper.find('h1').text()).toEqual('First sample article')

    expect(wrapper.text()).toContain('Author: xjohn')

    expect(wrapper.find('#article-content p').text()).toContain('This is sample content')
    expect(wrapper.find('#article-content h1').text()).toContain('Header 1')
    expect(wrapper.find('#article-content h2').text()).toContain('Header 2')
  })

  test('edit and delete buttons are visible for logged in author', async () => {
    await mountComponent()
    expect(wrapper.findComponent({ ref: 'edit-article-button' }).exists()).toEqual(false)
    expect(wrapper.findComponent({ ref: 'delete-article-button' }).exists()).toEqual(false)

    await mountComponent({ user: { id: 987 } })
    expect(wrapper.findComponent({ ref: 'edit-article-button' }).exists()).toEqual(false)
    expect(wrapper.findComponent({ ref: 'delete-article-button' }).exists()).toEqual(false)

    await mountComponent({ user: { id: getArticle().author.id } })
    expect(wrapper.findComponent({ ref: 'edit-article-button' }).exists()).toEqual(true)
    expect(wrapper.findComponent({ ref: 'delete-article-button' }).exists()).toEqual(true)
  })

  test('confirmation dialog is displayed when user want to delete article', async () => {
    await mountComponent({ user: { id: getArticle().author.id } })
    expect(wrapper.findComponent({ name: 'ConfirmationDialog' }).exists()).toEqual(false)

    wrapper.findComponent({ ref: 'delete-article-button' }).vm.$emit('click')
    await delay()
    expect(wrapper.findComponent({ name: 'ConfirmationDialog' }).exists()).toEqual(true)
  })
})
