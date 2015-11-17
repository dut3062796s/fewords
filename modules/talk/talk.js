var Vue = require('vue')
var marked = require('marked')
var moment = require('moment')
var emoji = require('node-emoji')
var Prism = require('prismjs')
const MIN_HEIGHT = 32

module.exports = Vue.extend({
    template: __inline('./talk.html'),
    props: ["talk"],
    data: function () {
        return {
            isEdit: false,
            contentHeight: MIN_HEIGHT
        }
    },
    filters: {
        marked: marked,
        emoji:  function(value) {
          return emoji.emojify(value)
        },
        prism : function(value) {
            var re  = /\`\`\`([a-z]+)([\s\S]+)\`\`\`/igm
            value = value.replace(re, function($0, lang, code) {
                if(Prism.languages[lang]){
                    var html = Prism.highlight(code.trim(), Prism.languages[lang])
                    return '<code class="code-block" data-type="' + lang + '">' + html + '</code>'
                }
                return $0
            })
            return  value
        },
        moment: function (time) {
            moment.locale('zh-cn')
            return moment(time).fromNow()
        }
    },
    methods: {
        toggleStar: function () {
            this.talk.star = !this.talk.star
            this.$dispatch('star', this.talk.id)
        },
        edit: function () {
            var h = this.$els.content.parentNode.clientHeight - this.$els.toolbar.clientHeight
            this.contentHeight = Math.max(h, MIN_HEIGHT)
            this.isEdit = true
            var self = this
            Vue.nextTick(function () {
                var t = self.$els.textarea
                t.selectionStart = self.talk.content.length
                t.selectionEnd = self.talk.content.length
                t.focus()
            })
        },
        delete: function () {
            this.$dispatch('delete', this.talk.id)
        },
        save: function () {
            this.isEdit = false
            this.$dispatch('save', this.talk.id)
        }
    }
})
