import type { TableColumn } from '@/components/core/dynamic-table';
import type { StudentListDto } from '@/interfaces/student';

export type TableListItem = StudentListDto;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: '学生姓名',
    width: 200,
    dataIndex: 'name',
  },
  {
    title: '年级',
    width: 180,
    dataIndex: 'grade',
  },
  {
    title: '班级',
    width: 200,
    dataIndex: 'clazz',
  },
  {
    title: '性别',
    width: 200,
    dataIndex: 'gender',
    hideInSearch: true,
  },
  {
    title: '学生照片',
    width: 200,
    dataIndex: 'headImgUrl',
    hideInSearch: true,
  },
  {
    title: '家长姓名',
    width: 200,
    dataIndex: 'parentName',
  },
  {
    title: '家长手机号',
    width: 200,
    dataIndex: 'parentPhone',
  },
  {
    title: '家长亲属关系',
    width: 200,
    dataIndex: 'relation',
    hideInSearch: true,
  },
];
