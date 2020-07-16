import sinon from 'sinon'
import { mount, buildStores, delay } from '~/test/utils'
import ArticleEditPage from '@/pages/articles/_slug/edit.vue'
import { getArticle } from '~/test/fixtures/articles'

describe('ArticleEditPage', () => {
  let wrapper
  async function mountComponent(config = {}) {
    wrapper = mount(ArticleEditPage, {
      mocks: {
        $route: {
          params: { slug: 'Sample article title' }
        },
        $router: {
          push: config.ROUTER_PUSH || (() => {})
        }
      },
      store: buildStores([
        {
          name: 'articles',
          actions: {
            GET_ARTICLE: () => getArticle(),
            UPDATE_ARTICLE: config.UPDATE_ARTICLE || (() => {})
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

    await delay()
  }

  test('Article form is displayed', async () => {
    await mountComponent()
    expect(wrapper.findComponent({ name: 'ArticleForm' }).props()).toEqual({
      article: getArticle(),
      progress: false,
      error: null
    })
  })

  test('After successful save notification is displayed and user is redirecte', async () => {
    const UPDATE_ARTICLE = sinon.stub()
    const SHOW_NOTIFICATON = sinon.stub()
    const ROUTER_PUSH = sinon.stub()
    await mountComponent({ UPDATE_ARTICLE, SHOW_NOTIFICATON, ROUTER_PUSH })
    wrapper.findComponent({ name: 'ArticleForm' }).vm.$emit('save')
    await delay()

    sinon.assert.calledOnce(UPDATE_ARTICLE)
    sinon.assert.calledOnce(SHOW_NOTIFICATON)
    sinon.assert.calledWith(ROUTER_PUSH, `/`)
  })
})
