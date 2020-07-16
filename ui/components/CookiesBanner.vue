<template>
  <div class="cookies-banner">
    <a href="#" class="close-button" @click.prevent="acceptCookies">
      <img src="/icons/icon-popup-close.svg" />
    </a>
    <div class="container">
      This website uses cookies to ensure you get the best experience on our website
    </div>
  </div>
</template>

<script>
export default {
  name: 'CookiesBanner',
  methods: {
    acceptCookies() {
      this.$cookies.set('cookiesAccepted', true)
      this.$emit('accepted')
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.cookies-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: $primary;
  color: white;
  padding: 30px 0;
  z-index: 999;

  a {
    color: white;
    font-weight: bold;
    text-decoration: underline;
  }
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
