import type { TableColumn } from '@/components/core/dynamic-table';
import type { StudentReport } from '@/interfaces/student';

export type TableListItem = StudentReport;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: '任务名称',
    width: 200,
    dataIndex: 'name',
  },
  {
    title: '开始时间',
    width: 180,
    dataIndex: 'startDate',
    hideInSearch: true,
  },
  {
    title: '结束时间',
    width: 200,
    dataIndex: 'endDate',
    hideInSearch: true,
  },
  {
    title: '报到人数',
    width: 200,
    dataIndex: 'studentCount',
    hideInSearch: true,
  },
  {
    title: '报到二维码',
    width: 200,
    dataIndex: 'qrCode',
    hideInSearch: true,
  },
];
