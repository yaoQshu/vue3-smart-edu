import type {
  Position,
  PositionPageParams,
  NewPositionDto,
  MenuResourceDto,
} from '@/interfaces/position';
import { request, type RequestOptions } from '@/utils/request';

export async function pagePosition(params: PositionPageParams, options?: RequestOptions) {
  return request<{
    items?: Position[];
    meta?: {
      itemCount?: number;
      totalItems?: number;
      itemsPerPage?: number;
      totalPages?: number;
      currentPage?: number;
    };
  }>('/edu/position/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function setPosition(body: NewPositionDto, options?: RequestOptions) {
  return request<any>('/edu/position/set', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || { successMsg: '创建成功' }),
  });
}

export async function allResource(params: any, options?: RequestOptions) {
  return request<MenuResourceDto[]>('/edu/position/allResource', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getPosition(params: { positionId: number }, options?: RequestOptions) {
  return request<Position>(`/edu/position/detail`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function deletePosition(body: Position, options?: RequestOptions) {
  return request<any>('/edu/position/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || { successMsg: '删除成功' }),
  });
}

export async function batchDeletePosition(body: any, options?: RequestOptions) {
  return request<any>('/edu/position/batchDelete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || { successMsg: '删除成功' }),
  });
}
