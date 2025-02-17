import type { RelationDto, StudentListDto, StudentPageParams } from '@/interfaces/student';
import { request, type RequestOptions } from '@/utils/request';

export async function pageStudent(params: StudentPageParams, options?: RequestOptions) {
  return request<{
    items?: StudentListDto[];
    meta?: {
      itemCount?: number;
      totalItems?: number;
      itemsPerPage?: number;
      totalPages?: number;
      currentPage?: number;
    };
  }>('/edu/student/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function pageReport(params: StudentPageParams, options?: RequestOptions) {
  return request<{
    items?: StudentReport[];
    meta?: {
      itemCount?: number;
      totalItems?: number;
      itemsPerPage?: number;
      totalPages?: number;
      currentPage?: number;
    };
  }>('/edu/student/pageReport', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getRelationList(options?: RequestOptions) {
  return request<RelationDto[]>(`/edu/student/relation`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getReportDetail(params: { studentId: number }, options?: RequestOptions) {
  return request<StudentAddDto>(`/edu/student/detail`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
