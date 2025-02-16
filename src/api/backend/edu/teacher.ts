import type { TeacherPageParams } from '@/interfaces/teacher';
import { request, type RequestOptions } from '@/utils/request';

export async function pageTeacher(params: TeacherPageParams, options?: RequestOptions) {
  return request<{
    items?: API.RoleEntity[];
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
