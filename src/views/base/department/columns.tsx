import type { TableColumn } from '@/components/core/dynamic-table';

export type TableListItem = API.RoleEntity;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: '部门名称',
    width: 200,
    dataIndex: 'name',
  },
  {
    title: '部门主管',
    width: 180,
    dataIndex: 'directorName',
    hideInSearch: true,
  },
  {
    title: '上级部门',
    width: 200,
    dataIndex: 'parentName',
    hideInSearch: true,
  },
  {
    title: '部门人数',
    width: 200,
    dataIndex: 'num',
    hideInSearch: true,
  },
];
