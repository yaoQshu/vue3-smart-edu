import type { CaptchaImageParams, CaptchaImageVo } from '@/interfaces/captcha';
import { request, type RequestOptions } from '@/utils/request';

export async function getCaptchaImage(params: CaptchaImageParams, options?: RequestOptions) {
  return request<CaptchaImageVo>('/edu/user/captcha', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
