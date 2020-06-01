<template>
  <div>
    <v-dialog
      width="500"
      :value="visible"
      @input="$emit('update:visible', false)"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Login
        </v-card-title>

        <v-card-text class="pt-4">
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          <v-form>
            <v-text-field id="login-input" v-model="form.login" label="Login" />
            <v-text-field
              id="password-input"
              v-model="form.password"
              label="Password"
            />
          </v-form>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="login">
            Log in
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

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
      errorMessage: null
    }
  },

  methods: {
    ...mapActions('user', ['LOGIN']),
    async login() {
      try {
        await this.LOGIN(this.form)
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
