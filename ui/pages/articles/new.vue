<template>
  <v-container>
    <h1 class="mb-8">Create new article</h1>
    <article-form :article="article" :progress="saveInProgress" @save="save" />
  </v-container>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import ArticleForm from '~/components/ArticleForm'

export default {
  components: {
    ArticleForm
  },
  data() {
    return {
      saveInProgress: false,
      article: {
        title: '',
        content: ''
      }
    }
  },

  methods: {
    ...mapMutations('notifications', ['SHOW_NOTIFICATON']),
    ...mapActions('articles', ['CREATE_ARTICLE']),
    async save() {
      this.saveInProgress = true
      await this.CREATE_ARTICLE(this.article)
      this.SHOW_NOTIFICATON(`Article "${this.article.title}" successfully created`)
      this.saveInProgress = false
      this.$router.push(`/`)
    }
  }
}
</script>
