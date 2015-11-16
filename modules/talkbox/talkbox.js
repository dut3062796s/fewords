var uuid = require('node-uuid')
var Vue = require('vue')

function randomColor(a) {
    var r =  Math.floor((Math.random()* 255))
    var g =  Math.floor((Math.random()* 255))
    var b =  Math.floor((Math.random()* 255))
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
}

module.exports = Vue.extend({
    template : __inline('./talkbox.html'),
    data : function() {
        return {
            content : ''
        }
    },
    ready : function() {
		var self = this
		var remote = require('remote')
		var app = remote.require('app')
		var win = remote.getCurrentWindow()
		win.on('focus', function() {
			self.$els.textarea && self.$els.textarea.focus()
		})
    },
    methods : {
        submit: function() {
            if(!this.content.trim()) {
                this.$els.textarea.focus()
                return false
            }

            this.$root.$broadcast('add', {
                id : uuid.v1(),
                content : this.content,
                timestamp : Date.now(),
                star : false,
                color: randomColor(0.2)
            })
            this.content = ''
        }
    }
})
