import type { TableColumn } from '@/components/core/dynamic-table';
import type { TeacherListDto } from '@/interfaces/teacher';

export type TableListItem = TeacherListDto;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: '教师姓名',
    width: 200,
    dataIndex: 'name',
  },
  {
    title: '教师照片',
    width: 180,
    dataIndex: 'headImgUrl',
    hideInSearch: true,
  },
  {
    title: '手机号',
    width: 200,
    dataIndex: 'phone',
  },
  {
    title: '角色',
    width: 200,
    dataIndex: 'roles',
    customRender: ({ record }) => {
      return record.roles.map((item) => item.name).join(',');
    },
  },
  {
    title: '部门',
    width: 200,
    dataIndex: 'departments',
    customRender: ({ record }) => {
      return record.departments.map((item) => item.name).join(',');
    },
  },
];
