var fs = require('fs')
var mkdirp = require('mkdirp')
var path = require('path')

function File(p) {
    this.path = p
}

File.prototype = {
    exist: function () {
        return fs.existsSync(this.path)
    },
    create: function (data) {
        if (!this.exist()) {
            mkdirp.sync(path.dirname(this.path))
            fs.writeFileSync(this.path, JSON.stringify(data), {mode: 511})
            console.log('create ', this.path, ' success!')
            return data
        }
    },
    write: function (data) {
        fs.writeFileSync(this.path, JSON.stringify(data), {mode: 511})
        console.log('save ', this.path, ' success!')
    },
    read: function () {
        if (this.exist()) {
            return JSON.parse(fs.readFileSync(this.path))
        }
        return {}
    }
}

module.exports = File
