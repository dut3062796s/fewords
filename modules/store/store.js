var path = require('path')
var fs = require('fs')
var mkdirp = require('mkdirp')
var fileName = '/fewords/fewords.json'

var userHomePath  = process.env.HOME || process.env.USERPROFILE
var userDocumentPath = userHomePath + '/Documents'
var configPath = path.join(userHomePath, '/.fewords-config.json')

var config = {}
if(fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath))
}

var dataPath = path.join(config.dataPath || userDocumentPath, fileName)


function createDataFile(p, d) {
    if(!fs.existsSync(p)) {
        mkdirp.sync(path.dirname(p))
        fs.writeFileSync(p, JSON.stringify(d), {mode: 511})
        console.log('创建存储文件成功')
    }
}

createDataFile(dataPath, [])

var data = JSON.parse(fs.readFileSync(dataPath))

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
        var body = JSON.stringify(data)
		fs.writeFile(dataPath, body, {mode : 511}, function(err) {
			if(err) return console.error(err)
			console.log('保存数据成功')
		})
    },
    changePath: function(p, cb) {
        config.dataPath = p
        dataPath  = path.join(p, fileName)
        createDataFile(dataPath, data)
        data = JSON.parse(fs.readFileSync(dataPath))
        fs.writeFile(configPath, JSON.stringify(config), {mode : 511}, function(err) {
            if(err) return console.error(err)
            console.log('目录保存成功')
            cb && cb()
        })
    }
}
