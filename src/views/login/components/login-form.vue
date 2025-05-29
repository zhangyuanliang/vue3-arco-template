<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-sub-title">
      没有账号？
      <a-link>{{ $t('login.form.register') }}</a-link>
    </div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form ref="loginForm" :model="userInfo" size="large" class="login-form" layout="vertical" @submit="handleSubmit">
      <a-form-item
        field="username"
        :rules="[{ required: true, message: $t('login.form.userName.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input v-model="userInfo.username" :placeholder="$t('login.form.userName.placeholder')">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password v-model="userInfo.password" :placeholder="$t('login.form.password.placeholder')" allow-clear>
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        field="code"
        :validate-trigger="['change', 'blur']"
        :rules="[{ required: true, message: $t('login.form.code.errMsg') }]"
        hide-label
      >
        <input-captcha
          ref="captchaRef"
          v-model.trim="userInfo.code"
          v-model:uuid="userInfo.uuid"
          :max-length="4"
          placeholder="请输入验证码"
        >
          <template #prefix>
            <icon-safe />
          </template>
        </input-captcha>
      </a-form-item>

      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions">
          <a-checkbox
            checked="rememberPassword"
            :model-value="loginConfig.rememberPassword"
            @change="setRememberPassword as any"
          >
            {{ $t('login.form.rememberPassword') }}
          </a-checkbox>
          <a-link>{{ $t('login.form.forgetPassword') }}</a-link>
        </div>
        <a-button type="primary" html-type="submit" size="large" long :loading="loading">
          {{ $t('login.form.login') }}
        </a-button>
        <div class="phone-wrapper flex-cv">
          服务热线
          <a-link>400-088-9805</a-link>
        </div>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import { ValidatedError } from '@arco-design/web-vue/es/form/interface'
import { useI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'
import { useUserStore } from '@/store'
import useLoading from '@/hooks/loading'
import type { LoginData } from '@/api/user'
import InputCaptcha from '@/components/input/captcha.vue'

const router = useRouter()
const { t } = useI18n()
const errorMessage = ref('')
const { loading, setLoading } = useLoading()
const userStore = useUserStore()

const loginConfig = useStorage('login-config', {
  rememberPassword: true,
  username: 'admin', // 演示默认值
  password: 'admin', // demo default value
  code: '',
  uuid: '',
})
const userInfo = reactive({
  username: loginConfig.value.username,
  password: loginConfig.value.password,
  code: '',
  uuid: '',
})

const captchaRef = ref()

const handleSubmit = async ({
  errors,
  values,
}: {
  errors: Record<string, ValidatedError> | undefined
  values: Record<string, any>
}) => {
  if (loading.value) return
  if (!errors) {
    setLoading(true)
    try {
      const param = {
        ...values,
        keyId: userStore.keyId,
        rememberMe: loginConfig.value.rememberPassword,
      }
      await userStore.login(param as LoginData)
      const { redirect, ...othersQuery } = router.currentRoute.value.query
      router.push({
        name: (redirect as string) || 'UserManagement',
        query: {
          ...othersQuery,
        },
      })
      Message.success(t('login.form.login.success'))
      const { rememberPassword } = loginConfig.value
      const { username, password } = values
      // 实际生产环境需要进行加密存储。
      // The actual production environment requires encrypted storage.
      loginConfig.value.username = rememberPassword ? username : ''
      loginConfig.value.password = rememberPassword ? password : ''
    } catch (err) {
      errorMessage.value = (err as Error).message
    } finally {
      setLoading(false)
      nextTick(() => captchaRef.value?.getCaptcha())
    }
  }
}
const setRememberPassword = (value: boolean) => {
  loginConfig.value.rememberPassword = value
}
</script>

<style lang="less" scoped>
.login-form {
  &-wrapper {
    width: 320px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 14px;
    line-height: 24px;
    margin-top: 10px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-register-btn {
    color: var(--color-text-3) !important;
  }
  .phone-wrapper {
    font-size: 14;
    color: #7a8085;
  }
}
</style>
