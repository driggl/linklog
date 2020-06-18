<template>
  <v-container v-if="article">
    <h1 class="mb-8">{{ article.title }}</h1>
    <div v-if="article.content" id="article-content" v-html="marked(article.content)"></div>

    <disqus
      shortname="web-dev-flow"
      :identifier="'article-' + article.id"
      :url="'https://webdevflow.com/articles/' + article.slug"
      :title="article.title"
    />
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import marked from 'marked'

export default {
  async fetch() {
    this.article = await this.GET_ARTICLE(this.$route.params.slug)
  },

  data() {
    return {
      article: null
    }
  },

  methods: {
    ...mapActions('articles', ['GET_ARTICLE']),
    marked
  }
}
</script>
