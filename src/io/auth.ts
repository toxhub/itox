import Mock from '../mock/auth_mock'
export default {
  login: {
    method: 'POST',
    url: '/auth/login',
    mock: Mock.login
  },
  logout: {
    method: 'POST',
    url: '/auth/logout',
  },
  loginInfo: {
    method: 'get',
    url: '/auth/login_info',
    mock: Mock.loginInfo
  },
}
