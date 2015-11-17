var Vue = require('vue')

module.exports = Vue.extend({
    template: __inline('./home.html'),
    components: {
        'talkbox': require('../../modules/talkbox/talkbox'),
        'talklist': require('../../modules/talklist/talklist')
    }
})

