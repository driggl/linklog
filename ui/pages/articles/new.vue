<template>
  <v-container>
    <h1 class="mb-8">Create new article</h1>
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
      article: {
        title: '',
        content: ''
      }
    }
  },

  methods: {
    ...mapActions('articles', ['CREATE_ARTICLE']),
    async save() {
      await this.CREATE_ARTICLE(this.article)
      this.$router.push(`/`)
    }
  }
}
</script>
