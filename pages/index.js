var Vue = require('vue')
var VueRouter = require('vue-router')
var store = require('../modules/store/store')
var remote = require('remote')
var dialog = remote.require('dialog')
var app = remote.require('app')
var configFile =  require('../modules/config/config')
var path = require('path')

var Index = Vue.extend({
    template: __inline('./page1.html'),
    components: {
        'talkbox': require('../modules/talkbox/talkbox'),
        'talklist': require('../modules/talklist/talklist')
    }
})


var Setting = Vue.extend({
    template: __inline('./page2.html'),
    data : function() {
        return {
            path : configFile.read().dataPath
        }
    },
    methods: {
        quit: function () {
            var ipc = require('ipc')
            ipc.send('quit')
        },
        selectDirectory: function () {
            dialog.showOpenDialog({properties: ['openDirectory']}, function (path) {
                if (path && path[0]) {
                    store.changePath(path[0], function() {
                        dialog.showMessageBox({
                            type : 'info',
                            title : 'fewords',
                            buttons : ['ok'],
                            message : '目录设置成功!'
                        })
                    })
                }
            })
        }
    },
    components: {
        'shortcut': require('../modules/shortcut/shortcut'),
    }
})

var router = new VueRouter({
    canReuse : function() {
        return true
    }
})
router.map({
    '/index': {
        component: Index
    },
    '/setting': {
        component: Setting
    }
})

var App = Vue.extend({})
router.start(App, 'body')

router.go('/index')
//router.go('/setting')


