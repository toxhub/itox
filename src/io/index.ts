
import {request, config} from '../common/utils'
import auth from './auth'
import render from './render'

const createIo = (ioContent: any) => {
  const content: any = {}
  Object.keys(ioContent).forEach(key => {
    content[key] = async (data: any = {}) => {

      const option = Object.assign({}, ioContent[key], data);
      option.url = (option.apiPrefix ? config.pathPrefix + option.apiPrefix :  config.pathPrefix + config.apiPrefix) + option.url;

      return await request(option)
    }
  })
  return content
}

const io = {
  auth: createIo(auth),
  render: createIo(render)
}

export default io
