import {request, createAPI, createFormAPI} from '@/utils/request'

const frame = {
  login: config => createFormAPI('/base/frame/login', 'post', config),
  register: config => createAPI('/base/frame/register', 'post', config),
  logout: config => createAPI('/base/frame/logout', 'post', config),
  passwd: config => createAPI('/base/frame/passwd', 'post', config),
  profile: config => createAPI('/base/frame/profile', 'post', config)
}

const users = {}
const menus = {}
const permissionGroups = {}

export {
  frame,
  users,
  menus,
  permissionGroups
}
