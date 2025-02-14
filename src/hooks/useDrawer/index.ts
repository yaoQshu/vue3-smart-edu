import { installUseDrawer, useDrawer } from './useDrawer';
import { useFormDrawer } from './useFormDrawer';
import type { App } from 'vue';

const install = (app: App) => {
  installUseDrawer(app);
};

export { useDrawer, useFormDrawer, install };

export default install;
