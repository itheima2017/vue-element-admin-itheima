import {createAPI, createFormAPI} from '@/utils/request'

export const form = data => createAPI('/form/user', 'post', data)
