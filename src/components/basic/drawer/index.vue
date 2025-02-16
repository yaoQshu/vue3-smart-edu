<template>
  <teleport :to="getContainer || 'body'">
    <ProConfigProvider>
      <Drawer
        v-bind="omit(props, ['open', 'onCancel', 'onOk', 'onUpdate:open'])"
        v-model:open="openDrawer"
        :closable="false"
        :mask-closable="true"
        :width="innerWidth || width"
        @close="closeDrawer"
      >
        <template #title>
          <slot name="title">{{ $attrs.title || '标题' }}</slot>
        </template>
        <template #extra>
          <Icon icon="icon-park-outline:close" @click="emit('cancel')" />
        </template>
        <slot> custom drawer </slot>
        <template #footer>
          <Space class="w-full justify-end">
            <Button @click="emit('cancel')">取消</Button>
            <Button type="primary" @click="emit('ok')">保存</Button>
          </Space>
        </template>
      </Drawer>
    </ProConfigProvider>
  </teleport>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { drawerProps } from 'ant-design-vue/es/drawer';
  import { omit } from 'lodash-es';
  import { Drawer, Space, Button } from 'ant-design-vue';

  const props = defineProps({
    ...drawerProps(),
    fullscreen: {
      type: Boolean,
      default: false,
    },
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

<style lang="less"></style>
