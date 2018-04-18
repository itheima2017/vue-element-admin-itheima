import {createAPI, createFormAPI} from '@/utils/request'

export const list = data => createAPI('/articles/list', 'get', data)
