<template>
  <v-container>
    <div class="text-center">
      <v-btn text color="primary" @click="onAddArticleClicked">
        <v-icon color="primary">mdi-plus-circle</v-icon>&nbsp;New post
      </v-btn>
    </div>
    <v-list v-if="todayArticles.length">
      <div v-if="todayArticles.length" class="group-title">Today</div>
      <article-list-item
        v-for="article in todayArticles"
        :key="article.id"
        class="my-10"
        :article="article"
        @delete="articleToDelete = article"
      />
    </v-list>
    <v-list>
      <div v-if="todayArticles.length" class="group-title">Older</div>
      <article-list-item
        v-for="article in olderArticles"
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
    ...mapGetters('articles', ['todayArticles', 'olderArticles'])
  },
  methods: {
    ...mapMutations('notifications', ['SHOW_NOTIFICATON']),
    ...mapActions('articles', ['FETCH_ARTICLES', 'DELETE_ARTICLE']),
    ...mapMutations('portal', ['SHOW_LOGIN_FORM']),
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
    },
    onAddArticleClicked() {
      if (this.$auth.loggedIn) {
        this.$router.push('/articles/new')
      } else {
        this.SHOW_LOGIN_FORM()
      }
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

<style lang="scss" scoped>
.group-title {
  font-size: 22px;
  font-weight: bold;
}
</style>
