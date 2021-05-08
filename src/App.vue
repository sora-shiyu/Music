<template>
  <HeadNav />

  <div id="content" class="mian">
    <div v-show="!Song">
      <div class="navlist">
        <Navlist />
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <Song v-if="Song" />
    <PlayList />
  </div>

  <Bottomplayer />
</template>

<script>
import Bottomplayer from '@/components/MusicPlayer/MusicBottomplayer'
import HeadNav from '@/components/HeadNav/HeadNav'
import PlayList from '@/components/MusicPlayer/PlayList'
import Navlist from '@/components/NavList/NavList'
import Song from '@/views/Song/Song'
import { ref, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'MusicApp',
  components: {
    Bottomplayer,
    HeadNav,
    Navlist,
    PlayList,
    Song
  },
  setup () {
    const store = useStore()
    let Song = ref(false)
    watch(() => store.state.isShowSongDetailed, (val) => {
      Song.value = val
    })
    watch(() => store.state.currentPlay, (val) => {
      if (Song.value) {
        Song.value = !Song.value
        nextTick(() => {
          Song.value = !Song.value

        })
      }


    })
    return {
      Song,
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
  > div:first-child {
    width: 100%;
    height: 100%;
  }
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