import type { FormSchema } from '@/components/core/schema-form/';
import type { StudentDetailDto } from '@/interfaces/student';
import { EduApi } from '@/api';
export const schemas: FormSchema<StudentDetailDto>[] = [
  {
    field: 'name',
    component: 'Input',
    label: '姓名',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'clazzId',
    component: 'Select',
    label: '班级',
    rules: [{ required: true, type: 'string' }],
    componentProps: {
      request: async () => {
        const { items = [] } = await EduApi.department.pageDepartment({ page: 1, pageSize: 100 });
        return items.map((n) => ({ label: n.name, value: n.id }));
      },
    },
  },
  {
    field: 'gender',
    label: '性别',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 0 },
      ],
    },
  },
  {
    field: 'parentName',
    component: 'Input',
    label: '家长姓名',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'parentPhone',
    component: 'Input',
    label: '家长手机号',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'relation',
    label: '家长亲属关系',
    component: 'Select',
    componentProps: {
      request: async () => {
        const data = await EduApi.student.getRelationList();
        return data.map((n) => ({ label: n.name, value: n.id }));
      },
    },
  },
];
