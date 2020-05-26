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
            src="https://www.tm-town.com/assets/default_male600x600-79218392a28f78af249216e097aaf683.png"
            max-height="50"
            contain
          />
        </v-col>
        <v-col :cols="9">
          <h2>{{ article.attributes.title }}</h2>
          <div>{{ article.attributes.slug }}</div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('articles', ['articles'])
  },
  created() {
    this.FETCH_ARTICLES()
  },
  methods: {
    ...mapActions('articles', ['FETCH_ARTICLES'])
  }
}
</script>
