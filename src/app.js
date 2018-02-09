/* eslint-disable import/extensions */
import Vue from 'vue'
import App from 'App.vue'
import VueResource from 'vue-resource'

import router from 'router'

Vue.use(VueResource)

/* eslint-disable no-new */
const vm = new Vue({
    router,
    ...App,
})


export default vm
