import type { TableColumn } from '@/components/core/dynamic-table';

export type TableListItem = API.RoleEntity;
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
    dataIndex: 'value',
  },
  {
    title: '手机号',
    width: 200,
    dataIndex: 'phone',
  },
  {
    title: '角色',
    width: 200,
    dataIndex: 'role',
  },
  {
    title: '部门',
    width: 200,
    dataIndex: 'department',
  },
];
