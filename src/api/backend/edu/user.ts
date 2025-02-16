import type { LoginReq, LoginResultDto, UserContext } from '@/interfaces/user';
import { request, type RequestOptions } from '@/utils/request';

export async function loginByPassword(body: LoginReq, options?: RequestOptions) {
  return request<LoginResultDto>('/edu/user/loginByPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getCurrentUser(options?: RequestOptions) {
  return request<UserContext>('/edu//user/current', {
    method: 'GET',
    ...(options || {}),
  });
}
