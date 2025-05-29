<template>
  <a-input
    v-model="modelValue"
    class="input-captcha"
    allow-clear
    @input="onInput"
    @change="onChange"
    @clear="onChange"
    @focus="onFocus"
  >
    <template v-if="slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template #append>
      <a-spin :loading="loading || !captchaRef.uuid" style="width: 80px; height: 40px; overflow: hidden">
        <img
          v-show="captchaRef.uuid"
          :src="captchaRef.img"
          :alt="captchaRef.uuid"
          style="width: 84px; height: 44px; margin: -2px"
          @click="refreshCaptcha"
        />
      </a-spin>
    </template>
  </a-input>
</template>

<script lang="ts" setup>
import { pick } from 'lodash-es'
import { isFunction } from '@/utils/is'
import useLoading from '@/hooks/loading'
import { queryCode } from '@/api/user'
import { useUserStore } from '@/store'

type CaptchaResponse = {
  img: string
  uuid: string
}

const slots = useSlots()
const userStore = useUserStore()
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  maxLength: {
    type: Number,
    default: 0,
  },
})
const emit = defineEmits(['update:modelValue', 'update:uuid'])

const { loading, setLoading } = useLoading()
const modelValue = ref(props.modelValue)
const captchaRef = ref<CaptchaResponse | Record<string, never>>({})

watch(
  () => props.modelValue,
  propsValue => {
    modelValue.value = propsValue
  },
)

function onInput(val: string) {
  modelValue.value = props.maxLength > 0 ? val.slice(0, props.maxLength) : val
}

function onChange(evt: string | Event) {
  emit('update:modelValue', evt instanceof Event ? '' : evt)
}

function onFocus(evt: FocusEvent) {
  const target = evt.target as HTMLInputElement
  if (target?.select && isFunction(target.select)) {
    target.select()
  }
}

function getCaptcha() {
  setLoading(true)
  userStore.getSecretKey()
  queryCode()
    .then(data => {
      if (data.code === 200) {
        const picked = pick(data, ['img', 'uuid']) as CaptchaResponse

        if (!picked.img.startsWith('data:')) {
          picked.img = `data:image/gif;base64, ${picked.img}`
        }
        captchaRef.value = picked
        emit('update:uuid', picked.uuid)
      }
    })
    .finally(() => {
      setLoading(false)
    })
}

const refreshCaptcha = () => {
  getCaptcha()
}

onMounted(getCaptcha)
defineExpose({ getCaptcha })
</script>

<style lang="less">
.input-captcha {
  .arco-input-wrapper {
    margin-right: 12px;
    border-radius: 4px;
  }

  .arco-input-append {
    padding: 0;
    border-width: 0;
    border-radius: 4px;
    overflow: hidden;
  }
}
</style>
