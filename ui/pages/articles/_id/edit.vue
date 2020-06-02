<template>
  <div v-if="!loading">
    <v-container>
      <h1 class="mb-8">Article edit</h1>
      <v-form>
        <div>
          <v-text-field v-model="article.title" label="Title" />
        </div>
        <div>
          <v-textarea v-model="article.content" label="Content" />
        </div>
        <div class="text-right">
          <v-btn @click="save">Save</v-btn>
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
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
