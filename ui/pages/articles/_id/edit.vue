<template>
  <v-container v-if="!loading">
    <h1 class="mb-8">Article edit</h1>
    <article-form :article="article" @save="save" />
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import ArticleForm from '~/components/ArticleForm'

export default {
  components: {
    ArticleForm
  },
  data() {
    return {
      originalArticle: null,
      article: null,
      loading: true
    }
  },

  async created() {
    this.originalArticle = await this.GET_ARTICLE(this.$route.params.id)
    this.article = { ...this.originalArticle }
    this.loading = false
  },

  methods: {
    ...mapActions('articles', ['UPDATE_ARTICLE', 'GET_ARTICLE']),
    async save() {
      await this.UPDATE_ARTICLE(this.article)
      this.$router.push(`/`)
    }
  }
}
</script>
