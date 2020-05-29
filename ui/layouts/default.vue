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
      <div v-else-if="user">Logged in as: {{ user.login }}</div>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer app class="py-5">
      Copyright &copy; WebDevFlow {{ new Date().getFullYear() }}
    </v-footer>

    <login-dialog :visible.sync="loginFormDisplayed" />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
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
  }
}
</script>
