<template>
  <div class="logo">
    <img src="~@/assets/images/logo.png" alt="" />
    <div v-show="!collapsed" class="title">西安市第十三中学</div>
  </div>
</template>

<script setup>
  defineProps({
    collapsed: {
      type: Boolean,
    },
  });
</script>

<style lang="less" scoped>
  .logo {
    display: flex;
    align-items: center;

    img {
      height: 32px;
      margin-right: 8px;
    }

    .title {
      color: #2e3649;
      font-size: 17px;
      font-style: normal;
      line-height: 32px;
    }
  }
</style>
