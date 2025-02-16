import { nextTick, ref, unref } from 'vue';
import { omit } from 'lodash-es';
import { useDrawer } from './useDrawer';
import type { SchemaFormProps } from '@/components/core/schema-form';
import type { FormDrawerProps } from './types';
import { SchemaForm } from '@/components/core/schema-form';

interface ShowDrawerProps<T extends object = Recordable> {
  drawerProps: FormDrawerProps<T>;
  formProps: Partial<SchemaFormProps<T>>;
}

export function useFormDrawer<T extends object = Recordable>() {
  const [DrawerRender] = useDrawer();

  const showDrawer = async <P extends object = T>({
    drawerProps,
    formProps,
  }: ShowDrawerProps<P>) => {
    const formRef = ref<InstanceType<typeof SchemaForm>>();

    const onCancel = (e: MouseEvent & KeyboardEvent) => {
      // formRef.value?.resetFields();
      drawerProps?.onCancel?.(e);
    };

    const onOk = async () => {
      console.log('onOk', 2222);
      // const values = (formRef?.formModel || {}) as any;
      try {
        const values = await formRef.value?.submit();
        await onSubmit(values);
      } catch (error) {
        drawerProps?.onFail?.({} as any);
        return Promise.reject(error);
      }
    };

    const onSubmit = async (values) => {
      await drawerProps?.onFinish?.(values);
      // formRef.value?.resetFields();
      DrawerRender.hide();
    };

    await DrawerRender.show({
      ...omit(drawerProps, ['onFinish', 'onFail']),
      onCancel,
      onOk,
      content: () => {
        const _formProps = Object.assign({}, { showActionButtonGroup: false }, formProps);

        return <SchemaForm ref={formRef} {..._formProps}></SchemaForm>;
      },
    });

    await nextTick();

    return [unref(formRef)] as const;
  };

  return [showDrawer, DrawerRender] as const;
}
