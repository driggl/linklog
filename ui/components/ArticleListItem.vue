<template>
  <v-list-item :to="`/articles/${article.slug}`">
    <v-list-item-avatar height="64" width="64">
      <v-img :src="article.author.avatarUrl || '/images/user-placeholder.jpg'" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="article-title">{{ article.title }}</v-list-item-title>
      <div class="article-excerpt" v-html="marked(article.excerpt)"></div>
      <div class="mt-5"><strong>Author: </strong>{{ article.author.login }}</div>
    </v-list-item-content>
    <template v-if="$auth.loggedIn && article.author.id === $auth.user.id">
      <v-list-item-action>
        <v-btn :to="`/articles/${article.slug}/edit`" icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-action>
        <v-btn icon @click.prevent.stop="$emit('delete')">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script>
import marked from 'marked'

export default {
  props: {
    article: {
      type: Object,
      default: null
    }
  },

  methods: {
    marked
  }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.article-title {
  color: $dark1;
  margin-bottom: 15px !important;
  font-size: 24px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
}

.article-excerpt {
  line-height: 1.5;
  font-weight: 300;
}
</style>
