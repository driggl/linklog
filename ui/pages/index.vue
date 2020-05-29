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
          <v-img
            v-if="article.author.avatarUrl"
            :src="article.author.avatarUrl"
            max-height="50"
            contain
          />
        </v-col>
        <v-col :cols="9">
          <nuxt-link :to="`/articles/${article.slug}`">
            <h2>{{ article.title }}</h2>
          </nuxt-link>
          <div>{{ article.slug }}</div>
        </v-col>
      </v-row>
    </v-container>
    <client-only>
      <infinite-loading
        spinner="spiral"
        @infinite="infiniteScroll"
      ></infinite-loading>
    </client-only>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainPage',
  computed: {
    ...mapGetters('articles', ['articles'])
  },
  created() {
    if (!this.articles.length) {
      this.FETCH_ARTICLES()
    }
  },
  methods: {
    ...mapActions('articles', ['FETCH_ARTICLES']),
    infiniteScroll($state) {
      setTimeout(async () => {
        const completed = await this.FETCH_ARTICLES()
        if (completed) {
          $state.complete()
        } else {
          $state.loaded()
        }
      }, 500)
    }
  }
}
</script>
