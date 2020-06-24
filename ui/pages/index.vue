<template>
  <v-container>
    <div v-if="$auth.loggedIn" class="text-center">
      <v-btn text color="primary" to="/articles/new">
        <v-icon color="primary">mdi-plus-circle</v-icon>&nbsp;New post
      </v-btn>
    </div>
    <v-list>
      <article-list-item
        v-for="article in articles"
        :key="article.id"
        class="my-10"
        :article="article"
        @delete="articleToDelete = article"
      />
    </v-list>
    <client-only>
      <infinite-loading spinner="spiral" @infinite="infiniteScroll"></infinite-loading>
    </client-only>
    <confirmation-dialog
      v-if="articleToDelete"
      :visible="!!articleToDelete"
      title="Delete article"
      :text="`Are you sure you want to delete article '${articleToDelete.title}'`"
      :progress="deleteInProgress"
      @cancel="articleToDelete = null"
      @confirm="deleteArticle"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import ConfirmationDialog from '~/components/ConfirmationDialog'
import ArticleListItem from '~/components/ArticleListItem'

export default {
  name: 'MainPage',
  components: {
    ConfirmationDialog,
    ArticleListItem
  },
  async fetch() {
    if (!this.articles.length) {
      await this.FETCH_ARTICLES()
    }
  },
  data() {
    return {
      articleToDelete: null,
      deleteInProgress: false
    }
  },
  computed: {
    ...mapGetters('articles', ['articles'])
  },
  methods: {
    ...mapMutations('notifications', ['SHOW_NOTIFICATON']),
    ...mapActions('articles', ['FETCH_ARTICLES', 'DELETE_ARTICLE']),
    infiniteScroll($state) {
      setTimeout(async () => {
        const completed = await this.FETCH_ARTICLES()
        if (completed) {
          $state.complete()
        } else {
          $state.loaded()
        }
      }, 500)
    },
    async deleteArticle() {
      this.deleteInProgress = true
      await this.DELETE_ARTICLE(this.articleToDelete.id)
      this.SHOW_NOTIFICATON(`Article ${this.articleToDelete.title} successfully deleted`)
      this.articleToDelete = null
      this.deleteInProgress = false
    }
  },
  head: {
    title: 'Recent Articles',
    titleTemplate: '%s | WebDevFlow - a Linklog for Modern Web Developers',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Get the hot news from the Modern Web Developers community!',
        titleTemplate: null
      },
      {
        hid: 'author',
        name: 'author',
        content: 'Driggl - https://github.com/driggl'
      },
      {
        property: 'og:title',
        content: 'Recent articles',
        vmid: 'og:title'
      },
      {
        property: 'og:description',
        content: 'Newest content from web Professionals and the Modern web development Community!',
        vmid: 'og:description'
      },
      {
        property: 'og:image',
        content: '/home-cover.jpg',
        vmid: 'og:image'
      },
      { property: 'og:type', content: 'website' }
    ]
  }
}
</script>
