import type {
  Teacher,
  TeacherAddDto,
  TeacherListDto,
  TeacherPageParams,
} from '@/interfaces/teacher';
import { request, type RequestOptions } from '@/utils/request';

export async function getTeacherList(options?: RequestOptions) {
  return request<TeacherListDto[]>(`/edu/teacher/listAll`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function pageTeacher(params: TeacherPageParams, options?: RequestOptions) {
  return request<{
    items?: TeacherListDto[];
    meta?: {
      itemCount?: number;
      totalItems?: number;
      itemsPerPage?: number;
      totalPages?: number;
      currentPage?: number;
    };
  }>('/edu/teacher/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addTeacher(body: TeacherAddDto, options?: RequestOptions) {
  return request<any>('/edu/teacher/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || { successMsg: '创建成功' }),
  });
}

export async function updateTeacher(body: TeacherAddDto, options?: RequestOptions) {
  return request<any>('/edu/teacher/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || { successMsg: '创建成功' }),
  });
}

export async function getTeacher(params: { teacherId: number }, options?: RequestOptions) {
  return request<TeacherAddDto>(`/edu/teacher/detail`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function deleteTeacher(body: Teacher, options?: RequestOptions) {
  return request<any>('/edu/teacher/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || { successMsg: '删除成功' }),
  });
}
