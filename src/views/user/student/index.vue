<template>
  <div class="content-box">
    <a-tabs v-model:activeKey="activeKey" @change="onChangeTab">
      <a-tab-pane key="1" tab="学生信息管理">
        <student-info ref="studentInfoRef" @edit="onClickStudentInfo" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="新生报到">
        <student-report ref="studentReportRef" @edit="onClickNewStudent" />
      </a-tab-pane>
      <template #rightExtra>
        <a-button v-if="activeKey === '1'" type="primary" @click="onClickStudentInfo"
          >新增学生信息</a-button
        >
        <a-button v-else type="primary" @click="onClickNewStudent">新增报到</a-button>
      </template>
    </a-tabs>
  </div>
</template>
<script lang="tsx" setup>
  import { ref } from 'vue';
  import FormTab from './form-tab.vue';
  import StudentInfo from './student-info.vue';
  import StudentReport from './student-report.vue';
  import { schemas } from './studentReportFormSchemas';
  import { useDrawer, useFormDrawer } from '@/hooks/useDrawer/';

  const activeKey = ref('1');

  const formTab = ref<InstanceType<typeof FormTab>>();
  const studentInfoRef = ref<InstanceType<typeof StudentInfo>>();
  const studentReportRef = ref<InstanceType<typeof StudentReport>>();
  const [fnDrawer] = useDrawer();
  const [showDrawer] = useFormDrawer();

  const onChangeTab = (key: string) => {
    activeKey.value = key;
    studentInfoRef.value?.hideBottomSpace();
    studentReportRef.value?.hideBottomSpace();
  };

  const onClickStudentInfo = (record: any) => {
    fnDrawer.show({
      title: '新增学生信息',
      content: () => {
        return <FormTab ref={formTab} />;
      },
      onOk: () => {
        formTab.value?.submit();
      },
    });
  };

  const onClickNewStudent = async (record: any) => {
    const [formRef] = await showDrawer({
      drawerProps: {
        title: `${record.id ? '编辑' : '新增'}报到`,
      },
      formProps: {
        labelWidth: 100,
        schemas,
        layout: 'vertical',
      },
    });
  };
</script>
<style scoped>
  .content-box {
    padding: 20px;
    background-color: #fff;
  }
</style>
