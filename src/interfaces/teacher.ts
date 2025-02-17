export interface TeacherPageParams {
  departmentId?: number;
  name?: string;
  page: number;
  phone?: string;
  positionId?: number;
}

/**
 * TeacherAddDto
 */
export interface TeacherAddDto {
  departmentIds?: number[];
  headImg?: AttachmentDto;
  id?: number;
  name?: string;
  password?: string;
  phone?: string;
  positionIds?: number[];
  schoolId?: number;
  userId?: number;
}

/**
 * Teacher
 */
export interface Teacher {
  /**
   * 创建人id
   */
  createBy?: number;
  /**
   * 创建时间
   */
  createDate?: string;
  headImg?: string;
  /**
   * id
   */
  id?: number;
  name?: string;
  phone?: string;
  schoolId?: number;
  /**
   * 更新人id
   */
  updateBy?: number;
  /**
   * 更新时间
   */
  updateDate?: string;
  userId?: number;
}

/**
 * AttachmentDto
 */
export interface AttachmentDto {
  fileUrl?: string;
  uuid?: string;
}

/**
 * TeacherListDto
 */
export interface TeacherListDto {
  departments?: DepartmentListDto[];
  headImgUrl?: string;
  id?: number;
  name?: string;
  phone?: string;
  roles?: RoleDto[];
  schoolId?: number;
}

/**
 * com.zywx.platform.model.dto.DepartmentListDto
 *
 * DepartmentListDto
 */
export interface DepartmentListDto {
  directorName?: string;
  id?: number;
  name?: string;
  num?: number;
  parentName?: string;
}

/**
 * com.zywx.platform.model.dto.RoleDto
 *
 * RoleDto
 */
export interface RoleDto {
  id?: number;
  name?: string;
}
