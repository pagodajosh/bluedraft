var em = require('events').EventEmiter,
util = require('util'),
StreamWorker = require('./stream_worken')

function Reader(stream, options) {
    em.call(this)

    var worker = new StreamWorker(stream)

    worker.on('lines', function(num){
        var line, lines, i

        lines = this.getLines(num)

        for (i = 0; i < num; i++) {
            line = lines[i]
            if (!/^#/.test(line)) {
                this.emit('line')
            } else if (options.debug) {
                this.emit('debug')
            }
        }
    })
}
util.inherits(Reader, em)

module.exports = Reader