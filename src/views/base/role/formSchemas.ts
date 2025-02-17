import type { FormSchema } from '@/components/core/schema-form/';
import type { NewPositionDto } from '@/interfaces/position';
export const positionSchemas: FormSchema<NewPositionDto>[] = [
  {
    field: 'name',
    component: 'Input',
    label: '角色名称',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'resourceIds',
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
