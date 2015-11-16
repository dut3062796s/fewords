var fs = require('fs')
var mkdirp = require('mkdirp')
var path = require('path')

function File(p) {
    this.path = p
}

File.prototype = {
    data : null,
    exist: function () {
        return fs.existsSync(this.path)
    },
    create: function (data) {
        if (!this.exist()) {
            mkdirp.sync(path.dirname(this.path))
            fs.writeFileSync(this.path, JSON.stringify(data), {mode: 511})
            console.log('create ', this.path, ' success!')
            this.data = data
            return data
        }
    },
    write: function (data) {
        fs.writeFileSync(this.path, JSON.stringify(data), {mode: 511})
        this.data = data
        console.log('save ', this.path, ' success!')
    },
    read: function () {
        if (this.exist()) {
            this.data = JSON.parse(fs.readFileSync(this.path))
            return this.data
        }
        return {}
    }
}

module.exports = File
