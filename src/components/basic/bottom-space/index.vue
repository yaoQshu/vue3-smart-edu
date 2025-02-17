<template>
  <Drawer
    v-bind="omit(props, ['open', 'onCancel', 'onOk', 'onUpdate:open'])"
    v-model:open="openDrawer"
    :mask-closable="true"
    :mask="false"
    :closable="false"
    :get-container="false"
    :width="innerWidth || width"
    :style="{ position: 'absolute' }"
    :contentWrapperStyle="{ boxShadow: 'none' }"
    :bodyStyle="{ padding: 0 }"
    placement="bottom"
    height="65"
    @close="closeDrawer"
  >
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <template v-else #title>
      <Space>
        <Button @click="emit('cancel')">取消</Button>
        <Button type="primary" @click="emit('ok')">批量删除</Button>
      </Space>
    </template>
  </Drawer>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { drawerProps } from 'ant-design-vue/es/drawer';
  import { omit } from 'lodash-es';
  import { Drawer, Space, Button } from 'ant-design-vue';

  const props = defineProps({
    ...drawerProps(),
  });

  const emit = defineEmits(['update:open', 'ok', 'cancel']);

  const route = useRoute();
  const openDrawer = defineModel<boolean>('open');
  const innerWidth = ref('');

  const closeDrawer = () => {
    openDrawer.value = false;
    emit('cancel');
  };

  watch(() => route?.fullPath, closeDrawer);
</script>

<style lang="less" scoped>
  :deep(.ant-drawer-content-wrapper) {
    box-shadow: none;
  }

  :deep(.ant-drawer-body) {
    height: 0;
    padding: 0;
  }
</style>
