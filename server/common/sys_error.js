

const ErrorCode = require('./error_code'); // eslint-disable-line

// 系统自自定义错误
class SysError extends Error {
  constructor(message, errorCode = ErrorCode.ERROR_UNKNOWN, status = 200) {
    super(message)
    this.code = errorCode
    this.status = status
  }
}

module.exports = SysError
