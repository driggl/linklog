<template>
  <v-list-item>
    <v-list-item-avatar height="64" width="64">
      <v-img :src="article.author.avatarUrl || '/images/user-placeholder.jpg'" />
    </v-list-item-avatar>
    <v-list-item-content>
      <nuxt-link ref="article-title" :to="`/articles/${article.slug}`" class="article-title">
        {{ article.title }}
      </nuxt-link>
      <div class="mb-5"><strong>Author: </strong>{{ article.author.login }}</div>
      <div class="article-excerpt" v-html="marked(article.excerpt)"></div>
      <div>
        <v-btn ref="read-more-button" :to="`/articles/${article.slug}`" color="primary">Read more</v-btn>
      </div>
    </v-list-item-content>
    <template v-if="$auth.loggedIn && article.author.id === $auth.user.id">
      <v-list-item-action>
        <v-btn ref="edit-button" :to="`/articles/${article.slug}/edit`" icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-action>
        <v-btn ref="delete-button" icon @click="$emit('delete')">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script>
import marked from 'marked'

export default {
  name: 'ArticleListItem',
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
  color: $dark1 !important;
  font-size: 24px;
  font-weight: bold;
}

.article-excerpt {
  line-height: 1.5;
  font-weight: 300;
}
</style>
