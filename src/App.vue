<template>
  <a-config-provider :locale="zhCN">
    <transition name="fade">
      <router-view />
    </transition>
  </a-config-provider>
</template>
<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import 'moment/locale/zh-cn';
// console.log(zhCN)
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>