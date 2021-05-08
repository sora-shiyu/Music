<template>
  <div class="BottomPlayer">
    <!-- 歌曲封面 -->
    <div>
      <img class="Musicimg" :src="SongInfo.PicUrl" />
      <img @click="showSongDetailed" class="overlay" src="@/assets/img/Player/Top.svg" />
      <!--  歌曲名以及别名 歌曲作者-->
      <div class="Musicinfo">
        <div class="alias">
          <span>{{SongData.data.name}}</span>
          <span>{{}}</span>
        </div>
        <div>{{SongData.data.artists.name}}</div>
      </div>
      <!-- 爱心 -->
      <div class="like">
        <img src="@/assets/img/Player/like.svg" alt />
      </div>
    </div>
    <MusicPlayer :SongInfo="SongInfo" />
    <div class="right">
      <div>标准</div>

      <img src="@/assets/img/Player/du.svg" />
      <img src="@/assets/img/Player/volume.svg" />
      <div class="volumeSlider">
        <el-slider
          @input="setAudioVolume"
          v-model="AudioVolume"
          :show-tooltip="false"
          input-size="mini"
          :max="100"
        ></el-slider>
      </div>
      <img @click="showMusicList" src="@/assets/img/Player/musicList.svg" />
    </div>
  </div>
</template>
<script>
import MusicPlayer from '@/components/MusicPlayer/Player'
import { useStore } from 'vuex';
import { ref, watch, reactive } from 'vue';
import { GetSongDetailApi } from '@/Api/api.js'

export default {
  name: 'MusicBottomplayer',
  components: {
    MusicPlayer
  },
  setup () {
    const Store = useStore();
    let SongData = reactive({
      data: {
        name: '',
        artists: {
          name: ''
        }

      }
    })
    let SongInfo = ref({
      id: 0,
      vip: false,
      PicUrl: ''
    })
    //AddPlayList setAudioVolume
    watch(() => Store.state.currentPlay, (val) => {
      GetSongDetailApi(val.id).then(res => {
        SongInfo.value = {
          id: val.id,
          vip: res.privileges[0].cp == 0,
          PicUrl: res.songs[0].al.picUrl
        }
        let currentPlay = Store.state.currentPlay;
        currentPlay.PicUrl = SongInfo.value.PicUrl
        Store.commit('setCurrentPlay', currentPlay)
        //privileges[0].cp==0 大概率vip
      })

      SongData.data = val
      Store.dispatch('AddPlayList', val)
    })
    //
    let AudioVolume = ref(0)
    AudioVolume.value = Store.state.AudioVolume

    const method = {
      setAudioVolume (e) {
        AudioVolume.value = e
        Store.commit('setAudioVolume', e)
      },
      showMusicList () {
        Store.commit('setShowPlayList', !Store.state.isShowPlayList)
      },
      showSongDetailed () {
        Store.commit('setShowSongDetailed', !Store.state.isShowSongDetailed)
      }

    }

    return {
      SongData,
      SongInfo,
      ...method,
      AudioVolume
    }
  },
};
</script>

<style  lang='less' scoped>
@back: 33, 33, 36;

.BottomPlayer {
  height: 70px;
  width: 100%;
  background-color: rgb(@back);
  bottom: 0;
  position: absolute;
  cursor: default;
  min-width: 1024px;
  border-top-style: solid;
  border-color: rgb(67, 67, 67);
  border-width: 1px;
  > div:first-child {
    display: flex;
    width: 25%;
  }
  > div:first-child > *,
  > * {
    float: left; //并排
  }
  .Musicimg {
    width: 48px;
    height: 48px;
    margin: 11px;
    border-radius: 8px;
    &:hover {
      filter: blur(1px);
      + .overlay {
        display: block;
      }
    }
  }
  .overlay {
    position: absolute;
    width: 30px;
    height: 30px;
    left: 20px;
    top: 20px;
    display: none;
    &:hover {
      display: block;
    }
  }
  .Musicinfo {
    overflow: hidden;
    height: 48px;
    margin: 11px 0;
    line-height: 24px;
    color: rgb(199, 206, 179);
    font-size: 15px;
    .alias {
      max-width: 150px;
      white-space: nowrap; //文字不换行
      overflow: hidden; //超出不显示
      :first-child:hover {
        color: #fff; //悬浮高亮
      }
      :nth-child(2) {
        color: rgb(96, 96, 96);
      }
    }
  }
  .like {
    height: 70px;
    img {
      width: 26px;
      margin: 11px 0 0 3px;
    }
    img:hover {
      filter: drop-shadow(#ffffff 0px 0);
    }
  }
  .right {
    //绝对定位
    width: 25%;
    > img {
      width: 24px;
      height: 24px;
    }
    > div:first-child {
      position: absolute;
      color: #fff;
      border-style: ridge;
      border-width: 1px;
      padding: 0 4px;
      bottom: 26px;
      right: 220px;
      font-size: 12px;
    }
    :nth-child(2) {
      position: absolute;
      bottom: 23px;
      right: 180px;
    }
    :nth-child(3) {
      position: absolute;
      bottom: 23px;
      right: 140px;
    }
    .volumeSlider {
      width: 70px;
      position: absolute;
      bottom: 33px;
      right: 70px;
    }
    :nth-child(5) {
      position: absolute;
      bottom: 23px;
      right: 20px;
    }
  }
}
</style>

<style lang="less" >
// 音量滑轮样式
.volumeSlider {
  > .el-slider > .el-slider__runway .el-slider__button-wrapper {
    top: -11px;
  }
  > .el-slider > .el-slider__runway:hover {
    padding: 0;
  }
}
</style>

