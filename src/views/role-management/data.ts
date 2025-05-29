import type { TableColumnData } from '@arco-design/web-vue/es/table/interface'

export const roleManagementColumnData: TableColumnData[] = [
  {
    title: '序号',
    dataIndex: 'index',
    fixed: 'left',
    width: 70,
  },
  {
    title: '医院名称',
    dataIndex: 'hospital',
    fixed: 'left',
    width: 180,
    ellipsis: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '角色名称',
    dataIndex: 'role',
    ellipsis: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '权限字符',
    dataIndex: 'qxzf',
    ellipsis: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '排序',
    dataIndex: 'px',
    ellipsis: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '角色状态',
    dataIndex: 'status',
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
