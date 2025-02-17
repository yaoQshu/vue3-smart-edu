import type { TableColumn } from '@/components/core/dynamic-table';

export type TableListItem = API.RoleEntity;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: '角色名称',
    dataIndex: 'name',
  },
];
