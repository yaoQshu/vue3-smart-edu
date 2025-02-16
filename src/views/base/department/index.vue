<template>
  <div class="content-box">
    <div class="content-box-header">
      <div class="content-box-header-title">部门管理</div>
      <a-button type="primary" @click="openDepartmentDrawer({})">新增</a-button>
    </div>
    <DynamicTable
      row-key="id"
      :data-request="EduApi.department.pageDepartment"
      :columns="columns"
      :row-selection="rowSelection"
      size="middle"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import { departmentSchemas } from './formSchemas';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/';
  import { useFormDrawer } from '@/hooks/useDrawer';
  import { EduApi } from '@/api/';

  defineOptions({
    name: 'SystemDepartment',
  });

  const rowSelection = ref({
    selectedRowKeys: [] as number[],
    onChange: (selectedRowKeys: number[], selectedRows: TableListItem[]) => {
      rowSelection.value.selectedRowKeys = selectedRowKeys;
    },
  });

  // 是否勾选了表格行
  const isCheckRows = computed(() => rowSelection.value.selectedRowKeys.length);

  const [DynamicTable, dynamicTableInstance] = useTable();

  const [showModal] = useFormModal();
  const [showDrawer] = useFormDrawer();
  const getCheckedKeys = (checkedList: number[], menus: API.MenuItemInfo[], total = []) => {
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
  const openDepartmentDrawer = async (record: Partial<TableListItem>) => {
    const [formRef] = await showDrawer({
      drawerProps: {
        title: `${record.id ? '编辑' : '新增'}部门`,
        onFinish: async (values) => {
          await EduApi.department.setDepartment(values);
          dynamicTableInstance?.reload();
        },
      },
      formProps: {
        labelWidth: 100,
        layout: 'vertical',
        schemas: departmentSchemas,
      },
    });

    const departmentList = await EduApi.department.pageDepartment({ page: 1, pageSize: 100 });
    formRef?.updateSchema([
      {
        field: 'parentId',
        componentProps: { treeData: departmentList },
      },
    ]);

    if (record.id) {
      const departmentInfo = await EduApi.department.getDepartment({ departmentId: record.id });
      formRef?.setFieldsValue({
        ...record,
        id: departmentInfo.departmentId,
      });
    }
  };

  const delRowConfirm = async (record: TableListItem) => {
    await EduApi.department.deleteDepartment({ departmentId: record.id });
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
            openDepartmentDrawer(record);
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
