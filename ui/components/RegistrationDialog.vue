<template>
  <base-dialog-form
    :visible="visible"
    title="Registration"
    submit-title="Register"
    :submit="register"
    @hide="$emit('update:visible', false)"
  >
    <v-text-field id="name-input" v-model="form.name" :rules="[rules.required]" label="Name" type="text" />
    <v-text-field
      id="email-input"
      v-model="form.email"
      :rules="[rules.required, rules.email]"
      label="Email"
      type="email"
    />
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
import { mapMutations, mapActions } from 'vuex'
import * as ValidationUtils from '~/lib/utils/validation-utils'
import BaseDialogForm from '~/components/base/BaseDialogForm'

export default {
  components: {
    BaseDialogForm
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        login: '',
        password: ''
      },
      rules: {
        email: (v) => ValidationUtils.isValidEmail(v) || 'You need to type valid email address',
        required: (v) => ValidationUtils.isNotEmpty(v) || 'This field is required',
        minLength: (v) => v.length > 4 || 'This field need to have at least 5 characters'
      }
    }
  },
  watch: {
    visible() {
      Object.assign(this.form, { name: '', email: '', login: '', password: '' })
    }
  },

  methods: {
    ...mapMutations('notifications', ['SHOW_NOTIFICATON']),
    ...mapActions('user', ['REGISTER']),
    async register() {
      await this.REGISTER(this.form)
      this.SHOW_NOTIFICATON(`User "${this.form.login}" successfully registered`)
    }
  }
}
</script>
