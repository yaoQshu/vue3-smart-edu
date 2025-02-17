import type { FormSchema } from '@/components/core/schema-form/';
import type { StudentReport } from '@/interfaces/student';

export const schemas: FormSchema<StudentReport>[] = [
  {
    field: 'name',
    component: 'Input',
    label: '任务名称',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: '[startDate, endDate]',
    label: '起止时间',
    rules: [{ required: true }],
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
      placeholder: ['开始日期', '结束日期'],
    },
    transform([startDate, endDate] = []) {
      return { startDate, endDate };
    },
  },
];
