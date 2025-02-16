import type { FormSchema } from '@/components/core/schema-form/';

export const roleSchemas: FormSchema<API.RoleDto>[] = [
  {
    field: 'name',
    component: 'Input',
    label: '角色名称',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'menuIds',
    component: 'Tree',
    label: '权限设置',
    componentProps: {
      checkable: true,
      vModelKey: 'checkedKeys',
      fieldNames: {
        title: 'name',
        key: 'id',
      },
      style: {
        height: '350px',
        paddingTop: '5px',
        overflow: 'auto',
        resize: 'vertical',
      },
    },
  },
];
