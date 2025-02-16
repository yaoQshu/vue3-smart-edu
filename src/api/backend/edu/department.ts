import type {
  DepartmentDto,
  DepartmentListDto,
  DepartmentListParams,
  DepartmentNewDto,
} from '@/interfaces/department';
import { request, type RequestOptions } from '@/utils/request';

export async function pageDepartment(params: DepartmentListParams, options?: RequestOptions) {
  return request<{
    items?: DepartmentListDto[];
    meta?: {
      itemCount?: number;
      totalItems?: number;
      itemsPerPage?: number;
      totalPages?: number;
      currentPage?: number;
    };
  }>('/edu/department/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getDepartment(params: { departmentId: number }, options?: RequestOptions) {
  return request<DepartmentDto>(`/edu/department/detail`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function setDepartment(body: DepartmentNewDto, options?: RequestOptions) {
  return request<any>('/edu/department/set', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || { successMsg: '创建成功' }),
  });
}

export async function deleteDepartment(body: DepartmentNewDto, options?: RequestOptions) {
  return request<any>('/edu/department/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || { successMsg: '删除成功' }),
  });
}
