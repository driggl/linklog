<template>
  <div>
    <v-container v-if="$auth.loggedIn" class="text-center">
      <v-btn outlined @click="$router.push(`/articles/new`)">
        <v-icon color="teal">mdi-plus</v-icon>&nbsp;Add article
      </v-btn>
    </v-container>
    <v-container>
      <v-row v-for="article in articles" :key="article.id" class="my-10" align="center">
        <v-col :cols="3">
          <v-img v-if="article.author.avatarUrl" :src="article.author.avatarUrl" max-height="50" contain />
        </v-col>
        <v-col :cols="$auth.loggedIn ? 8 : 9">
          <nuxt-link :to="`/articles/${article.slug}`" class="article-link">
            <h2>{{ article.title }}</h2>
          </nuxt-link>
          <div v-html="marked(article.excerpt)"></div>
        </v-col>
        <v-col v-if="$auth.loggedIn && article.author.id === $auth.user.id" :cols="1">
          <nuxt-link :to="`/articles/${article.id}/edit`" class="icon-link">
            <v-icon>mdi-pencil</v-icon>
          </nuxt-link>
          <a class="icon-link" @click.prevent="articleToDelete = article">
            <v-icon>mdi-delete</v-icon>
          </a>
        </v-col>
      </v-row>
    </v-container>
    <client-only>
      <infinite-loading spinner="spiral" @infinite="infiniteScroll"></infinite-loading>
    </client-only>
    <confirmation-dialog
      v-if="articleToDelete"
      :visible="!!articleToDelete"
      title="Delete article"
      :text="`Are you sure you want to delete article '${articleToDelete.title}'`"
      @cancel="articleToDelete = null"
      @confirm="deleteArticle"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import marked from 'marked'
import ConfirmationDialog from '~/components/ConfirmationDialog'

export default {
  name: 'MainPage',
  components: {
    ConfirmationDialog
  },
  async fetch() {
    if (!this.articles.length) {
      await this.FETCH_ARTICLES()
    }
  },
  data() {
    return {
      articleToDelete: null
    }
  },
  computed: {
    ...mapGetters('articles', ['articles'])
  },
  methods: {
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
      await this.DELETE_ARTICLE(this.articleToDelete.id)
      this.articleToDelete = null
    },
    marked
  }
}
</script>

<style scoped>
.article-link {
  color: #000000;
  margin-bottom: 10px;
  display: inline-block;
  text-decoration: none;
}

.article-link:hover {
  text-decoration: underline;
}

.icon-link {
  text-decoration: none;
}

.icon-link:hover i {
  color: #000000 !important;
}
</style>
