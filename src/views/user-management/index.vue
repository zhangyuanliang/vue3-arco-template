<template>
  <div class="page-container">
    <div class="container">
      <div class="panel padding-b-0">
        <a-form :model="formModel" :label-col-props="{ span: 8 }" :wrapper-col-props="{ span: 16 }" auto-label-width>
          <a-row :gutter="16">
            <a-col flex="auto">
              <a-form-item
                field="hospitalName"
                label="快速查询"
                :label-col-props="{ span: 4 }"
                :wrapper-col-props="{ span: 20 }"
              >
                <a-input v-model="formModel.loginName" allow-clear placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col flex="180px">
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
                <a-button @click="expandToggle">
                  <template #icon>
                    <icon-double-down :style="expandStyle" />
                  </template>
                  {{ isExpand ? '收起' : '展开' }}
                </a-button>
              </a-space>
            </a-col>
          </a-row>
          <a-divider v-if="isExpand" :margin="0" style="margin-bottom: 16px"></a-divider>
          <transition name="fade" mode="out-in">
            <a-row :gutter="16" class="form-item-list" :class="isExpand ? 'down' : 'up'">
              <a-col :span="6">
                <a-form-item field="hospitalName" label="医院名称">
                  <a-select v-model="formModel.hospital" allow-clear placeholder="请选择医院名称">
                    <a-option>盘锦市中心医院</a-option>
                    <a-option>南京江北医院</a-option>
                    <a-option>中山市博爱医院</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item field="yqmc" label="院区名称">
                  <a-select v-model="formModel.yqmc" allow-clear placeholder="请选择院区名称">
                    <a-option>盘锦市中心医院</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item field="sqwzlx" label="授权物资类型">
                  <a-select v-model="formModel.sqwzlx" allow-clear placeholder="请选择授权物资类型">
                    <a-option>盘锦市中心医院</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item field="sqzxck" label="授权中心库房">
                  <a-select v-model="formModel.sqzxck" allow-clear placeholder="请选择授权中心库房">
                    <a-option>盘锦市中心医院</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item field="sqks" label="授权科室">
                  <a-select v-model="formModel.sqks" allow-clear placeholder="请选择授权科室">
                    <a-option>盘锦市中心医院</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item field="sqkskf" label="授权科室库房">
                  <a-select v-model="formModel.sqkskf" allow-clear placeholder="请选择授权科室库房">
                    <a-option>盘锦市中心医院</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item field="yhzt" label="用户状态">
                  <a-select v-model="formModel.yhzt" allow-clear placeholder="请选择用户状态">
                    <a-option>正常</a-option>
                    <a-option>停用</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item field="loginName" label="登录名">
                  <a-input v-model="formModel.loginName" allow-clear placeholder="请输入登录名" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item field="userName" label="用户名称">
                  <a-input v-model="formModel.userName" allow-clear placeholder="请输入用户名称" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item field="role" label="用户角色">
                  <a-select v-model="formModel.role" allow-clear placeholder="请选择用户角色">
                    <a-option>超级管理员</a-option>
                    <a-option>护士长</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item field="phone" label="手机号码">
                  <a-input v-model="formModel.phone" allow-clear placeholder="请输入手机号码" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item field="updateTime" label="操作时间">
                  <a-range-picker v-model="formModel.updateTime" style="width: 300px; marginbottom: 20px" />
                </a-form-item>
              </a-col>

              <!-- <a-col :span="6">
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
              </a-col> -->
            </a-row>
          </transition>
        </a-form>
        <div class="up-down-stripe" @click="expandToggle"><icon-double-down :style="expandStyle" /></div>
      </div>
      <div class="panel table-panel">
        <a-table
          ref="tableRef"
          :columns="userManagementColumns"
          :data="userManagementData"
          row-key="id"
          :loading="loading"
          :scroll="{ x: 2400, y: '100%' }"
          :pagination="userManagementPagination"
          size="mini"
          @page-change="onUserManagementPageChange"
          @page-size-change="onUserManagementPageSizeChange"
        >
          <template #operation="{ record }">
            <a-link @click="updateRecord(record)">修改</a-link>
            <a-link @click="operationDetail(record)">操作记录</a-link>
          </template>
        </a-table>
      </div>
    </div>
    <UpdateModal v-model:visible="updateModalVisible" />
    <DetailModal v-model:visible="detailModalVisible" />
  </div>
</template>

<script lang="ts" setup>
import { userManagementColumnData } from './data'
import useLoading from '@/hooks/loading'
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface'
import type { PaginationProps } from '@arco-design/web-vue/es/pagination/interface'
import { queryUserList, UserManagementRecord, UserManagementParams } from '@/api/user-management'
import { Pagination } from '@/types/global'
import UpdateModal from './components/update-modal.vue'
import DetailModal from './components/detail-modal.vue'

defineOptions({
  name: 'UserManagement',
})

const tableRef = ref()

const generateFormModel = () => {
  return {
    hospital: '',
    yqmc: [],
    sqwzlx: '',
    sqzxck: '',
    sqks: '',
    sqkskf: '',
    yhzt: '',
    loginName: '',
    userName: '',
    role: '',
    phone: '',
    updateTime: [],
  }
}
const formModel = ref(generateFormModel())
const { loading, setLoading } = useLoading(false)

const fetchUserManagementData = async (params: UserManagementParams = { current: 1, pageSize: 20 }) => {
  setLoading(true)
  try {
    const { data } = await queryUserList(params)
    userManagementData.value = data.list
    userManagementPagination.current = params.current
    userManagementPagination.total = data.total
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false)
  }
}

fetchUserManagementData()

const search = () => {
  fetchUserManagementData({
    ...basePagination,
    ...formModel.value,
  } as unknown as UserManagementParams)
}

const reset = () => {
  formModel.value = generateFormModel()
}

const isExpand = ref(true)
const expandToggle = () => {
  isExpand.value = !isExpand.value
}

const onUserManagementPageChange = (current: number) => {
  fetchUserManagementData({ ...basePagination, current })
}

const onUserManagementPageSizeChange = (pageSize: number) => {
  fetchUserManagementData({ ...basePagination, pageSize })
}
const basePagination: Pagination = {
  current: 1,
  pageSize: 20,
}

const userManagementColumns = reactive<TableColumnData[]>(userManagementColumnData)
const userManagementData = ref<UserManagementRecord[]>([])
const userManagementPagination = reactive<PaginationProps>({
  ...basePagination,
  total: 0,
  showTotal: true,
  showPageSize: true,
})

const expandStyle = computed(() => {
  return { transform: isExpand.value ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }
})

// 修改
const updateModalVisible = ref(false)
const editingRecord = ref<UserManagementRecord>()

const updateRecord = (record: UserManagementRecord) => {
  updateModalVisible.value = true
  editingRecord.value = record
}

// 操作记录
const detailModalVisible = ref(false)

const operationDetail = (record: UserManagementRecord) => {
  detailModalVisible.value = true
  editingRecord.value = record
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
    height: calc(100% - 240px);
  }
}
.form-item-list {
  overflow: hidden;
  &.up {
    height: 0;
    opacity: 0;
    transition: height 0.3s ease-in-out;
  }
}
.up-down-stripe {
  width: 100%;
  height: 14px;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(var(--primary-5));
  cursor: pointer;
  font-size: 12px;
  &:hover {
    border-color: rgb(var(--primary-5));
    font-size: 14px;
    transition: border-color 0.3s ease-in-out;
  }
}
</style>
