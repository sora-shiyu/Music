<template>
  <!-- {{SearchData.songCount}} -->
  <div class="total">
    <span>找到首 {{songCount}} 单曲</span>
  </div>
  <TopNav :ListData="ListData" />
  <div class="content">
    <router-view @getMessage="showMsg" />
  </div>
</template>

<script>
import TopNav from '@/components/TopNav/TopNav'
import { reactive, ref } from 'vue'
export default {
  name: 'MusicHome',
  components: {
    TopNav,
  },
  setup () {
    const ListData = reactive([
      {
        name: '单曲',
        path: '/search/song'
      }, {
        name: '歌手',
        path: '/search/singer'
      }, {
        name: '专辑',
        path: '/home/album'
      }, {
        name: '视频',
        path: '/home/video'
      }, {
        name: '歌单',
        path: '/home/songList'
      }, {
        name: '歌词',
        path: '/home/lyrics'
      },
      {
        name: '主播电台',
        path: '/home/anodolite'
      }, {
        name: '用户',
        path: '/home/user'
      },
    ])
    let songCount = ref(0)
    const showMsg = (msg) => {
      console.log(msg);
      songCount.value = msg
    }
    return {
      ListData,
      songCount,
      showMsg
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  overflow-y: auto;
  height: 78%;
  overflow-x: hidden;
}
.total {
  color: #d0d0d0;
  font-weight: bold;
  font-size: 18px;
  margin: 1% 0 0 25px;
  display: table;
  height: 8%;
  > span {
    display: table-cell;
    vertical-align: middle;
  }
}
</style>