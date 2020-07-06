<template>
  <base-dialog-form
    :visible="loginFormDisplayed"
    title="Login"
    submit-title="Log in"
    :submit="login"
    @hide="HIDE_LOGIN_FORM"
  >
    <div slot="header" class="text-center my-3">
      <v-btn color="secondary" @click="$auth.loginWith('github')">
        <v-icon>mdi-github</v-icon>&nbsp;&nbsp;Continue with github
      </v-btn>
    </div>
    <v-text-field id="login-input" v-model="form.login" :rules="[rules.required]" label="Login" />
    <v-text-field
      id="password-input"
      v-model="form.password"
      :rules="[rules.required, rules.minLength]"
      label="Password"
      type="password"
    />
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
    ...mapMutations('portal', ['HIDE_LOGIN_FORM']),
    async login() {
      const data = {
        data: {
          attributes: this.form
        }
      }
      await this.$auth.loginWith('local', { data })
      this.SHOW_NOTIFICATON(`Logged in as ${this.form.login}`)
    }
  }
}
</script>
