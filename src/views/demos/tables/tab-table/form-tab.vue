<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Tab 1"><FormRole ref="formRoleRef" /></a-tab-pane>
    <a-tab-pane key="2" tab="Tab 2"><FormDict ref="formDictRef" /></a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import FormRole from './form-role.vue';
  import FormDict from './form-dict.vue';

  const activeKey = ref('1');
  const formRoleRef = ref();
  const formDictRef = ref();

  const submit = () => {
    if (activeKey.value == 1) {
      formRoleRef.value.confirm();
    } else {
      formDictRef.value.confirm();
    }
  };

  defineExpose({
    submit,
  });
</script>
