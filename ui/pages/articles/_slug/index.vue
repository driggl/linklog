<template>
  <v-container v-if="article">
    <v-row>
      <v-col :cols="hasWriteAccess ? 10 : 12">
        <h1 class="mb-8">{{ article.title }}</h1>
      </v-col>
      <v-col v-if="hasWriteAccess" :cols="2" align="right">
        <v-btn :to="`/articles/${article.slug}/edit`" icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="showDeleteConfirmation = true">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <div v-if="article.content" id="article-content" v-html="marked(article.content)"></div>

    <disqus
      shortname="web-dev-flow"
      :identifier="'article-' + article.id"
      :url="'https://webdevflow.com/articles/' + article.slug"
      :title="article.title"
    />

    <confirmation-dialog
      v-if="showDeleteConfirmation"
      :visible.sync="showDeleteConfirmation"
      title="Delete article"
      :text="`Are you sure you want to delete article '${article.title}'`"
      :progress="deleteInProgress"
      @cancel="showDeleteConfirmation = false"
      @confirm="deleteArticle"
    />
  </v-container>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import marked from 'marked'
import ConfirmationDialog from '~/components/ConfirmationDialog'

export default {
  components: {
    ConfirmationDialog
  },
  async fetch() {
    this.article = await this.GET_ARTICLE(this.$route.params.slug)
  },

  data() {
    return {
      article: null,
      showDeleteConfirmation: false,
      deleteInProgress: false
    }
  },

  computed: {
    hasWriteAccess() {
      return this.$auth.loggedIn && this.article.author.id === this.$auth.user.id
    }
  },

  methods: {
    ...mapMutations('notifications', ['SHOW_NOTIFICATON']),
    ...mapActions('articles', ['GET_ARTICLE', 'DELETE_ARTICLE']),
    async deleteArticle() {
      this.deleteInProgress = true
      await this.DELETE_ARTICLE(this.article.id)
      this.SHOW_NOTIFICATON(`Article "${this.article.title}" successfully deleted`)
      this.deleteInProgress = false
      this.$router.push(`/`)
    },
    marked
  }
}
</script>
