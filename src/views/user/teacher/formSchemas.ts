import type { FormSchema } from '@/components/core/schema-form/';
import type { TeacherAddDto } from '@/interfaces/teacher';
import { EduApi } from '@/api';

export const teacherSchemas: FormSchema<TeacherAddDto>[] = [
  {
    field: 'name',
    component: 'Input',
    label: '教师姓名',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'phone',
    component: 'Input',
    label: '手机号',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'positionIds',
    component: 'Select',
    label: '角色',
    rules: [{ required: true, type: 'array' }],
    componentProps: {
      mode: 'multiple',
      request: async () => {
        const { items = [] } = await EduApi.position.pagePosition({ page: 1, pageSize: 100 });
        return items.map((n) => ({ label: n.name, value: n.id }));
      },
    },
  },
  {
    field: 'departmentIds',
    component: 'Select',
    label: '部门',
    rules: [{ required: true, type: 'array' }],
    componentProps: {
      mode: 'multiple',
      request: async () => {
        const { items = [] } = await EduApi.department.pageDepartment({ page: 1, pageSize: 100 });
        return items.map((n) => ({ label: n.name, value: n.id }));
      },
    },
  },
];
