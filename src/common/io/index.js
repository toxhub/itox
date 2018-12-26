
import {request} from '../utils'
import auth from './auth'

const createIo = ioContent => {
  const content = {}
  const urlPrefix = '/api/v1/cms'
  Object.keys(ioContent).forEach(key => {
    content[key] = async (data = {}) => {
      const option = Object.assign({}, ioContent[key], data)
      option.url = (option.urlPrefix || urlPrefix) + option.url
      const result = await request(option)
      return result
    }
  })
  return content
}

const io = {
  auth: createIo(auth),
}

export default io
