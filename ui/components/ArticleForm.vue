<template>
  <v-form>
    <div>
      <v-text-field v-model="article.title" label="Title" />
    </div>
    <div>
      <v-textarea v-model="article.content" label="Content" />
    </div>
    <div class="text-right">
      <v-btn @click="$emit('save')">Save</v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: null
    }
  }
}
</script>
