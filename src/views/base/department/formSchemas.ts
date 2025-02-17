import type { FormSchema } from '@/components/core/schema-form/';
import type { DepartmentNewDto } from '@/interfaces/department';
import { EduApi } from '@/api/';

export const departmentSchemas: FormSchema<DepartmentNewDto>[] = [
  {
    field: 'name',
    component: 'Input',
    label: '部门名称',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'directorUserId',
    component: 'Select',
    label: '部门主管',
    rules: [{ required: true, type: 'string' }],
    componentProps: {
      request: async () => {
        const teachers = await EduApi.teacher.getTeacherList();
        return teachers.map((n) => ({ label: n.name, value: n.id }));
      },
    },
  },
  {
    field: 'parentId',
    component: 'Select',
    label: '上级部门',
    componentProps: {
      request: async () => {
        const { items = [] } = await EduApi.department.pageDepartment({ page: 1, pageSize: 100 });
        return items.map((n) => ({ label: n.name, value: n.id }));
      },
    },
  },
];
