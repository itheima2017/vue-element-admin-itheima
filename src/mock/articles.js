import Mock from 'mockjs'
import {
  param2Obj
} from '@/utils'
const List = []
const count = 100
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    title: '@ctitle',
    author: '@cname',
    'icon|1': ['alipay', 'angular', 'antDesign', 'antDesignPro', 'bootstrap', 'vue', 'webpack'],
    tags: ['html', 'javascript', 'css'],
    description: '@csentence(50, 350)',
    url: '@url',
    timestamp: +Mock.Random.date('T'),
    displayTime: '@datetime',
    stars: '@integer(300, 5000)',
    likes: '@integer(300, 5000)',
    messages: '@integer(300, 5000)'
  }))
}
export default {
  list: config => {
    const {
      title,
      type,
      owner,
      page = 1,
      limit = 20,
      sort
    } = param2Obj(config.url)
    let mockList
    mockList = List.filter(item => {
      if (type && item.type !== type) return false
      if (owner && item.owner !== owner) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })
    if (sort === '-id') {
      mockList = mockList.reverse()
    }
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      items: pageList
    }
  }
}
