var fs = require('fs')
var mkdirp = require('mkdirp')
var path = require('path')

function File(p, data) {
    this.path = p
    this.createWidthData(data)
}

File.prototype = {
    data : null,
    exist: function () {
        return fs.existsSync(this.path)
    },
    createWidthData: function (data) {
        if (!this.exist()) {
            mkdirp.sync(path.dirname(this.path))
            fs.writeFileSync(this.path, JSON.stringify(data), {mode: 511})
            this.data = data
            return data
        } else {
            this.data = this.read()
            return this.data
        }
    },
    write: function (data) {
        fs.writeFileSync(this.path, JSON.stringify(data), {mode: 511})
        this.data = data
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
