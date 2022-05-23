const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.used = 0;
    this.limitSize = options.limit;
  }

  _transform(chunk, encoding, callback) {
    this.used += Buffer.byteLength(chunk);
    const err = this.used> this.limitSize ? new LimitExceededError() : null;

    callback(err, chunk);
  }
}

module.exports = LimitSizeStream;
