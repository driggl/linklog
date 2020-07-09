import { mount } from '~/test/utils'
import ArticleListItem from '@/components/ArticleListItem'
import { getArticle } from '~/test/fixtures/articles'
import { getUser } from '~/test/fixtures/user'

describe('ArticleListItem', () => {
  let wrapper
  function mountComponent(config = {}) {
    wrapper = mount(ArticleListItem, {
      mocks: {
        $auth: {
          loggedIn: !!config.user,
          user: config.user || null
        }
      },
      propsData: {
        article: getArticle()
      }
    })
  }

  test('Contains author avatar', () => {
    mountComponent()
    expect(
      wrapper
        .findComponent({ name: 'v-list-item-avatar' })
        .findComponent({ name: 'v-img' })
        .props()
    ).toMatchObject({
      src: 'https://robohash.org/mario_paucek.png'
    })
  })

  test('Contains article title as a link to article details page', () => {
    const titleComponent = wrapper.findComponent({ ref: 'article-title' })
    expect(titleComponent.text()).toEqual('First sample article')
    expect(titleComponent.attributes()).toMatchObject({
      to: '/articles/first-sample-article'
    })
  })

  test('Contains information about author', () => {
    expect(wrapper.text()).toContain('Author: xjohn')
  })

  test('Contains article excerpt', () => {
    expect(wrapper.find('.article-excerpt').text()).toEqual('This is sample content')
  })

  test('Contains "read more" link', () => {
    expect(wrapper.findComponent({ ref: 'read-more-button' }).text()).toEqual('Read more')
    expect(wrapper.findComponent({ ref: 'read-more-button' }).props()).toMatchObject({
      to: '/articles/first-sample-article',
      color: 'primary'
    })
  })

  test('Contains edit and delete buttons when user is logged in and is author of article', () => {
    mountComponent()
    expect(wrapper.findComponent({ ref: 'edit-button' }).exists()).toEqual(false)
    expect(wrapper.findComponent({ ref: 'delete-button' }).exists()).toEqual(false)

    mountComponent({ user: getUser() })
    expect(wrapper.findComponent({ ref: 'edit-button' }).exists()).toEqual(false)
    expect(wrapper.findComponent({ ref: 'delete-button' }).exists()).toEqual(false)

    mountComponent({ user: getUser(getArticle().author.id) })
    expect(wrapper.findComponent({ ref: 'edit-button' }).props()).toMatchObject({
      to: '/articles/first-sample-article/edit'
    })
    expect(wrapper.findComponent({ ref: 'delete-button' }).exists()).toEqual(true)
  })
})
