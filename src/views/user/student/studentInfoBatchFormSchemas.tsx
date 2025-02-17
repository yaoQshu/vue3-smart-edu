import { UploadOutlined } from '@ant-design/icons-vue';
import { Button } from 'ant-design-vue';
import type { FormSchema } from '@/components/core/schema-form/';
import type { StudentDetailDto } from '@/interfaces/student';

export const schemas: FormSchema<StudentDetailDto>[] = [
  {
    field: 'field23',
    component: 'Upload',
    label: '上传文件',
    colProps: {
      span: 8,
    },
    componentProps: {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    },
    componentSlots: {
      default: () => (
        <Button>
          <UploadOutlined /> 上传附件
        </Button>
      ),
    },
  },
];
