var path = require('path')
var File = require('../file/file')
var configFile = require('../config/config')
var config= configFile.read()
var dataName ='fewords.json'
var data = []

var dataFile = new File(path.join(config.dataPath, dataName))
if(dataFile.exist()) {
    data = dataFile.read()
} else {
    data = dataFile.create([])
}

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
        if(!dataFile.exist()) {
            dataFile.create(data)
        } else {
            data = dataFile.read()
        }
        cb && cb()
    },
}
