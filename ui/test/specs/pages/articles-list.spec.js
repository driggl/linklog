import { shallow, buildStore, delay } from '~/test/utils'
import { getArticles } from '~/test/fixtures/articles'
import MainPage from '@/pages/index.vue'

describe('Main page', () => {
  let wrapper
  function mountComponent(config = {}) {
    wrapper = shallow(MainPage, {
      mocks: {
        $auth: {
          loggedIn: config.loggedIn || false
        }
      },
      store: buildStore('articles', {
        getters: {
          articles: () => getArticles(),
          todayArticles: () => config.todayArticles || [],
          olderArticles: () => config.olderArticles || getArticles()
        },
        actions: {
          FETCH_ARTICLES: () => {}
        }
      })
    })
  }

  test('All articles are rendered in single list when no article was created today', () => {
    mountComponent()
    const lists = wrapper.findAllComponents({ name: 'v-list' }).wrappers
    expect(lists.length).toEqual(1)
    expect(lists[0].findAllComponents({ name: 'ArticleListItem' }).wrappers).toHaveLength(4)
  })

  test('Articles are grouped when any article was created today', () => {
    mountComponent({
      todayArticles: getArticles({ start: 0, end: 2 }),
      olderArticles: getArticles({ start: 2 })
    })
    const lists = wrapper.findAllComponents({ name: 'v-list' }).wrappers
    expect(lists.length).toEqual(2)

    expect(lists[0].find('.group-title').text()).toEqual('Today')
    expect(lists[0].findAllComponents({ name: 'ArticleListItem' }).wrappers).toHaveLength(2)

    expect(lists[1].find('.group-title').text()).toEqual('Older')
    expect(lists[1].findAllComponents({ name: 'ArticleListItem' }).wrappers).toHaveLength(2)
  })

  test('Confirmation dialog is displayed when user wants to delete specific article', async () => {
    mountComponent()
    expect(wrapper.findComponent({ name: 'ConfirmationDialog' }).exists()).toEqual(false)

    wrapper.findComponent({ name: 'ArticleListItem' }).vm.$emit('delete')
    await delay()
    expect(wrapper.findComponent({ name: 'ConfirmationDialog' }).exists()).toEqual(true)

    wrapper.findComponent({ name: 'ConfirmationDialog' }).vm.$emit('cancel')
    await delay()
    expect(wrapper.findComponent({ name: 'ConfirmationDialog' }).exists()).toEqual(false)
  })

  test('"New post" button opens login dialog when user is not logged in', () => {
    mountComponent()
    const button = wrapper.findComponent({ ref: 'new-post-button' })

    expect(button.text()).toContain('New post')
  })
})
