import {createAPI} from '@/utils/request'

export const list = data => createAPI('/base/logs/', 'get', data)
