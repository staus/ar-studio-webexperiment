import Router from 'vue-router'
import Vue from 'vue'
import frontpage from 'components/pages/frontpage'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'frontpage',
        component: frontpage,
    },
]

export default new Router({
    mode: 'history',
    base: ENV.BASE,
    routes,
})
