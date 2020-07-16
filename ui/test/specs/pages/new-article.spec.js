import sinon from 'sinon'
import { mount, buildStores, delay } from '~/test/utils'
import NewArticlePage from '@/pages/articles/new.vue'

describe('NewArticlePage', () => {
  let wrapper
  async function mountComponent(config = {}) {
    wrapper = mount(NewArticlePage, {
      mocks: {
        $router: {
          push: config.ROUTER_PUSH || (() => {})
        }
      },
      store: buildStores([
        {
          name: 'articles',
          actions: {
            CREATE_ARTICLE: config.CREATE_ARTICLE || (() => {})
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
      article: { title: '', content: '' },
      progress: false,
      error: null
    })
  })

  test('After successful save notification is displayed and user is redirected', async () => {
    const CREATE_ARTICLE = sinon.stub()
    const SHOW_NOTIFICATON = sinon.stub()
    const ROUTER_PUSH = sinon.stub()
    await mountComponent({ CREATE_ARTICLE, SHOW_NOTIFICATON, ROUTER_PUSH })
    wrapper.findComponent({ name: 'ArticleForm' }).vm.$emit('save')
    await delay()

    sinon.assert.calledOnce(CREATE_ARTICLE)
    sinon.assert.calledOnce(SHOW_NOTIFICATON)
    sinon.assert.calledWith(ROUTER_PUSH, `/`)
  })
})
