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
 * AttachmentDto
 */
export interface AttachmentDto {
  fileUrl?: string;
  uuid?: string;
}
