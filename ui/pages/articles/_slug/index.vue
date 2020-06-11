<template>
  <div v-if="article">
    <v-container>
      <h1 class="mb-10">{{ article.title }}</h1>
      <div v-if="article.content" id="article-content" v-html="marked(article.content)"></div>
    </v-container>
    <v-container>
      <disqus
        shortname="webdevflow"
        :identifier="'article-' + article.id + '-v2'"
        :url="'https://webdevflow.com/articles/' + article.slug + '?comments-version=2'"
        :title="article.title"
      />
    </v-container>
  </div>
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
