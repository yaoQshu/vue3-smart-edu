<template>
  <div v-if="open" class="bottom-space-container">
    <a-space>
      <slot>bottom space</slot>
    </a-space>
  </div>
</template>

<script setup lang="tsx">
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
  });

  const route = useRoute();
  const open = ref(props.visible);

  const closeBottomSpace = () => {
    open.value = false;
  };

  watch(() => route?.fullPath, closeBottomSpace);
</script>

<style scoped>
  .bottom-space-container {
    position: absolute;
    z-index: 10000; /* 确保在页面其他内容之上 */
    bottom: 0;
    left: 220px;
    height: 164px;
    padding: 8px; /* 内边距，可根据需要调整 */
    background-color: #f00; /* 背景颜色，可根据需要调整 */
    box-shadow: 0 -2px 10px rgb(0 0 0 / 10%); /* 添加阴影效果 */
  }
</style>
