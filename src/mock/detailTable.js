import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@cname',
    reviewer: '@cname',
    'name|1': ['HUAWEI', 'apple', 'Lenovo', 'DELL'],
    'barcode|1': ['123456789', '987654321', '456987123', '896532147'],
    'price|1': ['2', '2.5', '3', '8'],
    moneyall: '',
    'step|1': ['取货员接单', '	联系客户', '取货员接单', '申请审批通过', '发起退货申请'],
    'number|1': ['2', '3', '5', '2'],
    'status|1': ['进行中', '成功', '失败'],
    display_time: '@datetime',
    'nameId|1': ['取货员 ID6666', '系统', '用户'],
    'time|1': ['1h', '10mins', '5mins'],
    'type|1': ['创建订单', '提交订单', '部门初审', '财务复审'],
    'remarks|1': ['--', '暂无']
  }))
}

export default {
  list: config => {
    const { type, title, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (type && item.type !== type) return false
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
