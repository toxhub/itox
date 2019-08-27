
import {request} from '../common/utils'
import auth from './auth'
const createIo = (ioContent: any) => {
  const content: any = {}
  const urlPrefix = window.pathPrefix + '/api/v1/duc'
  Object.keys(ioContent).forEach(key => {
    content[key] = async (data: any = {}) => {
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
