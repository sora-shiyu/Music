<template>
  <HeadNav />
  <div class="mian">
    <div class="navlist">
      <Navlist />
    </div>
    <div id="content" class="content">
      <PlayList />
      <router-view></router-view>
    </div>
  </div>
  <Bottomplayer />
</template>

<script>
import Bottomplayer from '@/components/MusicPlayer/MusicBottomplayer'
import HeadNav from '@/components/HeadNav/HeadNav'
import PlayList from '@/components/MusicPlayer/PlayList'
import Navlist from '@/components/NavList/NavList'
export default {
  name: 'MusicApp',
  components: {
    Bottomplayer,
    HeadNav,
    Navlist,
    PlayList
  },
  setup () {

    return {
    }
  },
};
</script>

<style lang="less" scoped>
.mian {
  position: absolute;
  top: 63px; //头部导航栏
  bottom: 70px; //底部播放器
  right: 0;
  left: 0;
  overflow: auto;
  background-color: rgb(43, 43, 43);
  .navlist {
    position: absolute;
    width: 200px;
    height: 100%;
    border-right-style: solid;
    border-color: rgb(67, 67, 67);
    border-width: 1px;
  }
  .content {
    width: auto;
    height: 100%;
    margin-left: 201px;
    overflow-y: auto;
  }
}
</style>