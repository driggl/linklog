<template>
  <div>
    <v-layout column justify-center align-center class="teal white--text py-12">
      <div class="text-center">
        <h1>A link log for Modern Web Developers community</h1>
        <p>
          Made a library ? Written a blog post ? Found a useful tutorial ? Share
          it with the Frontend Developers community here or just enjoy what
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
export default {
  data() {
    return {
      articles: [
        {
          id: 1,
          title: 'Serverless Ruby on AWS Lambda with the Jets Framework',
          lead:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consequatur debitis dignissimos dolor expedita laboriosam mollitia odit perspiciatis, quisquam quos temporibus vero. At eveniet ex neque qui vel voluptates!',
          author: {
            nick: 'krystian50',
            image:
              'https://www.tm-town.com/assets/default_male600x600-79218392a28f78af249216e097aaf683.png'
          }
        },
        {
          id: 2,
          title: 'Serverless Ruby on AWS Lambda with the Jets Framework',
          lead:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consequatur debitis dignissimos dolor expedita laboriosam mollitia odit perspiciatis, quisquam quos temporibus vero. At eveniet ex neque qui vel voluptates!',
          author: {
            nick: 'krystian50',
            image:
              'https://www.tm-town.com/assets/default_male600x600-79218392a28f78af249216e097aaf683.png'
          }
        }
      ]
    }
  }
}
</script>
