import {createAPI, createFormAPI} from '@/utils/request'

export const login = data => createFormAPI('/base/frame/login', 'post', data)
export const register = data => createAPI('/base/frame/register', 'post', data)
export const logout = data => createAPI('/base/frame/logout', 'post', data)
export const passwd = data => createAPI('/base/frame/passwd', 'post', data)
export const profile = data => createAPI('/base/frame/profile', 'post', data)
