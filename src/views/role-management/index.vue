<template>
  <div class="page-container">
    <div class="container">
      <div class="panel padding-b-0">
        <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }" auto-label-width>
          <a-row :gutter="16">
            <a-col :span="6">
              <a-form-item field="hospitalName" label="院区名称">
                <a-select v-model="formModel.hospitalName" placeholder="请选择院区名称">
                  <a-option>盘锦市中心医院</a-option>
                  <a-option>南京江北医院</a-option>
                  <a-option>中山市博爱医院</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="roleName" label="角色名称">
                <a-select v-model="formModel.roleName" placeholder="请选择角色名称">
                  <a-option>超级管理员</a-option>
                  <a-option>护士长</a-option>
                  <a-option>科室主任</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="roleStatus" label="角色状态">
                <a-select v-model="formModel.roleStatus" placeholder="请选择角色状态">
                  <a-option>正常</a-option>
                  <a-option>停用</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="dateValue" label="操作时间">
                <a-range-picker v-model="formModel.dateValue" />
              </a-form-item>
            </a-col>

            <a-col :span="6">
              <a-form-item label="">
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
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="panel table-panel">
        <div class="operation-panel">
          <a-button type="outline" @click="toAdd">
            <template #icon>
              <icon-plus />
            </template>
            新增
          </a-button>
        </div>
        <div class="table-wrapper">
          <a-table
            :columns="roleManagementColumns"
            :data="roleManagementData"
            row-key="id"
            :loading="loading"
            :scroll="{ x: 1600, y: '100%' }"
            :pagination="roleManagementPagination"
            size="mini"
            @page-change="onRoleManagementPageChange"
            @page-size-change="onRoleManagementPageSizeChange"
          >
            <template #operation="{ record }">
              <a-link @click="update(record)">修改</a-link>
              <a-popconfirm v-if="record.status === '1'" content="确定要停用该角色吗?">
                <a-link @click="stop(record)">停用</a-link>
              </a-popconfirm>
              <a-popconfirm v-else content="确定要启用该角色吗?">
                <a-link @click="stop(record)">启用</a-link>
              </a-popconfirm>
              <a-link @click="operationDetail(record)">操作记录</a-link>
            </template>
          </a-table>
        </div>
      </div>
    </div>
    <AddModal v-model:visible="addModalVisible" />
    <DetailModal v-model:visible="detailModalVisible" />
  </div>
</template>

<script lang="ts" setup>
import { roleManagementColumnData } from './data'
import useLoading from '@/hooks/loading'
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface'
import type { PaginationProps } from '@arco-design/web-vue/es/pagination/interface'
import { queryRoleManagementList, RoleManagementRecord, RoleManagementParams } from '@/api/role-management'
import { Pagination } from '@/types/global'
import AddModal from './components/add-modal.vue'
import DetailModal from './components/detail-modal.vue'

defineOptions({
  name: 'RoleManagement',
})

const generateFormModel = () => {
  return {
    hospitalName: '',
    dateValue: [],
    roleName: '',
    roleStatus: '',
  }
}
const formModel = ref(generateFormModel())
const { loading, setLoading } = useLoading(false)

const fetchRoleManagementData = async (params: RoleManagementParams = { current: 1, pageSize: 20 }) => {
  setLoading(true)
  try {
    const { data } = await queryRoleManagementList(params)
    roleManagementData.value = data.list
    roleManagementPagination.current = params.current
    roleManagementPagination.total = data.total
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false)
  }
}

fetchRoleManagementData()

const search = () => {
  fetchRoleManagementData({
    ...basePagination,
    ...formModel.value,
  } as unknown as RoleManagementParams)
}

const reset = () => {
  formModel.value = generateFormModel()
}

const onRoleManagementPageChange = (current: number) => {
  fetchRoleManagementData({ ...basePagination, current })
}

const onRoleManagementPageSizeChange = (pageSize: number) => {
  fetchRoleManagementData({ ...basePagination, pageSize })
}
const basePagination: Pagination = {
  current: 1,
  pageSize: 20,
}

const roleManagementColumns = reactive<TableColumnData[]>(roleManagementColumnData)
const roleManagementData = ref<RoleManagementRecord[]>([])
const roleManagementPagination = reactive<PaginationProps>({
  ...basePagination,
  total: 0,
  showTotal: true,
  showPageSize: true,
})

const editingRecord = ref<RoleManagementRecord>()
const addModalVisible = ref(false)
const toAdd = () => {
  addModalVisible.value = true
}

const update = (record: RoleManagementRecord) => {
  editingRecord.value = record
  addModalVisible.value = true
}

const stop = (record: RoleManagementRecord) => {
  console.log(record)
}

const detailModalVisible = ref(false)
const operationDetail = (record: RoleManagementRecord) => {
  editingRecord.value = record
  detailModalVisible.value = true
}
</script>

<style lang="less" scoped>
.page-container {
  padding: 16px 16px 0;
}
.container {
  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
}
.panel {
  padding: 16px 12px;
  background-color: var(--color-bg-1);
  &.table-panel {
    margin-top: 14px;
    flex-grow: 1;
    height: calc(100% - 180px);
    .table-wrapper {
      height: calc(100% - 40px);
    }
  }
}
.operation-panel {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 14px;
}
</style>
