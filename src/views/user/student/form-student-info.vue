<template>
  <div>
    <SchemaForm />
  </div>
</template>

<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { schemas } from './studentInfoFormSchemas';
  import { useForm } from '@/components/core/schema-form';

  defineOptions({
    name: 'FormStudentInfo',
  });

  const [SchemaForm, dynamicFormRef] = useForm({
    labelWidth: 120,
    schemas: schemas,
    layout: 'vertical',
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
    fieldMapToTime: [['fieldTime', ['startTime', 'endTime'], 'YYYY-MM']],
  });

  function setFieldsValue(values: any) {
    dynamicFormRef.setFieldsValue(values);
  }

  // 点击提交
  function confirm() {
    console.log('dynamicFormRef', dynamicFormRef);

    dynamicFormRef.validate().then(() => message.success('验证通过1！'));
  }

  defineExpose({
    setFieldsValue,
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
