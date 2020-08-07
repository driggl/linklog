<template>
  <base-dialog-form
    :visible="registrationFormDisplayed"
    title="Registration"
    submit-title="Register"
    :submit="register"
    @hide="HIDE_REGISTRATION_FORM"
  >
    <v-text-field ref="name-input" v-model="form.name" :rules="[rules.required]" label="Name" type="text" />
    <v-text-field
      ref="email-input"
      v-model="form.email"
      :rules="[rules.required, rules.email]"
      label="Email"
      type="email"
    />
    <v-text-field ref="login-input" v-model="form.login" :rules="[rules.required]" label="User name" />
    <v-text-field
      ref="password-input"
      v-model="form.password"
      :rules="[rules.required, rules.minLength]"
      label="Password"
      type="password"
    />

    <v-checkbox v-model="form.policyPrivacyAccepted" :rules="[rules.required]" required>
      <template v-slot:label>
        <div>
          I agree with
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a target="_blank" href="https://driggl.com/privacy-policy" @click.stop v-on="on">privacy policy</a>
            </template>
            Opens in new window
          </v-tooltip>
        </div>
      </template>
    </v-checkbox>
    <span slot="footer">Already have account? <a @click.prevent="SHOW_LOGIN_FORM">Log in</a></span>
  </base-dialog-form>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import * as ValidationUtils from '~/lib/utils/validation-utils'
import BaseDialogForm from '~/components/base/BaseDialogForm'

export default {
  components: {
    BaseDialogForm
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        login: '',
        password: '',
        policyPrivacyAccepted: false
      },
      rules: {
        email: (v) => ValidationUtils.isValidEmail(v) || 'You need to type valid email address',
        required: (v) => ValidationUtils.isNotEmpty(v) || 'This field is required',
        minLength: (v) => v.length > 4 || 'This field need to have at least 5 characters'
      }
    }
  },
  computed: {
    ...mapGetters('portal', ['registrationFormDisplayed'])
  },
  watch: {
    visible() {
      Object.assign(this.form, { name: '', email: '', login: '', password: '', policyPrivacyAccepted: false })
    }
  },

  methods: {
    ...mapMutations('notifications', ['SHOW_NOTIFICATON']),
    ...mapMutations('portal', ['HIDE_REGISTRATION_FORM', 'SHOW_LOGIN_FORM']),
    ...mapActions('user', ['REGISTER']),
    async register() {
      await this.REGISTER(this.form)
      const data = {
        data: {
          attributes: {
            login: this.form.login,
            password: this.form.password
          }
        }
      }
      await this.$auth.loginWith('local', { data })
      this.SHOW_NOTIFICATON(`User "${this.form.login}" successfully registered`)
    }
  }
}
</script>
