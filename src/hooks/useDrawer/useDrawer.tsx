import { ref, getCurrentInstance, nextTick, createVNode, render } from 'vue';
import { DrawerWrapper, type DrawerWrapperInstance } from './drawer';
import type { App, FunctionalComponent, ComponentInternalInstance } from 'vue';
import type { HookDrawerProps } from './types';

let _app: App;

// 定义 useDrawer Hook
export function useDrawer() {
  let _modalInstance: ComponentInternalInstance;
  const drawerRef = ref<DrawerWrapperInstance>();
  const appContext = _app?._context || getCurrentInstance()?.appContext;
  // 当前模态框是否处于App.vue上下文中
  const isAppChild = ref(false);

  const getModalInstance = async () => {
    await nextTick();
    console.log('drawerRef', drawerRef.value);
    if (isAppChild.value && drawerRef.value) {
      return drawerRef.value;
    }

    if (_modalInstance) {
      return _modalInstance;
    }
    const container = document.createElement('div');
    const vnode = createVNode(DrawerWrapper);
    vnode.appContext = appContext;
    render(vnode, container);
    _modalInstance = vnode.component!;
    _modalInstance.props.closeDrawer = hide;
    return _modalInstance;
  };

  const setProps = async (_props) => {
    const instance = await getModalInstance();
    if (Object.is(instance, drawerRef.value)) {
      // @ts-ignore
      instance?.setProps?.(_props);
    } else {
      // @ts-ignore
      instance?.exposed?.setProps?.(_props);
    }
  };

  const hide = () => {
    setProps({ open: false });
  };

  const show = async (props: HookDrawerProps) => {
    setProps({
      ...props,
      closeDrawer: hide,
      open: true,
    });

    await nextTick();
  };

  interface ModalRenderComp<T> extends FunctionalComponent<T> {
    show: typeof show;
    hide: typeof hide;
    setProps: typeof setProps;
  }

  const ModalRender: ModalRenderComp<HookDrawerProps> = (props, { attrs, slots }) => {
    isAppChild.value = true;
    return <DrawerWrapper ref={drawerRef} {...{ ...attrs, ...props }} v-slots={slots} />;
  };

  ModalRender.show = show;
  ModalRender.hide = hide;
  ModalRender.setProps = setProps;

  // ;[show, hide].forEach(fn => ModalRender[fn.name] = fn)

  return [ModalRender, drawerRef] as const;
}

export type DrawerInstance = ReturnType<typeof useDrawer>;

export const installUseDrawer = (app: App) => {
  _app = app;
};
