<template>
  <teleport :to="getContainer || 'body'">
    <ProConfigProvider>
      <Drawer
        v-bind="omit(props, ['open', 'onCancel', 'onOk', 'onUpdate:open'])"
        v-model:open="openDrawer"
        :mask-closable="true"
        :width="innerWidth || width"
        @close="closeDrawer"
      >
        <template #title>
          <slot name="title">{{ $attrs.title || '标题' }}</slot>
        </template>
        <slot> custom drawer </slot>
        <template v-if="$slots.footer" #footer>
          <slot name="footer" />
        </template>
        <template #extra>
          <Space>
            <Button @click="emit('cancel')">Cancel</Button>
            <Button type="primary" @click="emit('ok')">Submit</Button>
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
