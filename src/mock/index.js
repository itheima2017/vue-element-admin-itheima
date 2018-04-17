import Mock from 'mockjs'
import TableAPI from './table'

Mock.mock(/\/table\/list\.*/, 'get', TableAPI.list)
