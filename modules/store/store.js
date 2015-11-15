var path = require('path')
var File = require('../file/file')
var config = require('../config/config')
var configData = config.file.read()
var data = []

var dataFile = new File(configData.dataPath)
if(dataFile.exist()) {
    data = dataFile.read()
} else {
    data = dataFile.create([])
}

module.exports = {
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
        config.dataPath = path.join(p, config.dataFileName)
        config.file.write(config)
        dataFile.path = config.dataPath
        if(!dataFile.exist()) {
            dataFile.create(data)
        } else {
            data = dataFile.read()
        }
        cb && cb()
    },
}
