<template>
  <a-modal
    v-model:visible="visible"
    width="30%"
    :mask-closable="false"
    title-align="start"
    :on-before-ok="handleBeforeOk"
    @before-close="handleClose"
  >
    <template #title>修改</template>
    <div>
      <a-form ref="updateFormRef" :model="formModel" :rules="rules">
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item field="phone" label="手机号码" label-col-flex="70px" tr>
              <a-input v-model="formModel.phone" placeholder="请输入手机号码" allow-clear />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item field="role" label="用户角色" label-col-flex="70px">
              <a-select v-model="formModel.role" placeholder="请选择角色名称" multiple :max-tag-count="3" allow-clear>
                <a-option>超级管理员</a-option>
                <a-option>护士长</a-option>
                <a-option>院长</a-option>
                <a-option>副院长</a-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import { PHONE_REGEXP } from '@/utils'

defineOptions({
  name: 'UserUpdateModal',
})

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const visible = useVModel(props, 'visible')
const updateFormRef = ref(null)

const generateFormModel = () => {
  return { phone: '', role: '' }
}

const formModel = ref(generateFormModel())

const clearFields = () => {
  formModel.value = generateFormModel()
  updateFormRef.value?.clearValidate()
}

const handleBeforeOk = async () => {
  const res = await updateFormRef.value.validate()
  if (res) return false // 校验不通过,阻止关闭
  // request
  clearFields()
  return true
}

const handleClose = () => {
  clearFields()
}

// 表单校验
const rules = ref({
  phone: [
    {
      required: true,
      validator: function (value, cb) {
        return new Promise(resolve => {
          if (!value) {
            cb('请输入手机号')
          }
          if (!PHONE_REGEXP.test(value)) {
            cb('手机号不正确！')
          }
          resolve()
        })
      },
    },
  ],
  role: [{ required: true, message: '请选择角色' }],
})
</script>

<style lang="less"></style>
