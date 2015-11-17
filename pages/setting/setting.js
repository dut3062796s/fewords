var Vue = require('vue')
var store = require('../../modules/store/store')
var remote = require('remote')
var dialog = remote.require('dialog')
var configFile =  require('../../modules/config/config')


module.exports = Vue.extend({
    template: __inline('./setting.html'),
    data : function() {
        return {
            path : configFile.data.dataPath
        }
    },
    methods: {
        quit: function () {
            var ipc = require('ipc')
            ipc.send('quit')
        },
        selectDirectory: function () {
            var self = this
            dialog.showOpenDialog({properties: ['openDirectory']}, function (path) {
                if (path && path[0]) {
                    store.changePath(path[0], function() {
                        dialog.showMessageBox({
                            type : 'info',
                            title : 'fewords',
                            buttons : ['ok'],
                            message : '目录设置成功!'
                        })
                        self.path = path[0]
                    })
                }
            })
        }
    },
    components: {
        'shortcut': require('../../modules/shortcut/shortcut'),
    }
})



