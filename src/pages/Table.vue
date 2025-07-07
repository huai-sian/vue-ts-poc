<template>
  <div class="w-full p-4">
    <el-tabs v-model="activeTab" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="All" name="all">User</el-tab-pane>
      <el-tab-pane label="Pickups" name="pickups">Config</el-tab-pane>
      <el-tab-pane label="Returns" name="returns">Role</el-tab-pane>
    </el-tabs>
    <el-table :data="data" height="450" style="width: 100%">
      <el-table-column type="selection" width="55" @selection-change="handleSelectionChange" />
      <el-table-column prop="user.username" label="user" />
      <el-table-column prop="user.username" label="user" />
      <el-table-column prop="created_at" label="date"  />
      <el-table-column prop="slug" label="slug" />
    </el-table>
  </div>
  <div class="flex justify-center mt-3">
    <el-pagination
      v-model:current-page="currentPage"
      layout="prev, pager, next, jumper"
      :total="1000"
      @current-change="handleCurrentChange"
    />
  </div>
  <!-- <PhotoWaterfall :count="count" /> -->
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchPhoto } from '../service/unsplash';
import type { UnsplashPhoto } from '../types/photos';
import type { TabsPaneContext } from 'element-plus';

const route = useRoute();
const router = useRouter();
const currentPage = ref(1);
const multipleSelection = ref<UnsplashPhoto[]>([]);
const data = ref<UnsplashPhoto[]>([]);
const activeTab = ref<string>('all');


const handleCurrentChange = async (page: number) => {
  data.value = await fetchPhoto(page);
}

const handleRouteQuery = () => {
  // Ensure tab is a string and fallback to 'all' if not present
  const tab = route.query?.tab;
  activeTab.value = typeof tab === 'string' && tab ? tab : 'all';
}

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(event);
  router.push({ path: '/table', query: { tab: tab.paneName ?? '' } });
}

const handleSelectionChange = () => {
  console.log(multipleSelection);
}


onMounted(() => {
  handleCurrentChange(currentPage.value);
  handleRouteQuery();
  console.log(activeTab.value);
})


</script>
