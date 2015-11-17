var path = require('path')
var File = require('../file/file')
var configFile = require('../config/config')
var config= configFile.data
var dataName ='fewords.json'

var dataFile = new File(path.join(config.dataPath, dataName), [])
var data = dataFile.data

module.exports = {
    refresh : function() {
        data = dataFile.read()
        return data
    },
    get : function() {
        return data
    },
    save : function(d) {
        if(!Array.isArray(d)) {
            console.error('保存的数据不合法')
            return false
        }
        if(!d.length) {
            d = []
        }
		data = d
        dataFile.write(data)
    },
    changePath: function(p, cb) {
        config.dataPath = p
        configFile.write(config)
        dataFile.path = path.join(config.dataPath, dataName)
		data = dataFile.createWidthData(data)
        cb && cb()
    },
}
