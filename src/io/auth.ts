import Mock from '../mock/auth_mock'
export default {
  login: {
    method: 'POST',
    url: '/login',
    // mock: Mock.login
  },
  logout: {
    method: 'POST',
    url: '/logout',
  },
  loginInfo: {
    method: 'get',
    url: '/login_info',
    // mock: Mock.loginInfo
  },
}
