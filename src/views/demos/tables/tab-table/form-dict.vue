<template>
  <div>
    <SchemaForm />
  </div>
</template>

<script lang="ts" setup>
  import { Alert, message } from 'ant-design-vue';
  import { dictSchemas } from './form-dict-schema';
  import { useForm } from '@/components/core/schema-form';

  defineOptions({
    name: 'DemosFormDynamicForm',
  });

  const [SchemaForm, dynamicFormRef] = useForm({
    labelWidth: 120,
    schemas: dictSchemas,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
    fieldMapToTime: [['fieldTime', ['startTime', 'endTime'], 'YYYY-MM']],
  });

  // 点击提交
  function confirm() {
    console.log('dynamicFormRef', dynamicFormRef);

    dynamicFormRef.validate().then(() => message.success('验证通过2！'));
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
