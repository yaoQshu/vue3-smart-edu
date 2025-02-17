<template>
  <div>
    <SchemaForm />
  </div>
</template>

<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { schemas } from './studentInfoBatchFormSchemas.tsx';
  import { useForm } from '@/components/core/schema-form';

  defineOptions({
    name: 'DemosFormDynamicForm',
  });

  const [SchemaForm, dynamicFormRef] = useForm({
    labelWidth: 120,
    layout: 'vertical',
    schemas: schemas,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
    fieldMapToTime: [['fieldTime', ['startTime', 'endTime'], 'YYYY-MM']],
  });

  // 点击提交
  function confirm() {
    console.log('dynamicFormRef', dynamicFormRef);

    dynamicFormRef.validate().then(() => message.success('验证通过1！'));
  }

  defineExpose({
    confirm,
  });
</script>

<style lang="less" scoped>
  .btn-rows {
    button {
      margin-right: 12px;
    }
  }
</style>
