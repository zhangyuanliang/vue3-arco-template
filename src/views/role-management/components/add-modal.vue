<template>
  <a-modal
    v-model:visible="visible"
    width="60%"
    :mask-closable="false"
    :ok-loading="loading"
    title-align="start"
    class="role-add-modal"
    @ok="toAddRole"
  >
    <template #title>新增角色</template>
    <a-scrollbar style="height: 70vh; overflow-x: visible; overflow-y: scroll">
      <div style="width: 98%">
        <a-form ref="addFormRef" :model="formModel" :rules="rules" auto-label-width>
          <div class="module-title">
            <div>基础信息</div>
            <div class="flex-g margin-l-14"><a-divider /></div>
          </div>
          <a-row :gutter="12">
            <a-col :span="8">
              <a-form-item field="hospitalName" label="医院名称" label-col-flex="70px">
                <a-select v-model="formModel.hospitalName" placeholder="请输入医院名称" :max-tag-count="3" allow-clear>
                  <a-option>江北医院</a-option>
                  <a-option>盘锦市中心医院</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="role" label="角色名称" label-col-flex="70px">
                <a-input v-model="formModel.role" placeholder="请输入角色名称" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="hospitalName" label="角色" label-col-flex="70px">
                <a-select
                  v-model="formModel.hospitalName"
                  placeholder="请选择角色"
                  multiple
                  :max-tag-count="3"
                  allow-clear
                >
                  <a-option>超级管理员</a-option>
                  <a-option>护士长</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="authStr" label="权限字符" label-col-flex="70px">
                <a-input v-model="formModel.authStr" placeholder="请输入权限字符" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="status" label="角色状态" label-col-flex="70px">
                <a-radio-group v-modal="formModel.status">
                  <a-radio value="0">正常</a-radio>
                  <a-radio value="1">停用</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="sort" label="排序" label-col-flex="70px">
                <a-input v-model="formModel.sort" placeholder="请输入排序" allow-clear />
              </a-form-item>
            </a-col>
          </a-row>
          <div class="module-title">
            <div>小程序权限维护</div>
            <div class="flex-g margin-l-14"><a-divider /></div>
          </div>
          <div class="page-module">
            <div class="page-name">首页:</div>
            <div>
              <a-space direction="vertical">
                <a-checkbox :model-value="checkedHomeAll" :indeterminate="homeIndeterminate" @change="homeCheckedAll">
                  全选
                </a-checkbox>
                <a-checkbox-group v-model="homeCheckbox" @change="homeCheckedChange">
                  <a-grid :cols="4" :col-gap="24" :row-gap="16">
                    <a-grid-item><a-checkbox value="1">快速审批</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="2">带量采购</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="3">需求</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="4">科室绩效</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="5">耗占比</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="6">合同签约</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="7">付款结算</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="8">近效期预警</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="9">呆滞预警</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="10">待办事项</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="11">最新消息</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="12">切换报表-耗占比</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="13">切换报表-科室绩效</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="14">切换报表-耗材双十排名</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="15">切换报表-科室实时消耗</a-checkbox></a-grid-item>
                  </a-grid>
                </a-checkbox-group>
              </a-space>
            </div>
          </div>
          <div class="page-module margin-t-14">
            <div class="page-name">产品:</div>
            <div>
              <a-space direction="vertical">
                <a-checkbox v-model="checkedProduct">全选</a-checkbox>
              </a-space>
            </div>
          </div>
          <div class="page-module margin-t-14">
            <div class="page-name">AI助手:</div>
            <div>
              <a-space direction="vertical">
                <a-checkbox v-model="checkedAI">全选</a-checkbox>
              </a-space>
            </div>
          </div>
          <div class="page-module margin-t-14">
            <div class="page-name">消息:</div>
            <div>
              <a-space direction="vertical">
                <a-checkbox v-model="checkedMessage">全选</a-checkbox>
              </a-space>
            </div>
          </div>
          <div class="page-module margin-t-14">
            <div class="page-name">我的:</div>
            <div>
              <a-space direction="vertical">
                <a-checkbox :model-value="checkedMineAll" :indeterminate="mineIndeterminate" @change="mineCheckedAll">
                  全选
                </a-checkbox>
                <a-checkbox-group v-model="mineCheckbox" @change="mineCheckedChange">
                  <a-grid :cols="4" :col-gap="24" :row-gap="16">
                    <a-grid-item><a-checkbox value="zhsz">账号设置</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="htgl">后台管理</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="aqyys">安全与隐私</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="bzywd">帮助与问答</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="dhkf">电话客服</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="gywm">关于我们</a-checkbox></a-grid-item>
                  </a-grid>
                </a-checkbox-group>
              </a-space>
            </div>
          </div>
          <!-- <div class="module-title margin-t-14">
            <div>后台权限维护</div>
            <div class="flex-g margin-l-14"><a-divider /></div>
          </div>
          <div class="page-module">
            <div class="page-name">用户管理:</div>
            <div>
              <a-space direction="vertical">
                <a-checkbox :model-value="checkedUserAll" :indeterminate="userIndeterminate" @change="userCheckedAll">
                  全选
                </a-checkbox>
                <a-checkbox-group v-model="userCheckbox" @change="userCheckedChange">
                  <a-grid :cols="4" :col-gap="24" :row-gap="16">
                    <a-grid-item><a-checkbox value="user_add">新增</a-checkbox></a-grid-item>
                    <a-grid-item><a-checkbox value="user_update">数据更新</a-checkbox></a-grid-item>
                  </a-grid>
                </a-checkbox-group>
              </a-space>
            </div>
          </div>
          <div class="page-module margin-t-14">
            <div class="page-name">角色管理:</div>
            <div>
              <a-space direction="vertical">
                <a-checkbox :model-value="checkedRoleAll" :indeterminate="roleIndeterminate" @change="roleCheckedAll">
                  全选
                </a-checkbox>
                <a-checkbox-group v-model="roleCheckbox" @change="roleCheckedChange">
                  <a-grid :cols="4" :col-gap="24" :row-gap="16">
                    <a-grid-item><a-checkbox value="role_add">新增</a-checkbox></a-grid-item>
                  </a-grid>
                </a-checkbox-group>
              </a-space>
            </div>
          </div>
          <div class="page-module margin-t-14">
            <div class="page-name">功能管理:</div>
            <div>
              <a-space direction="vertical">
                <a-checkbox :model-value="checkedFunAll" :indeterminate="funIndeterminate" @change="funCheckedAll">
                  全选
                </a-checkbox>
                <a-checkbox-group v-model="funCheckbox" @change="funCheckedChange">
                  <a-grid :cols="4" :col-gap="24" :row-gap="16">
                    <a-grid-item><a-checkbox value="fun_batch_update">批量修改</a-checkbox></a-grid-item>
                  </a-grid>
                </a-checkbox-group>
              </a-space>
            </div>
          </div> -->
          <div class="module-title margin-t-14">
            <div>修改原因</div>
            <div class="flex-g margin-l-14"><a-divider /></div>
          </div>
          <a-row :gutter="12">
            <a-col :span="24">
              <a-form-item field="reason" label="修改原因" label-col-flex="70px">
                <a-textarea v-model="formModel.reason" placeholder="请输入修改原因" allow-clear />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-scrollbar>
  </a-modal>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import useLoading from '@/hooks/loading'
import { addRole } from '@/api/role-management'
import type { IFormModel } from '@/api/role-management'

defineOptions({
  name: 'RoleAddModal',
})

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const visible = useVModel(props, 'visible')
const addFormRef = ref(null)
const formModel = reactive<IFormModel>({
  hospitalName: '',
  role: '',
  authStr: '',
  status: '',
  sort: '',
  reason: '',
})

const rules = ref({
  hospitalName: [
    {
      required: true,
      message: '请输入医院名称',
    },
  ],
  role: [
    {
      required: true,
      message: '请输入角色名称',
    },
  ],
  authStr: [
    {
      required: true,
      message: '请输入权限字符',
    },
  ],
  status: [
    {
      required: true,
      message: '请选择角色状态',
    },
  ],
})

const { loading, setLoading } = useLoading(false)

const toAddRole = async () => {
  setLoading(true)
  try {
    const param = {
      ...formModel,
    }
    await addRole(param)
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false)
  }
}

const homeIndeterminate = ref(false)
const checkedHomeAll = ref(false)
const homeCheckbox = ref<string[]>([])

const homeCheckedAll = (value: boolean | (string | number | boolean)[]) => {
  homeIndeterminate.value = false
  if (value) {
    checkedHomeAll.value = true
    homeCheckbox.value = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
  } else {
    checkedHomeAll.value = false
    homeCheckbox.value = []
  }
}

const homeCheckedChange = (values: (string | number | boolean)[]) => {
  if (values.length === 3) {
    checkedHomeAll.value = true
    homeIndeterminate.value = false
  } else if (values.length === 0) {
    checkedHomeAll.value = false
    homeIndeterminate.value = false
  } else {
    checkedHomeAll.value = false
    homeIndeterminate.value = true
  }
}

const checkedProduct = ref(false)
const checkedAI = ref(false)
const checkedMessage = ref(false)

const mineIndeterminate = ref(false)
const checkedMineAll = ref(false)
const mineCheckbox = ref<string[]>([])
const mineCheckedAll = (value: boolean | (string | number | boolean)[]) => {
  mineIndeterminate.value = false
  if (value) {
    checkedMineAll.value = true
    mineCheckbox.value = ['zhsz', 'htgl', 'aqyys', 'bzywd', 'dhkf', 'gywm']
  } else {
    checkedMineAll.value = false
    mineCheckbox.value = []
  }
}
const mineCheckedChange = (values: (string | number | boolean)[]) => {
  if (values.length === 3) {
    checkedMineAll.value = true
    mineIndeterminate.value = false
  } else if (values.length === 0) {
    checkedMineAll.value = false
    mineIndeterminate.value = false
  } else {
    checkedMineAll.value = false
    mineIndeterminate.value = true
  }
}

// const checkedUserAll = ref(false)
// const userCheckbox = ref([])
// const userCheckedAll = value => {}
// const userCheckedChange = value => {}

// const checkedRoleAll = ref(false)
// const roleCheckbox = ref([])
// const roleCheckedAll = value => {}
// const roleCheckedChange = value => {}

// const checkedFunAll = ref(false)
// const funCheckbox = ref([])
// const funCheckedAll = value => {}
// const funCheckedChange = value => {}
</script>

<style lang="less" scoped>
.module-title {
  padding-left: 14px;
  font-size: 14px;
  margin-bottom: 14px;
  position: relative;
  font-weight: 500;
  display: flex;
  align-items: center;
  > div {
    white-space: nowrap;
  }
  &::before {
    content: '';
    width: 3px;
    height: 14px;
    background: #1890ff;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
.page-module {
  display: flex;
  .page-name {
    margin: 0 8px 0 14px;
    width: 60px;
  }
}
</style>
