<template>
  <div>
    <v-container>
      <h1 class="mb-10">{{ article.title }}</h1>
      <div
        v-if="article.content"
        id="article-content"
        v-html="marked(article.content)"
      ></div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import marked from 'marked'

export default {
  data() {
    return {
      article: null
    }
  },

  computed: {
    ...mapGetters('articles', ['findArticle'])
  },

  created() {
    this.article = this.findArticle(this.$route.params.slug)
  },

  methods: {
    marked
  }
}
</script>
