<template>
  <a-modal v-model:visible="visible" width="70%" :mask-closable="false" :footer="false" title-align="start">
    <template #title>操作记录</template>
    <div>
      <a-form ref="detailFormRef" :model="formModel" auto-label-width>
        <a-row :gutter="12">
          <a-col :span="6">
            <a-form-item field="phone" label="操作内容" label-col-flex="70px">
              <a-input v-model="formModel.phone" placeholder="请输入操作内容" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item field="role" label="操作人" label-col-flex="70px">
              <a-select v-model="formModel.role" placeholder="请选择操作人" multiple :max-tag-count="3" allow-clear>
                <a-option>超级管理员</a-option>
                <a-option>护士长</a-option>
                <a-option>院长</a-option>
                <a-option>副院长</a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item field="updateTime" label="操作时间">
              <a-range-picker v-model="formModel.updateTime" />
            </a-form-item>
          </a-col>
          <a-col :span="3">
            <a-space>
              <a-button type="primary" @click="search">
                <template #icon>
                  <icon-search />
                </template>
                搜索
              </a-button>
              <a-button @click="reset">
                <template #icon>
                  <icon-refresh />
                </template>
                重置
              </a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-table
      :columns="detailModalColumns"
      :data="detailModalData"
      row-key="id"
      :loading="loading"
      :pagination="detailModalPagination"
      size="mini"
      @page-change="onUserDetailPageChange"
      @page-size-change="onUserDetailPageSizeChange"
    ></a-table>
  </a-modal>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface'
import type { PaginationProps } from '@arco-design/web-vue/es/pagination/interface'
import { queryUserDetailList } from '@/api/user-management'
import { Pagination } from '@/types/global'
import { userDetailColumnData } from './data'
import useLoading from '@/hooks/loading'

defineOptions({
  name: 'UserDetailModal',
})

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})
const { loading, setLoading } = useLoading(false)

const visible = useVModel(props, 'visible')
const detailFormRef = ref(null)
const formModel = reactive({
  phone: '',
  role: '',
})

const basePagination: Pagination = {
  current: 1,
  pageSize: 20,
}

const detailModalColumns = reactive<TableColumnData[]>(userDetailColumnData)
const detailModalData = ref<UserManagementRecord[]>([])
const detailModalPagination = reactive<PaginationProps>({
  ...basePagination,
  total: 0,
  showTotal: true,
  showPageSize: true,
})

const fetchUserDetailData = async (params: UserManagementParams = { current: 1, pageSize: 20 }) => {
  setLoading(true)
  try {
    const { data } = await queryUserDetailList(params)
    detailModalData.value = data.list
    detailModalPagination.current = params.current
    detailModalPagination.total = data.total
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false)
  }
}

fetchUserDetailData()

const onUserDetailPageChange = (current: number) => {
  fetchUserDetailData({ ...basePagination, current })
}

const onUserDetailPageSizeChange = (pageSize: number) => {
  fetchUserDetailData({ ...basePagination, pageSize })
}

const search = () => {
  fetchUserDetailData({
    ...basePagination,
    ...formModel.value,
  } as unknown as UserManagementParams)
}

const reset = () => {
  detailFormRef.value.resetFields()
}
</script>

<style lang="less"></style>
