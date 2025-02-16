import { defineComponent, watch, ref, computed, unref } from 'vue';
import { omit } from 'lodash-es';
import { CustomBottomSpace } from '@/components/business/bottom-space';
import { isFunction } from '@/utils/is';

export type MyBottomSpaceInstance = InstanceType<typeof CustomBottomSpace>;

export const MyBottomSpace = defineComponent({
  props: {
    content: {
      type: [String, Function] as PropType<string | JSX.Element | (() => JSX.Element)>,
    },
    closeBottomSpace: Function as PropType<any['closeBottomSpace']>,
    visible: Boolean,
  },
  setup(props, { attrs, expose }) {
    const propsRef = ref<any>({ ...attrs, ...props });

    const getProps = computed(() => {
      return { ...attrs, ...props, ...unref(propsRef) };
    });

    const bindValues = computed(() => {
      const _props = unref(getProps);

      return {
        ...omit(_props, ['onCancel', 'content']),
        visible: _props.visible,
      };
    });

    const setProps = (props: any) => {
      propsRef.value = {
        ...unref(getProps),
        ...props,
      };
    };

    watch(
      () => propsRef.value.visible,
      (val) => {
        Object.is(val, false) && props.closeBottomSpace?.();
      },
    );

    expose({
      setProps,
    });

    return () => {
      const _props = unref(getProps);
      const { content } = _props;

      const Content = isFunction(content) ? content() : content;

      return <CustomBottomSpace {...unref(bindValues)}>{Content}</CustomBottomSpace>;
    };
  },
});
