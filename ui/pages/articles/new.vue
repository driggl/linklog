<template>
  <div>
    <v-container>
      <h1 class="mb-8">Create new article</h1>
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
