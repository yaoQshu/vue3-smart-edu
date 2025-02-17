<template>
  <DynamicTable
    row-key="id"
    :data-request="EduApi.student.pageReport"
    :columns="columns"
    :row-selection="rowSelection"
    :scroll="{ x: '100%' }"
    size="middle"
  />
</template>

<script lang="tsx" setup>
  import { ref, computed, watch } from 'vue';
  import { baseColumns, type TableListItem, type TableColumnItem } from './studentReportColumns';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/';
  import { useFormDrawer } from '@/hooks/useDrawer';
  import { useBottomSpace } from '@/hooks/useBottomSpace';
  import { EduApi, Api } from '@/api/';
  defineOptions({
    name: 'NewStudent',
  });

  const emit = defineEmits(['edit']);

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
            emit('edit', record);
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
