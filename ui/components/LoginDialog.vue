<template>
  <div>
    <v-dialog width="500" :value="visible" @input="$emit('update:visible', false)">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Login
        </v-card-title>

        <v-form v-model="valid" @submit.prevent="login">
          <v-card-text class="pt-4">
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
            <v-text-field id="login-input" v-model="form.login" :rules="[rules.required]" label="Login" />
            <v-text-field
              id="password-input"
              v-model="form.password"
              :rules="[rules.required, rules.minLength]"
              label="Password"
              type="password"
            />
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="!valid" type="submit">
              Log in
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as ValidationUtils from '~/lib/utils/validation-utils'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        login: '',
        password: ''
      },
      valid: false,
      rules: {
        required: (v) => ValidationUtils.isNotEmpty(v) || 'This field is required',
        minLength: (v) => v.length > 4 || 'This field need to have at least 5 characters'
      },
      errorMessage: null
    }
  },

  methods: {
    ...mapActions('user', ['LOGIN', 'LOAD_USER']),
    async login() {
      try {
        await this.LOGIN(this.form)
        await this.LOAD_USER()
        this.$emit('update:visible', false)
      } catch (e) {
        const error = e.response.data.errors[0]
        this.errorMessage = `${error.title} - ${error.detail}`
      }
    }
  }
}
</script>

<style scoped>
.error-message {
  color: red; /* TODO: use variable */
  margin-top: 14px;
  margin-bottom: 14px;
}
</style>
