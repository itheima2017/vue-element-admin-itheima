import {createAPI} from '@/utils/request'

export const list = data => createAPI('/base/permissions', 'get', data)
export const simple = data => createAPI('/base/permissions/simple', 'get', data)
export const add = data => createAPI('/base/permissions', 'post', data)
export const update = data => createAPI(`/base/permissions/${data.id}`, 'put', data)
export const remove = data => createAPI(`/base/permissions/${data.id}`, 'delete', data)
export const detail = data => createAPI(`/base/permissions/${data.id}`, 'get', data)
