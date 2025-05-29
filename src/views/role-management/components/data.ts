import type { TableColumnData } from '@arco-design/web-vue/es/table/interface'

export const roleDetailColumnData: TableColumnData[] = [
  {
    title: '序号',
    dataIndex: 'index',
    fixed: 'left',
    width: 70,
  },
  {
    title: '操作内容',
    dataIndex: 'content',
    fixed: 'left',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '操作人',
    dataIndex: 'userName',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '操作时间',
    dataIndex: 'updateTime',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
]
