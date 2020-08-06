<template>
  <v-app>
    <v-app-bar fixed app>
      <nuxt-link to="/" class="no-text-decoration">
        <v-toolbar-title class="primary--text" v-text="'WebDevFlow'" />
      </nuxt-link>
      <v-spacer />
      <v-btn v-if="!$auth.loggedIn" ref="login-button" text color="primary" @click.stop="SHOW_LOGIN_FORM">
        <v-icon>mdi-account</v-icon>
        &nbsp; Log in
      </v-btn>
      <v-btn v-if="!$auth.loggedIn" ref="register-button" color="primary" @click.stop="SHOW_REGISTRATION_FORM">
        Register
      </v-btn>
      <div v-if="user">
        Logged in as: {{ user.login }}&nbsp;&nbsp;&nbsp;
        <v-btn ref="logout-button" @click.stop="$auth.logout()">Logout</v-btn>
      </div>
      <v-col cols="1" class="d-xs-none d-sm-none d-md-flex">
        <github-ribbon />
      </v-col>
    </v-app-bar>
    <v-content>
      <v-layout column justify-center align-center class="primary white--text py-12 mb-8">
        <div class="text-center">
          <h1>A link log for Modern Web Developers community</h1>
          <p>
            Made a library? Written a blog post? Found a useful tutorial? Share it with the Modern Web Developers
            community here or just enjoy what everyone else has found!
          </p>
        </div>
      </v-layout>
      <nuxt />
    </v-content>
    <v-footer app class="py-5"> Copyright &copy; WebDevFlow {{ new Date().getFullYear() }} </v-footer>

    <login-dialog />
    <registration-dialog />

    <v-snackbar :value="!!notification" :timeout="3000" @input="HIDE_NOTIFICATION">
      {{ notification }}
      <v-btn color="primary" text @click="HIDE_NOTIFICATION">
        Close
      </v-btn>
    </v-snackbar>
    <cookies-banner v-if="!cookiesAccepted" @accepted="cookiesAccepted = true" />
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import GithubRibbon from '~/components/GithubRibbon'
import LoginDialog from '~/components/LoginDialog'
import RegistrationDialog from '~/components/RegistrationDialog'
import CookiesBanner from '~/components/CookiesBanner'

export default {
  components: {
    LoginDialog,
    GithubRibbon,
    RegistrationDialog,
    CookiesBanner
  },
  data() {
    return {
      cookiesAccepted: false
    }
  },
  computed: {
    ...mapGetters('notifications', ['notification']),
    user() {
      return this.$auth.user && { id: this.$auth.user.id, ...this.$auth.user.attributes }
    }
  },
  async beforeCreate() {
    if (process.client) {
      const token = this.$route.query.token
      if (token) {
        await this.$auth.setStrategy('local')
        await this.$auth.setUserToken(token)
        this.$router.replace('/')
      }
    }
  },
  created() {
    this.cookiesAccepted = this.$cookies.get('cookiesAccepted')
  },
  methods: {
    ...mapMutations('notifications', ['SHOW_NOTIFICATON', 'HIDE_NOTIFICATION']),
    ...mapMutations('portal', ['SHOW_LOGIN_FORM', 'SHOW_REGISTRATION_FORM'])
  }
}
</script>

<style lang="scss">
a {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.no-text-decoration {
  text-decoration: none !important;
}
</style>
