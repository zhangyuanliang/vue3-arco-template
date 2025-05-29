<template>
  <div class="container">
    <div class="logo">
      <img alt="logo" src="@/assets/images/dbhs-logo.png" />
    </div>
    <LoginBanner />
    <div class="content">
      <div class="content-inner">
        <LoginForm />
      </div>
      <div class="footer">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Footer from '@/components/footer/index.vue'
import LoginBanner from './components/banner.vue'
import LoginForm from './components/login-form.vue'

defineOptions({
  name: 'Login',
})
</script>

<style lang="less" scoped>
.container {
  display: flex;
  height: 100vh;

  .banner {
    width: 550px;
    background: linear-gradient(238deg, rgba(47, 90, 255, 0.06) 0%, rgba(118, 169, 255, 0.06) 100%);
  }

  .content {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-bottom: 40px;
    background: var(--color-fill-1);
    &-inner {
      width: 440px;
      height: 542px;
      border-radius: 8px;
      opacity: 1;
      box-shadow: 0px 3px 6px -6px rgba(0, 0, 0, 0.05), 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
      background: var(--color-bg-1);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 64px;
    }
  }

  .footer {
    position: absolute;
    right: 0;
    bottom: 10px;
    width: 100%;
  }
}

.logo {
  position: fixed;
  top: 24px;
  left: 22px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  > img {
    width: 170px;
    margin-top: 10px;
  }
}
</style>

<style lang="less" scoped>
// responsive
@media (max-width: @screen-lg) {
  .container {
    .banner {
      width: 25%;
    }
  }
}
</style>
