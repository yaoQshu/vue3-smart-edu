export interface StudentPageParams {
  name?: string;
  gradeId?: number;
  clazzId?: number;
  page: number;
  parentName?: string;
  parentPhone?: string;
  reportId?: number;
}

export interface StudentListDto {
  clazz?: string;
  gender?: string;
  grade?: string;
  headImgUrl?: string;
  name?: string;
  parentName?: string;
  parentPhone?: string;
  relation?: string;
}

/**
 * StudentReport
 */
export interface StudentReport {
  /**
   * 创建人id
   */
  createBy?: number;
  /**
   * 创建时间
   */
  createDate?: string;
  endDate?: string;
  /**
   * id
   */
  id?: number;
  name?: string;
  schoolId?: number;
  startDate?: string;
  studentCount?: number;
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
 * StudentDetailDto
 */
export interface StudentDetailDto {
  clazzId?: number;
  /**
   * 性别 0: 男 1: 女
   */
  gender?: number;
  gradeId?: number;
  headImg?: AttachmentDto;
  id?: number;
  name?: string;
  parentName?: string;
  parentPhone?: string;
  /**
   * 关系 0: 父亲 1: 母亲 2: 其他
   */
  relation?: number;
  reportId?: number;
  schoolId?: number;
  /**
   * 状态 0: 待审核 1: 在校 2: 毕业
   */
  status?: number;
}

/**
 * AttachmentDto
 */
export interface AttachmentDto {
  fileUrl?: string;
  uuid?: string;
}

/**
 * RelationDto
 */
export interface RelationDto {
  id?: number;
  name?: string;
}
