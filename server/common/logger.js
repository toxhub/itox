

const DailyRotateFile = require('winston-daily-rotate-file')
const {createLogger, transports, format} = require('winston')

const config = require('../../config')

const {combine, timestamp, printf} = format

let _transports = null // eslint-disable-line
if (!config.debug) {
  _transports = [new DailyRotateFile(config.logger.prd)]
} else {
  _transports = [new transports.Console(config.logger.dev)]
}

const logger = createLogger({
  transports: _transports,
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss:SSS',
    }),
    printf(info => {
      const {level, message, timestamp} = info // eslint-disable-line
      const splatInfo = info[Symbol.for('splat')]
      if (level.indexOf('error') !== -1) {
        console.error(info.timestamp, message, splatInfo || '')
      }
      const more = [message]
      if (splatInfo) {
        splatInfo.forEach(item => {
          if (item instanceof Error) {
            more.push(item.message)
          } else if (item instanceof Buffer) {
            more.push(item)
          } else if (typeof item === 'object') {
            more.push(JSON.stringify(item))
          } else {
            more.push(item)
          }
        })
      }
      return `[${timestamp}] [${level}] [${process.pid}]: ${more.join(' ')}`
    })
  ),
})

module.exports = logger
