<template>
  <div class="content">
    <a-result class="result" status="404" :subtitle="'not found'"></a-result>
    <div class="operation-row">
      <a-button key="back" type="primary" @click="back">back</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

defineOptions({
  name: 'NotFound',
})

const router = useRouter()
const back = () => {
  // warning： Go to the node that has the permission
  router.push({ name: 'UserManagement' })
}
</script>

<style scoped lang="less">
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -95px;
  margin-top: -121px;
  text-align: center;
}
</style>
