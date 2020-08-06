import Vue from 'vue'
import Router from 'vue-router'

const router = new Router({ mode: 'history' })

router.beforeEach((to, from, next) => {
  if (window.om82043_72987) {
    window.om82043_72987.reset()
  }
})

Vue.use(router)
