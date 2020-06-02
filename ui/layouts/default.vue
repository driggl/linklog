<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-toolbar-title class="teal--text" v-text="'WebDevFlow'" />
      <v-spacer />
      <v-btn icon hidden @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn
        v-if="!userLoggedIn"
        text
        color="teal"
        @click.stop="loginFormDisplayed = true"
      >
        <v-icon>mdi-account</v-icon>
        &nbsp; Log in
      </v-btn>
      <div v-else-if="user">
        Logged in as: {{ user.login }}&nbsp;&nbsp;&nbsp;
        <v-btn @click.stop="LOGOUT">Logout</v-btn>
      </div>
    </v-app-bar>
    <v-content>
      <v-layout
        column
        justify-center
        align-center
        class="teal white--text py-12 mb-8"
      >
        <div class="text-center">
          <h1>A link log for Modern Web Developers community</h1>
          <p>
            Made a library? Written a blog post? Found a useful tutorial? Share
            it with the Modern Web Developers community here or just enjoy what
            everyone else has found!
          </p>
        </div>
      </v-layout>
      <nuxt />
    </v-content>
    <v-footer app class="py-5">
      Copyright &copy; WebDevFlow {{ new Date().getFullYear() }}
    </v-footer>

    <login-dialog :visible.sync="loginFormDisplayed" />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoginDialog from '~/components/LoginDialog'

export default {
  components: {
    LoginDialog
  },
  data() {
    return {
      drawer: false,
      loginFormDisplayed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('user', ['userLoggedIn', 'user'])
  },
  methods: {
    ...mapActions('user', ['LOAD_USER', 'LOGOUT'])
  },

  created() {
    this.LOAD_USER()
  }
}
</script>
