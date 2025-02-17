import type { FormSchema } from '@/components/core/schema-form/';

export const roleSchemas: FormSchema[] = [
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',
    vShow: ({ formModel }) => {
      return !!formModel.field5;
    },
  },
  {
    field: 'field2',
    component: 'Input',
    label: '字段2',
    vShow: ({ formModel }) => {
      return !!formModel.field6;
    },
  },
  {
    field: 'field3',
    component: 'DatePicker',
    label: '字段3',
    dynamicDisabled: ({ formModel }) => {
      return !!formModel.field7;
    },
  },
  {
    field: 'field4',
    component: 'Select',
    label: '字段4',
    dynamicRules: ({ formModel }) => {
      return formModel.field8 ? [{ required: true, message: '字段4必填' }] : [];
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          key: '1',
        },
        {
          label: '选项2',
          value: '2',
          key: '2',
        },
      ],
    },
  },
  {
    field: 'field11',
    component: 'DatePicker',
    label: '字段11',
  },
  {
    field: 'field5',
    component: 'Switch',
    label: '是否显示字段1(css控制)',
    labelWidth: 200,
  },
  {
    field: 'field6',
    component: 'Switch',
    label: '是否显示字段2(dom控制)',
    labelWidth: 200,
  },
  {
    field: 'field7',
    component: 'Switch',
    label: '是否禁用字段3',
    labelWidth: 200,
  },
  {
    field: 'field8',
    component: 'Switch',
    label: '字段4是否必填',
    componentProps: ({ formInstance }) => ({
      onChange(e) {
        requestAnimationFrame(() => {
          e ? formInstance?.validateFields() : formInstance?.clearValidate();
        });
      },
    }),
    labelWidth: 200,
  },
];
