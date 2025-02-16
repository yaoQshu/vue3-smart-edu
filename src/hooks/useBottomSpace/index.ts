import { installUseBottomSpace, useBottomSpace } from './useBottomSpace';
import type { App } from 'vue';

const install = (app: App) => {
  installUseBottomSpace(app);
};

export { useBottomSpace, install };

export default install;
