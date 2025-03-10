<template>
  <div class="content-box">
    <div class="content-box-header">
      <div class="content-box-header-title">教师信息</div>
      <a-button type="primary" @click="openTeacherDrawer({})">新增</a-button>
    </div>
    <DynamicTable
      row-key="id"
      :data-request="EduApi.teacher.pageTeacher"
      :columns="columns"
      :row-selection="rowSelection"
      :scroll="{ x: '100%' }"
      size="middle"
    />
  </div>
</template>

<script lang="tsx" setup>
  import { ref, computed, watch } from 'vue';
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import { teacherSchemas } from './formSchemas';
  import type { Position } from '@/interfaces/position';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/';
  import { useFormDrawer } from '@/hooks/useDrawer';
  import { useBottomSpace } from '@/hooks/useBottomSpace';
  import { EduApi } from '@/api/';
  defineOptions({
    name: 'Teacher',
  });

  const [DynamicTable, dynamicTableInstance] = useTable();

  const [showModal] = useFormModal();
  const [showDrawer] = useFormDrawer();

  const [bottomSpace] = useBottomSpace();

  const rowSelection = ref({
    selectedRowKeys: [] as number[],
    onChange: (selectedRowKeys: number[], selectedRows: TableListItem[]) => {
      rowSelection.value.selectedRowKeys = selectedRowKeys;
    },
  });

  // 是否勾选了表格行
  const isCheckRows = computed(() => rowSelection.value.selectedRowKeys.length);

  watch(isCheckRows, (val) => {
    if (val) {
      bottomSpace.show({
        onOk: async () => {
          await EduApi.teacher.batchDeleteTeacher(rowSelection.value.selectedRowKeys);
          dynamicTableInstance?.reload();
        },
        onCancel: () => {
          rowSelection.value.selectedRowKeys = [];
        },
      });
    } else {
      bottomSpace.hide();
    }
  });

  const getCheckedKeys = (checkedList: number[], menus: Position[], total = []) => {
    return menus.reduce<number[]>((prev, curr) => {
      if (curr.children?.length) {
        getCheckedKeys(checkedList, curr.children, total);
      } else {
        if (checkedList.includes(curr.id)) {
          prev.push(curr.id);
        }
      }
      return prev;
    }, total);
  };

  /**
   * @description 打开新增/编辑弹窗
   */
  const openTeacherDrawer = async (record: Partial<TableListItem>) => {
    const [formRef] = await showDrawer({
      drawerProps: {
        title: `${record.id ? '编辑' : '新增'}教师`,
        onFinish: async (values) => {
          if (record.id) {
            await EduApi.teacher.updateTeacher(values);
          } else {
            await EduApi.teacher.addTeacher(values);
          }

          dynamicTableInstance?.reload();
        },
      },
      formProps: {
        labelWidth: 100,
        layout: 'vertical',
        schemas: teacherSchemas,
      },
    });

    // 如果是编辑的话，需要获取角色详情
    if (record.id) {
      const teacherInfo = await EduApi.teacher.getTeacher({ teacherId: record.id });

      formRef?.setFieldsValue({
        ...record,
        positionIds: getCheckedKeys(teacherInfo.positionIds, menuTreeData),
      });
    }
  };
  const delRowConfirm = async (record: TableListItem) => {
    await EduApi.teacher.deleteTeacher({ id: record.id });
    dynamicTableInstance?.reload();
  };

  const columns: TableColumnItem[] = [
    ...baseColumns,
    {
      title: '操作',
      width: 130,
      dataIndex: 'ACTION',
      hideInSearch: true,
      fixed: 'right',
      actions: ({ record }) => [
        {
          label: '编辑',
          onClick: () => {
            openTeacherDrawer(record);
          },
        },
        {
          label: '删除',
          color: 'red',
          modalConfirm: {
            title: '删除',
            content: '你确定要删除吗？',
            okText: '删除',
            onConfirm: () => delRowConfirm(record),
          },
        },
      ],
    },
  ];
</script>
<style lang="less" scoped>
  .content-box {
    padding: 20px;
    background-color: #fff;

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
    }
  }
</style>
