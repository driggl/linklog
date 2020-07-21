<template>
  <base-dialog-form
    :visible="loginFormDisplayed"
    title="Login"
    submit-title="Log in"
    :submit="login"
    @hide="HIDE_LOGIN_FORM"
  >
    <div slot="header" class="text-center my-3">
      <v-btn ref="github-button" color="secondary" @click="startGithubAuthentication">
        <v-icon>mdi-github</v-icon>&nbsp;&nbsp;Continue with github
      </v-btn>
    </div>
    <v-text-field ref="login-input" v-model="form.login" :rules="[rules.required]" label="Login" />
    <v-text-field
      ref="password-input"
      v-model="form.password"
      :rules="[rules.required, rules.minLength]"
      label="Password"
      type="password"
    />
    <span slot="footer">Don't have account? <a @click.prevent="SHOW_REGISTRATION_FORM">Register</a></span>
  </base-dialog-form>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import BaseDialogForm from '~/components/base/BaseDialogForm'
import * as ValidationUtils from '~/lib/utils/validation-utils'

export default {
  components: {
    BaseDialogForm
  },
  data() {
    return {
      form: {
        login: '',
        password: ''
      },
      rules: {
        required: (v) => ValidationUtils.isNotEmpty(v) || 'This field is required',
        minLength: (v) => v.length > 4 || 'This field need to have at least 5 characters'
      }
    }
  },
  computed: {
    ...mapGetters('portal', ['loginFormDisplayed'])
  },
  watch: {
    visible() {
      Object.assign(this.form, { login: '', password: '' })
    }
  },

  methods: {
    ...mapMutations('notifications', ['SHOW_NOTIFICATON']),
    ...mapMutations('portal', ['HIDE_LOGIN_FORM', 'SHOW_REGISTRATION_FORM']),
    async login() {
      const data = {
        data: {
          attributes: this.form
        }
      }
      await this.$auth.loginWith('local', { data })
      this.SHOW_NOTIFICATON(`Logged in as ${this.form.login}`)
    },
    startGithubAuthentication() {
      const clientId = process.env.GITHUB_ID || 'd1e3f0561f73a4d70cf0'
      const clientSecret = process.env.GITHUB_SECRET || 'bec2bb82948ac03e5b4fad71f06f0ea165333ea9'
      const redirectUri = process.env.GITHUB_REDIRECT_URI || 'http://localhost:3000/auth/callback'
      window.location = `https://github.com/login/oauth/authorize?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}`
    }
  }
}
</script>
