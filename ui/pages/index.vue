<template>
  <div>
    <v-container v-if="userLoggedIn" class="text-center">
      <v-btn outlined @click="$router.push(`/articles/new`)">
        <v-icon color="teal">mdi-plus</v-icon>&nbsp;Add article
      </v-btn>
    </v-container>
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
        <v-col :cols="userLoggedIn ? 8 : 9">
          <nuxt-link :to="`/articles/${article.slug}`">
            <h2>{{ article.title }}</h2>
          </nuxt-link>
          <div>{{ article.slug }}</div>
        </v-col>
        <v-col v-if="userLoggedIn" :cols="1">
          <nuxt-link :to="`/articles/${article.id}/edit`">
            <v-icon>mdi-pencil</v-icon>
          </nuxt-link>
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
    ...mapGetters('articles', ['articles']),
    ...mapGetters('user', ['userLoggedIn'])
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
