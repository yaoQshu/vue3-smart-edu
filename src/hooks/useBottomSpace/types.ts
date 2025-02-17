import type { DrawerProps } from 'ant-design-vue';

export interface HookDrawerProps extends Partial<DrawerProps> {
  isAppChild?: boolean;
  content?: string | JSX.Element | (() => JSX.Element);
  closeDrawer?: () => void;

  onOk?: (e: MouseEvent & KeyboardEvent) => any;
  onCancel?: (e: MouseEvent & KeyboardEvent) => any;
}

export interface FormDrawerProps<T extends object = Recordable> extends HookDrawerProps {
  /**
   *
   * @name 表单结束后调用
   */
  onFinish?: (formData: Objectable<T>) => Promise<boolean | void>;
  /**
   *
   * @name 表单验证失败时调用
   */
  onFail?: (formData: Objectable<T>) => any;
}
