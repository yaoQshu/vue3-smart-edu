<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Tab 1">
      <system-role />
    </a-tab-pane>
    <a-tab-pane key="2" tab="Tab 2">
      <dict-type />
    </a-tab-pane>
    <template #rightExtra>
      <a-button v-if="activeKey == 1" @click="onClickRole">role</a-button>
      <a-button @click="onClickDict">dict</a-button>
    </template>
  </a-tabs>
</template>
<script lang="tsx" setup>
  import { ref } from 'vue';
  import FormTab from './form-tab.vue';
  import { useDrawer } from '@/hooks/useDrawer/';
  import { useBottomSpace } from '@/hooks/useBottomSpace';
  import SystemRole from '@/views/system/role/index.vue';
  import DictType from '@/views/system/dict-type/index.vue';

  const activeKey = ref('1');

  const formTab = ref<InstanceType<typeof FormTab>>();

  const [fnDrawer] = useDrawer();
  const [fnBottomSpace] = useBottomSpace();

  const onClickRole = () => {
    // fnDrawer.show({
    //   title: 'FormTab',
    //   content: () => {
    //     return <FormTab ref={formTab} />;
    //   },
    //   onOk: () => {
    //     formTab.value?.submit();
    //   },
    // });
    fnBottomSpace.show({});
  };

  const onClickDict = () => {
    fnBottomSpace.hide();
  };
</script>
<style scoped>
  .tabs-extra-demo-button {
    margin-right: 16px;
  }

  .ant-row-rtl .tabs-extra-demo-button {
    margin-right: 0;
    margin-left: 16px;
  }
</style>
