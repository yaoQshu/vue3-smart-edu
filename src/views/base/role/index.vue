<template>
  <div class="content-box">
    <div class="content-box-header">
      <div class="content-box-header-title">角色管理</div>
      <a-button type="primary" @click="openRoleDrawer({})">新增</a-button>
    </div>
    <DynamicTable
      row-key="id"
      :data-request="EduApi.position.pagePosition"
      :columns="columns"
      :row-selection="rowSelection"
      :scroll="{ x: '100%' }"
      size="middle"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, watch } from 'vue';
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import { positionSchemas } from './formSchemas';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/';
  import { useFormDrawer } from '@/hooks/useDrawer';
  import { useBottomSpace } from '@/hooks/useBottomSpace';
  import { EduApi } from '@/api/';

  defineOptions({
    name: 'SystemPosition',
  });

  const [DynamicTable, dynamicTableInstance] = useTable();
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
          await EduApi.position.batchDeletePosition(rowSelection.value.selectedRowKeys);
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

  const [showModal] = useFormModal();
  const [showDrawer] = useFormDrawer();

  const getCheckedKeys = (checkedList: number[], menus: MenuResourceDto[], total = []) => {
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
  const openRoleDrawer = async (record: Partial<TableListItem>) => {
    const [formRef] = await showDrawer({
      drawerProps: {
        title: `${record.id ? '编辑' : '新增'}角色`,
        onFinish: async (values) => {
          record.id && (values.positionId = record.id);
          console.log('values', values);
          const menusRef = formRef?.compRefMap.get('resourceIds')!;
          const params = {
            ...values,
            resourceIds: [...menusRef.halfCheckedKeys, ...menusRef.checkedKeys],
          };
          await EduApi.position.setPosition(params);
          dynamicTableInstance?.reload();
        },
      },
      formProps: {
        labelWidth: 100,
        layout: 'vertical',
        schemas: positionSchemas,
      },
    });

    const menuTreeData = await EduApi.position.allResource({});

    formRef?.updateSchema([
      {
        field: 'resourceIds',
        componentProps: { treeData: menuTreeData },
      },
    ]);
    // 如果是编辑的话，需要获取角色详情
    if (record.id) {
      const positionInfo = await EduApi.position.getPosition({ positionId: record.id });

      formRef?.setFieldsValue({
        ...record,
        resourceIds: getCheckedKeys(positionInfo.resourceIds, menuTreeData),
      });
    }
  };
  const delRowConfirm = async (record: TableListItem) => {
    await EduApi.position.deletePosition({ id: record.id });
    dynamicTableInstance?.reload();
  };

  const columns: TableColumnItem[] = [
    ...baseColumns,
    {
      title: '操作',
      width: 150,
      dataIndex: 'ACTION',
      hideInSearch: true,
      fixed: 'right',
      actions: ({ record }) => [
        {
          label: '编辑',
          onClick: () => {
            openRoleDrawer(record);
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
