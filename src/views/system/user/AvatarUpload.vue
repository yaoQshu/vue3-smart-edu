<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { message, Upload } from 'ant-design-vue';
  import type { UploadFile, UploadProps } from 'ant-design-vue';
  import Api from '@/api';

  defineOptions({
    name: 'AvatarUpload',
    inheritAttrs: false,
  });

  type FileType = Parameters<NonNullable<UploadProps['beforeUpload']>>[0];

  const modelValue = defineModel<string>('value');

  const fileList = ref<UploadFile[]>([]);
  const previewVisible = ref(false);
  const previewImage = ref('');
  const previewTitle = ref('');

  const avatarUrl = computed(() => {
    return modelValue.value!;
  });

  const stop = watch(modelValue, (val) => {
    if (val && !fileList.value.length) {
      fileList.value = [
        {
          uid: `vc-upload-${Date.now()}-1`,
          name: avatarUrl.value.split('/').at(-1)!,
          status: 'done',
          url: avatarUrl.value,
        },
      ];
      stop();
    }
  });

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
  };

  const uploadAvatar = async (file: FileType) => {
    const dto = await Api.sysUpload.uploadFile({ file });
    modelValue.value = dto.url;
  };

  const customRequest: UploadProps['customRequest'] = async (options) => {
    await uploadAvatar(options.file as FileType);
  };

  const handleChange: UploadProps['onChange'] = ({ file }) => {
    console.log('onChange', file);
    file.status = 'done';
    fileList.value = [file];
  };

  const handleRemove: UploadProps['onRemove'] = (file) => {
    console.log('handleRemove', file);
    modelValue.value = '';
    fileList.value = [];
  };

  const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = '';
  };
  const handlePreview = async (file: UploadFile) => {
    console.log('file', file);
    if (!modelValue.value) {
      return;
    }
    previewImage.value = modelValue.value;
    previewVisible.value = true;
    previewTitle.value = file.fileName || modelValue.value.split('/').at(-1) || '';
  };
</script>

<template>
  <Upload
    :file-list="fileList"
    name="avatar"
    list-type="picture-card"
    class="min-h-[110px]"
    :custom-request="customRequest"
    @before-upload="beforeUpload"
    @change="handleChange"
    @remove="handleRemove"
    @preview="handlePreview"
  >
    <div v-if="fileList.length < 1">
      <PlusOutlined />
      <div style="margin-top: 8px">Upload</div>
    </div>
  </Upload>
  <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
    <img alt="example" style="width: 100%" :src="previewImage" />
  </a-modal>
</template>

<style lang="less" scoped></style>
