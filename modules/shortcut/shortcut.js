var remote = require('remote')
var globalShortcut = remote.require('global-shortcut')
var ipc = require('ipc')
var keyMap = require('./keymap')
var configFile = require('../config/config')
var config = configFile.read()
var Vue = require('vue')

var registerCache = {}

function register(name, key) {
    if (registerCache[name]) globalShortcut.unregister(registerCache[name])
    if (key.trim()) {
        globalShortcut.unregister(key)
        globalShortcut.register(key, function () {
            ipc.send(name)
        })
        registerCache[name] = key
    }
}

//注册上一次记录的事件
var recordedKeys = config.globalKey
for (var i in recordedKeys) {
    register(i, recordedKeys[i])
}

if (!recordedKeys.toggleView) {
    recordedKeys.toggleView = ''
}

module.exports = Vue.extend({
    template: __inline('./shortcut.html'),
    data: function () {
        return {
            editing: false,
            keys: recordedKeys
        }
    },
    methods: {
        toggleEdit: function () {
            this.editing = !this.editing
            var self = this
            Vue.nextTick(function () {
                if (self.editing) {
                    self.$els.ipt.focus()
                }
            })
        },
        record: function (name, e) {
            var key = keyMap(e)
            if (key == 'backspace') {
                key = ''
            }
            this.keys[name] = key
            e.preventDefault()
            return false
        },
        save: function (name) {
            var key = this.keys[name]
            register(name, key)
            config.globalKey[name] = key
            configFile.write(config)
            this.editing = false
        }
    }
})
