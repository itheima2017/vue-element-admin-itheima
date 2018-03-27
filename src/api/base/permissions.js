import {createAPI} from '@/utils/request'

export const list = data => createAPI('/base/permissions', 'get', data)
export const simple = data => createAPI('/base/permissions/simple', 'get', data)
export const add = data => createAPI('/base/permissions', 'post', data)
export const update = data => createAPI('/base/permissions', 'put', data)
export const remove = data => createAPI('/base/permissions', 'delete', data)
export const detail = data => createAPI('/base/permissions/:id', 'get', data)
