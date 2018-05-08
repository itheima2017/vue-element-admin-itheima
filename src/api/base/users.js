import {createAPI} from '@/utils/request'

export const list = data => createAPI('/base/users/', 'get', data)
export const simple = data => createAPI('/base/users/simple', 'get', data)
export const add = data => createAPI('/base/users', 'post', data)
export const update = data => createAPI(`/base/users/${data.id}`, 'put', data)
export const remove = data => createAPI(`/base/users/${data.id}`, 'delete', data)
export const detail = data => createAPI(`/base/users/${data.id}`, 'get', data)
