import type { FormSchema } from '@/components/core/schema-form/';
import type { TeacherAddDto } from '@/interfaces/teacher';

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
  },
];
