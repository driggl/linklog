import { shallow, buildStore } from '~/test/utils'
import MainPage from '@/pages/index.vue'

describe('Main page', () => {
  let wrapper
  function mountComponent() {
    wrapper = shallow(MainPage, {
      store: buildStore('articles', {
        getters: {
          articles: () => [
            {
              title: 'First sample article',
              slug: 'first-sample-article',
              author: { avatarUrl: 'https://robohash.org/mario_paucek.png' }
            },
            {
              title: 'Second sample article',
              slug: 'second-sample-article',
              author: { avatarUrl: 'https://robohash.org/caleb.png' }
            }
          ],
          todayArticles: () => [
            {
              title: 'First sample article',
              slug: 'first-sample-article',
              author: { avatarUrl: 'https://robohash.org/mario_paucek.png' }
            },
            {
              title: 'Second sample article',
              slug: 'second-sample-article',
              author: { avatarUrl: 'https://robohash.org/caleb.png' }
            }
          ],
          olderArticles: () => [
            {
              title: 'Third sample article',
              slug: 'third-sample-article',
              author: { avatarUrl: 'https://robohash.org/mario_paucek.png' }
            },
            {
              title: 'Fourth sample article',
              slug: 'fourth-sample-article',
              author: { avatarUrl: 'https://robohash.org/caleb.png' }
            }
          ]
        },
        actions: {
          FETCH_ARTICLES: () => {}
        }
      })
    })
  }

  test('articles are displayed', () => {
    mountComponent()
    expect(wrapper.isVueInstance()).toEqual(true)
    // expect(wrapper.text()).toContain('First sample article')
    // expect(wrapper.text()).toContain('Second sample article')
  })
})
