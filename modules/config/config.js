var File = require('../file/file')
var path = require('path')

var DOCUMENT = '/Documents'
var DATA_NAME = '/fewords/fewords.json'
var CONFIG_NAME = '/.fewords-config.json'
var userHomePath  = process.env.HOME || process.env.USERPROFILE
var configPath = path.join(userHomePath, CONFIG_NAME)
var config = {}

var configFile = new File(configPath)
if(configFile.exist()) {
    config = configFile.read()
} else {
    config = configFile.create({
        dataPath : path.join(userHomePath, DOCUMENT, DATA_NAME),
        globalKey: {}
    })
}

module.exports = {
    dataFileName : DATA_NAME,
    file : configFile,
    recordKey : function(name, key) {
        config.globalKey[name] = key
        configFile.write(config)
    }
}


