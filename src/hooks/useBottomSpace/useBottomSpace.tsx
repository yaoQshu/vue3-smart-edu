import { createVNode, ref, render, getCurrentInstance, nextTick } from 'vue';
import { MyBottomSpace, type MyBottomSpaceInstance } from './bottomSpace';
import type { App, ComponentInternalInstance, FunctionalComponent } from 'vue';
let _app: App;

export const useBottomSpace = () => {
  let _bottomSpaceInstance: ComponentInternalInstance;
  const bottomSpaceRef = ref<MyBottomSpaceInstance>();
  const appContext = _app?._context || getCurrentInstance()?.appContext;
  // 当前模态框是否处于App.vue上下文中
  const isAppChild = ref(false);

  const getBottomSpaceInstance = async () => {
    await nextTick();
    if (isAppChild.value && bottomSpaceRef.value) {
      return bottomSpaceRef.value;
    }

    if (_bottomSpaceInstance) {
      return _bottomSpaceInstance;
    }
    const container = document.createElement('div');
    const vnode = createVNode(MyBottomSpace);
    vnode.appContext = appContext;
    render(vnode, container);
    _bottomSpaceInstance = vnode.component!;
    _bottomSpaceInstance.props.closeBottomSpace = hide;
    return _bottomSpaceInstance;
  };

  const setProps = async (_props) => {
    const instance = await getBottomSpaceInstance();
    if (Object.is(instance, bottomSpaceRef.value)) {
      // @ts-ignore
      instance?.setProps?.(_props);
    } else {
      // @ts-ignore
      instance?.exposed?.setProps?.(_props);
    }
  };

  const hide = () => {
    setProps({ visible: false });
  };

  const show = async (props: any) => {
    setProps({
      ...props,
      closeBottomSpace: hide,
      visible: true,
    });

    await nextTick();
  };

  interface BottomSpaceRenderComp<T> extends FunctionalComponent<T> {
    show: typeof show;
    hide: typeof hide;
    setProps: typeof setProps;
  }

  const BottomSpaceRender: BottomSpaceRenderComp<any> = (props, { attrs, slots }) => {
    isAppChild.value = true;
    return <MyBottomSpace ref={bottomSpaceRef} {...{ ...attrs, ...props }} v-slots={slots} />;
  };

  BottomSpaceRender.show = show;
  BottomSpaceRender.hide = hide;
  BottomSpaceRender.setProps = setProps;

  // ;[show, hide].forEach(fn => BottomSpaceRender[fn.name] = fn)

  return [BottomSpaceRender, bottomSpaceRef] as const;
};

export type BottomSpaceInstance = ReturnType<typeof useBottomSpace>;

export const installUseBottomSpace = (app: App) => {
  _app = app;
};
