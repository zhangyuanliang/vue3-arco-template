<template>
  <div class="navbar">
    <div class="left-side">
      <a-space>
        <img alt="logo" src="@/assets/images/logo.png" class="logo" />
        <a-typography-title :style="{ margin: 0, fontSize: '18px' }" :heading="5">耗材监管后台</a-typography-title>
        <icon-menu-fold
          v-if="!topMenu && appStore.device === 'mobile'"
          style="font-size: 22px; cursor: pointer"
          @click="toggleDrawerMenu"
        />
      </a-space>
    </div>
    <div class="center-side">
      <Menu v-if="topMenu" />
    </div>
    <ul class="right-side">
      <li>
        <a-tooltip
          :content="theme === 'light' ? $t('settings.navbar.theme.toDark') : $t('settings.navbar.theme.toLight')"
        >
          <a-button class="nav-btn" type="outline" :shape="'circle'" @click="handleToggleTheme">
            <template #icon>
              <icon-moon-fill v-if="theme === 'dark'" />
              <icon-sun-fill v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip :content="isFullscreen ? $t('settings.navbar.screen.toExit') : $t('settings.navbar.screen.toFull')">
          <a-button class="nav-btn" type="outline" :shape="'circle'" @click="toggleFullScreen">
            <template #icon>
              <icon-fullscreen-exit v-if="isFullscreen" />
              <icon-fullscreen v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <!-- 隐藏设置按钮 -->
      <li v-if="false">
        <a-tooltip :content="$t('settings.title')">
          <a-button class="nav-btn" type="outline" :shape="'circle'" @click="setVisible">
            <template #icon>
              <icon-settings />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-dropdown trigger="click">
          <a-avatar
            :size="32"
            :style="{
              backgroundColor: 'rgb(var(--primary-6))',
              cursor: 'pointer',
            }"
          >
            <img v-if="userStore.userInfo.avatar" :src="userStore.userInfo.avatar" :alt="userStore.userInfo.nickName" />
            <template v-else>{{ userStore.userInfo.nickName }}</template>
          </a-avatar>

          <template #content>
            <a-doption>
              <a-space @click="switchRoles">
                <icon-tag />
                <span>切换角色</span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span>退&nbsp;&nbsp;出</span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { Message } from '@arco-design/web-vue'
import { useDark, useToggle, useFullscreen } from '@vueuse/core'
import { useAppStore, useUserStore } from '@/store'
import useUser from '@/hooks/user'
import Menu from '@/components/menu/index.vue'

const appStore = useAppStore()
const userStore = useUserStore()
const router = useRouter()
const { logout } = useUser()
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()

const theme = computed(() => {
  return appStore.theme
})
const topMenu = computed(() => appStore.topMenu && appStore.menu)
const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme',
  onChanged(dark: boolean) {
    // overridden default behavior
    appStore.toggleTheme(dark)
  },
})
const toggleTheme = useToggle(isDark)
const handleToggleTheme = () => {
  toggleTheme()
}
const setVisible = () => {
  appStore.updateSettings({ globalSettings: true })
}
const handleLogout = () => {
  logout()
}
const switchRoles = async () => {
  const res = await userStore.switchRoles()
  Message.success(res as string)
  router.replace({
    name: 'userManagement',
  })
}
const toggleDrawerMenu = inject('toggleDrawerMenu') as () => void
</script>

<style scoped lang="less">
.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.center-side {
  flex: 1;
}

.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;
  :deep(.locale-select) {
    border-radius: 20px;
  }
  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  a {
    color: var(--color-text-1);
    text-decoration: none;
  }
  .nav-btn {
    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 16px;
  }
  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }
  .trigger-btn {
    margin-left: 14px;
  }
}
</style>

<style lang="less" scoped>
.message-popover {
  .arco-popover-content {
    margin-top: 0;
  }
  :deep(.arco-avatar-text) {
    position: absolute;
    left: 50%;
    font-weight: 500;
    line-height: 1;
    transform: translate(-50%);
    transform-origin: 0 center;
  }
}
.logo {
  width: 30px;
  height: 30px;
}
</style>
