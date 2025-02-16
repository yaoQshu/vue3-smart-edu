/**
 * LoginReq
 */
export interface LoginReq {
  captcha?: string;
  password?: string;
  phone?: string;
  sms?: string;
  uuid?: string;
}

/**
 * LoginResultDto
 */
export interface LoginResultDto {
  phone?: string;
  token: string;
  userId?: number;
  username?: string;
  userRoles?: UserRoleDto[];
}

/**
 * com.zywx.platform.model.dto.UserRoleDto
 *
 * UserRoleDto
 */
export interface UserRoleDto {
  positions?: Position[];
  schoolId?: number;
  schoolName?: string;
}

/**
 * 职务
 *
 * Position
 */
export interface Position {
  adminRole?: number;
  /**
   * 创建人id
   */
  createBy?: number;
  /**
   * 创建时间
   */
  createDate?: string;
  /**
   * id
   */
  id?: number;
  name?: string;
  schoolId?: number;
  /**
   * 更新人id
   */
  updateBy?: number;
  /**
   * 更新时间
   */
  updateDate?: string;
}

/**
 * UserContext
 */
export interface UserContext {
  phone?: string;
  positions?: Position[];
  schoolId?: number;
  schoolName?: string;
  token?: string;
  userId?: number;
  username?: string;
}
