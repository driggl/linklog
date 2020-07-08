import { mount } from '~/test/utils'
import ArticleListItem from '@/components/ArticleListItem'

describe('ArticleListItem', () => {
  let wrapper
  function mountComponent() {
    wrapper = mount(ArticleListItem, {
      mocks: {
        $auth: {
          loggedIn: true,
          user: {
            id: 56
          }
        }
      },
      propsData: {
        article: {
          id: 22,
          title: 'Lorem ipsum',
          slug: 'lorem-ipsum',
          content: 'This is sample content',
          excerpt: 'This is sample content',
          createdAt: '07-07-2020',
          author: {
            id: 56,
            login: 'lusarz',
            avatarUrl: 'http://authenticgoods.co/wrapbootstrap/themes/sparks/img/team/avatar-male.png'
          }
        }
      }
    })
  }

  test('Is vue instance', () => {
    mountComponent()
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
