<template>
  <Layout>
    <Layout>
      <div class="top-header">
        <Logo />
        <div>勤学善思 励志笃行</div>
        <a-button type="primary" ghost>返回校园应用</a-button>
      </div>
    </Layout>
    <Layout class="layout">
      <Layout.Sider
        v-if="layoutSetting.layout === 'sidemenu'"
        v-model:collapsed="collapsed"
        :width="asiderWidth"
        :trigger="null"
        collapsible
        :theme="getTheme"
        class="layout-sider"
      >
        <AsideMenu :collapsed="collapsed" :theme="getTheme" />
      </Layout.Sider>
      <Layout>
        <PageHeader v-model:collapsed="collapsed" :theme="getTheme">
          <template v-if="layoutSetting.layout === 'topmenu'" #left>
            <Logo :collapsed="collapsed" />
          </template>
          <template v-if="layoutSetting.layout === 'topmenu'" #menu>
            <AsideMenu :collapsed="collapsed" :theme="getTheme" />
          </template>
        </PageHeader>
        <Layout.Content class="layout-content">
          <tabs-view />
        </Layout.Content>
        <PageFooter />
      </Layout>
    </Layout>
  </Layout>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { Layout } from 'ant-design-vue';
  import Logo from './logo/index.vue';
  import { TabsView } from './tabs';
  import AsideMenu from './menu/menu.vue';
  import PageHeader from './header/index.vue';
  import PageFooter from './footer';
  import { useLayoutSettingStore } from '@/store/modules/layoutSetting';

  const layoutSettingStore = useLayoutSettingStore();
  const { layoutSetting } = storeToRefs(layoutSettingStore);
  const collapsed = ref<boolean>(false);
  // 自定义侧边栏菜单收缩和展开时的宽度
  const asiderWidth = computed(() => (collapsed.value ? 80 : 220));
  const getTheme = computed(() => (layoutSetting.value.navTheme === 'light' ? 'light' : 'dark'));
</script>

<style lang="less" scoped>
  .top-header {
    display: flex;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: space-between;
    height: var(--app-header-height);
    padding: 10px 20px;
    background-color: #f1f8ff;
    box-shadow: 0 3px 12px 0 rgb(156 169 187 / 40%);
    color: #2e3649;
    font-size: 17px;
    font-style: normal;
  }

  .layout {
    display: flex;
    height: 100vh;
    overflow: hidden;

    .ant-layout {
      overflow: hidden;
    }

    .layout-content {
      flex: none;
    }
  }
</style>
