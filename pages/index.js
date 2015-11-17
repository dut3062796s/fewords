var Vue = require('vue')
var VueRouter = require('vue-router')

var router = new VueRouter({})
router.map({
    '/index': {
        component: require('./home/home')
    },
    '/setting': {
        component: require('./setting/setting')
    }
})

var App = Vue.extend({})
router.start(App, 'body')

router.go('/index')

