/**
 * MenuResourceDto
 */
export interface MenuResourceDto {
  children?: MenuResourceDto[];
  id?: number;
  name?: string;
  parentId?: number;
  sort?: number;
}

/**
 * NewPositionDto
 */
export interface NewPositionDto {
  name?: string;
  positionId?: number;
  resourceIds?: number[];
  schoolId?: number;
}

export interface PositionPageParams {
  page: number;
  pageSize: number;
  name?: string;
}

/**
 * Position
 */
export interface Position {
  resourceIds?: number[];
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
