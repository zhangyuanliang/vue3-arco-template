import type { TableColumnData } from '@arco-design/web-vue/es/table/interface'

export const userManagementColumnData: TableColumnData[] = [
  {
    title: '序号',
    dataIndex: 'index',
    fixed: 'left',
    width: 70,
  },
  {
    title: '登录名',
    dataIndex: 'loginName',
    fixed: 'left',
    width: 120,
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '用户姓名',
    dataIndex: 'userName',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '医院名称',
    dataIndex: 'hospital',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '院区名称',
    dataIndex: 'yqmc',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '授权物资类型',
    dataIndex: 'sqwzlx',
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
    ellipsis: true,
    tooltip: true,
  },
  {
    title: '授权中心库房',
    dataIndex: 'sqzxck',
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
    ellipsis: true,
    tooltip: true,
  },
  {
    title: '授权科室',
    dataIndex: 'sqks',
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
    ellipsis: true,
    tooltip: true,
  },
  {
    title: '授权科室库房',
    dataIndex: 'sqkskf',
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
    ellipsis: true,
    tooltip: true,
  },
  {
    title: '用户状态',
    dataIndex: 'yhzt',
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '微信号',
    dataIndex: 'wxh',
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '用户角色',
    dataIndex: 'role',
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '操作人',
    dataIndex: 'czr',
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '操作时间',
    dataIndex: 'updateTime',
    width: 200,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '操作',
    slotName: 'operation',
    fixed: 'right',
  },
]
