<template>
  <DynamicTable
    row-key="id"
    :data-request="EduApi.student.pageStudent"
    :columns="columns"
    :row-selection="rowSelection"
    :scroll="{ x: '100%' }"
    size="middle"
  />
</template>

<script lang="tsx" setup>
  import { ref, computed, watch } from 'vue';
  import { baseColumns, type TableListItem, type TableColumnItem } from './studentInfoColumns';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/';
  import { useFormDrawer } from '@/hooks/useDrawer';
  import { useBottomSpace } from '@/hooks/useBottomSpace';
  import { EduApi, Api } from '@/api/';
  defineOptions({
    name: 'StudentInfo',
  });

  const [DynamicTable, dynamicTableInstance] = useTable();

  const [showModal] = useFormModal();
  const [showDrawer] = useFormDrawer();
  const [fnBottomSpace] = useBottomSpace();
  const rowSelection = ref({
    selectedRowKeys: [] as number[],
    onChange: (selectedRowKeys: number[], selectedRows: TableListItem[]) => {
      rowSelection.value.selectedRowKeys = selectedRowKeys;
    },
  });

  // 是否勾选了表格行
  const isCheckRows = computed(() => rowSelection.value.selectedRowKeys.length);

  watch(isCheckRows, (val) => {
    if (isCheckRows.value) {
      fnBottomSpace.show({
        onOk: () => {
          console.log('确定');
        },
      });
    } else {
      fnBottomSpace.hide();
    }
  });

  const hideBottomSpace = () => {
    rowSelection.value.selectedRowKeys = [];
    fnBottomSpace.hide();
  };

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

  const openTeacherDrawer = async (record: Partial<TableListItem>) => {
    const [formRef] = await showDrawer({
      drawerProps: {
        title: `${record.id ? '编辑' : '新增'}教师`,
      },
      formProps: {
        labelWidth: 100,
        schemas: teacherSchemas,
        layout: 'vertical',
      },
    });
  };

  /**
   * @description 打开新增/编辑弹窗
   */
  const openMenuModal = async (record: Partial<TableListItem>) => {
    const [formRef] = await showModal({
      modalProps: {
        title: `${record.id ? '编辑' : '新增'}角色`,
        width: '50%',
        onFinish: async (values) => {
          record.id && (values.roleId = record.id);
          const menusRef = formRef?.compRefMap.get('menuIds')!;
          const params = {
            ...values,
            menuIds: [...menusRef.halfCheckedKeys, ...menusRef.checkedKeys],
          };
          console.log('新增/编辑角色', params);
          if (record.id) {
            await Api.systemRole.roleUpdate({ id: record.id }, params);
          } else {
            await Api.systemRole.roleCreate(params);
          }

          dynamicTableInstance?.reload();
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: roleSchemas,
      },
    });

    const menuTreeData = await Api.systemMenu.menuList({});

    formRef?.updateSchema([
      {
        field: 'menuIds',
        componentProps: { treeData: menuTreeData },
      },
    ]);
    // 如果是编辑的话，需要获取角色详情
    if (record.id) {
      const roleInfo = await Api.systemRole.roleInfo({ id: record.id });

      formRef?.setFieldsValue({
        ...record,
        menuIds: getCheckedKeys(roleInfo.menuIds, menuTreeData),
      });
    }
  };
  const delRowConfirm = async (record: TableListItem) => {
    await Api.systemRole.roleDelete({ id: record.id });
    dynamicTableInstance?.reload();
  };

  defineExpose({
    hideBottomSpace,
  });

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
            openMenuModal(record);
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
<style lang="less" scoped></style>
