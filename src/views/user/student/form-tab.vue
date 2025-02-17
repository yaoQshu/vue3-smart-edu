<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="新增"><FormStudentInfo ref="formStudentInfoRef" /></a-tab-pane>
    <a-tab-pane key="2" tab="批量新增">
      <FormStudentInfoBatch ref="formStudentInfoBatchRef" />
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import FormStudentInfo from './form-student-info.vue';
  import FormStudentInfoBatch from './form-student-info-batch.vue';

  const props = defineProps({
    record: {
      type: Object,
      default: () => ({}),
    },
  });

  const activeKey = ref('1');
  const formStudentInfoRef = ref();
  const formStudentInfoBatchRef = ref();

  const setFieldsValue = () => {
    console.log('props.record', props.record);
    if (activeKey.value === '1') {
      formStudentInfoRef.value.setFieldsValue(props.record);
    } else {
      formStudentInfoBatchRef.value.setFieldsValue(props.record);
    }
  };

  onMounted(() => {
    setFieldsValue();
  });

  const submit = () => {
    if (activeKey.value === '1') {
      formStudentInfoRef.value.confirm();
    } else {
      formStudentInfoBatchRef.value.confirm();
    }
  };

  defineExpose({
    submit,
  });
</script>
