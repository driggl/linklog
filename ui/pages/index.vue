<template>
  <div>
    <v-layout column justify-center align-center class="teal white--text py-12">
      <div class="text-center">
        <h1>A link log for Modern Web Developers community</h1>
        <p>
          Made a library? Written a blog post? Found a useful tutorial? Share it
          with the Modern Web Developers community here or just enjoy what
          everyone else has found!
        </p>
      </div>
    </v-layout>
    <v-container>
      <v-row
        v-for="article in articles"
        :key="article.id"
        class="my-10"
        align="center"
      >
        <v-col :cols="3">
          <v-img :src="article.author.image" max-height="50" contain />
        </v-col>
        <v-col :cols="9">
          <h2>{{ article.title }}</h2>
          <div>{{ article.lead }}</div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import * as ArticlesDAO from '../lib/dao/articles-dao'

export default {
  data() {
    return {
      articles: null
    }
  },
  async created() {
    this.articles = await ArticlesDAO.getArticles()
  }
}
</script>
