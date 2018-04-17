import Mock from 'mockjs'
import TableAPI from './table'

Mock.setup({
  timeout: '1000'
})

Mock.mock(/\/table\/list\.*/, 'get', TableAPI.list)
