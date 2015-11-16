var remote = require('remote')
var globalShortcut = remote.require('global-shortcut')
var ipc = require('ipc')
var keyMap = require('./keymap')
var config = require('../config/config')
var Vue = require('vue')

var registerCache = {}

function register(name, key) {
    globalShortcut.unregister(key)
    if (registerCache[name]) globalShortcut.unregister(registerCache[name])
    globalShortcut.register(key, function () {
        ipc.send(name)
    })
    registerCache[name] = key
}

//注册上一次记录的事件
var recordedKeys = config.file.read().globalKey
for (var i in recordedKeys) {
    register(i, recordedKeys[i])
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
            this.keys[name] = key
            e.preventDefault()
            return false
        },
        save: function (name) {
            var key = this.keys[name]
            register(name, key)
            config.recordKey(name, key)
            this.editing = false
        }
    }
})
