<template>
  <div>
    <TopNav :ListData="ListData" />

    <router-view />
  </div>
</template>

<script>
import TopNav from '@/components/TopNav/TopNav'
import { reactive } from 'vue'
export default {
  name: 'VideoHome',
  components: {
    TopNav,
  },
  setup () {
    const ListData = reactive([
      {
        name: '视频',
        path: '/video'
      }, {
        name: 'MV',
        path: '/video/mv'
      },
    ])
    return {
      ListData
    }
  }
};
</script>

<style lang="less" scoped>
</style>