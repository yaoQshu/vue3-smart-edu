export interface DepartmentNewDto {
  departmentId?: number;
  directorUserId?: number;
  name?: string;
  parentId?: number;
  schoolId?: number;
}

/**
 * DepartmentDto
 */
export interface DepartmentDto {
  departmentId?: number;
  directorName?: string;
  directorUserId?: number;
  name?: string;
  parentId?: number;
  parentName?: string;
}

export interface DepartmentListParams {
  page?: number;
  pageSize?: number;
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
