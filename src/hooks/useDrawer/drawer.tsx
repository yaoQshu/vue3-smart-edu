import { ref, unref, watch, computed, defineComponent, type SetupContext } from 'vue';
import { omit } from 'lodash-es';
import type { HookDrawerProps } from './types';
import { isFunction } from '@/utils/is';
import { MyDrawer } from '@/components/basic/drawer';

export type DrawerWrapperInstance = InstanceType<typeof DrawerWrapper>;

// 定义一个通用的 Drawer 组件
export const DrawerWrapper = defineComponent({
  props: {
    content: {
      type: [String, Function] as PropType<string | JSX.Element | (() => JSX.Element)>,
    },
    closeDrawer: Function as PropType<HookDrawerProps['closeDrawer']>,
    open: Boolean,
  },
  setup(props, { attrs, expose }: SetupContext) {
    const propsRef = ref<HookDrawerProps>({ ...attrs, ...props });

    const getProps = computed(() => {
      return { ...attrs, ...props, ...unref(propsRef) };
    });

    const bindValues = computed(() => {
      const _props = unref(getProps);

      return {
        ...omit(_props, ['onCancel', 'onOk', 'closeDrawer', 'content']),
        open: _props.open,
        onCancel: handleCancel,
        onOk: handleConfirm,
      };
    });

    const setVisible = (open: boolean) => {
      propsRef.value.open = open;
    };

    const setProps = (props: HookDrawerProps) => {
      propsRef.value = {
        ...unref(getProps),
        ...props,
      };
    };

    watch(
      () => propsRef.value.open,
      (val) => {
        Object.is(val, false) && props.closeDrawer?.();
      },
    );

    const handleConfirm = async (e: MouseEvent & KeyboardEvent) => {
      try {
        await unref(getProps)?.onOk?.(e);
        setVisible(false);
      } catch (error) {
        return Promise.reject(error);
      }
    };

    const handleCancel = async (e: MouseEvent & KeyboardEvent) => {
      await unref(getProps)?.onCancel?.(e);
      setVisible(false);
    };

    expose({
      setProps,
    });

    return () => {
      const _props = unref(getProps);
      const { content } = _props;

      const Content = isFunction(content) ? content() : content;

      return <MyDrawer {...unref(bindValues)}>{Content}</MyDrawer>;
    };
  },
});
