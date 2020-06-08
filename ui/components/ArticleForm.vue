<template>
  <v-form v-model="valid" @submit.prevent="$emit('save')">
    <div>
      <v-text-field
        v-model="article.title"
        label="Title"
        :rules="[rules.required]"
      />
    </div>
    <div>
      <v-textarea
        v-model="article.content"
        label="Content"
        :rules="[rules.required, rules.minLength5]"
        auto-grow
        :rows="1"
      />
    </div>
    <div class="text-right">
      <v-btn :disabled="!valid" type="submit">Save</v-btn>
    </div>
  </v-form>
</template>

<script>
import * as ValidationUtils from '~/lib/utils/validation-utils'

export default {
  props: {
    article: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      rules: {
        required: (v) =>
          ValidationUtils.isNotEmpty(v) || 'This field is required',
        minLength5: (v) =>
          v.length > 5 || 'This field need to have at least 5 characters'
      },
      valid: false
    }
  }
}
</script>
