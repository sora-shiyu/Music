<template>
  <TopNav :ListData="ListData" />
  <div class="content">
    <router-view />
  </div>
</template>

<script>
import TopNav from '@/components/TopNav/TopNav'
import { reactive } from 'vue'
export default {
  name: 'MusicHome',
  components: {
    TopNav,
  },
  setup () {
    const ListData = reactive([
      {
        name: '个性推荐',
        path: '/home/recommend'
      }, {
        name: '歌单',
        path: '/home/songList'
      }, {
        name: '主播电台',
        path: '/home/MusicStation'
      }, {
        name: '排行榜',
        path: '/home/rank'
      }, {
        name: '歌手',
        path: '/home/singer'
      }, {
        name: '最新音乐',
        path: '/home/new'
      },
    ])
    return {
      ListData
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  overflow-y: auto;
  height: 90%;
  overflow-x: hidden;
}
</style>