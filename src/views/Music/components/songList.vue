<template>
  <div class="songList">
    <div v-if="HighQualityData[0]" class="highQuality">
      <div :style="{ backgroundImage :`url(${HighQualityData[0].coverImgUrl})` }"></div>
      <div>
        <img :src="HighQualityData[0].coverImgUrl" />
        <div>精品歌单</div>
        <div>{{HighQualityData[0].name}}</div>
        <div>{{HighQualityData[0].copywriter}}</div>
      </div>
    </div>
    <div class="songListNav">
      <span>{{mode}}</span>
      <div>
        <span
          @click="clickTag(data.name)"
          v-for="(data,index) in HotTagData"
          :key="index"
        >{{data.name}}</span>
      </div>
    </div>
  </div>
  <div class="detailedList">
    <div
      @click="clickSongList(Data.id)"
      :style="{width:divWidth(5)+'px',height:divWidth(5)+70+'px'}"
      v-for="(Data,index) in PlaylistData"
      :key="index"
    >
      <div>
        <img class="ListPic" :src="Data.coverImgUrl" />
        <div class="playCount">▷ {{playCountToW(Data.playCount)}}</div>
        <div class="playButton">
          <span>▶</span>
        </div>
        <div></div>
      </div>
      <span>{{Data.name}}</span>
    </div>
  </div>
</template>

<script>
import {
  GetHighQualityApi,
  GetPlaylistHotApi,
  GetPlaylistApi
} from '@/Api/api'
import { reactive, ref, compute, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'MusicSonglist',
  setup () {
    //GetHighQualityApi
    const Router = useRouter()
    let HighQualityData = ref([])
    GetHighQualityApi().then(res => {
      HighQualityData.value = res.playlists
    })
    let HotTagData = ref([])
    let mode = ref('全部歌单')
    GetPlaylistHotApi().then(res => {
      HotTagData.value = res.tags

    })
    let PlaylistData = ref([])
    GetPlaylistApi().then(res => {
      PlaylistData.value = res.playlists
    })

    const clickTag = (e) => {
      mode.value = e
      GetHighQualityApi(e).then(res => {
        HighQualityData.value = res.playlists
      })
      GetPlaylistApi(e).then(res => {
        PlaylistData.value = res.playlists
      })

    }
    let contentWidth = ref(document.getElementById("content").clientWidth)
    //监听浏览器窗口变化
    window.onresize = () => {
      //取content宽度
      contentWidth.value = document.getElementById("content").clientWidth
    }
    onBeforeUnmount(() => {
      // alert("歌单销毁")
      window.onresize = () => { }
    })

    const computeds = {
      divWidth: computed(() => {
        return function (DivNumber) {
          //margin 30px 间隙20*5 右侧滑块4px
          return ((contentWidth.value - 4 - 25 - 5) / DivNumber) - 20
        }
      }),
    }
    const methods = {
      playCountToW: (playCount) => {
        return playCount < 10000 ? playCount : Math.floor(playCount / 10000) + '万'
      },
      clickSongList (id) {
        Router.push({
          name: 'MusicList',
          params: {
            value: id
          }
        })
        // Router.push('/musicList', { value: id })
      }



    }

    return {
      HighQualityData,
      HotTagData,
      mode,
      clickTag,
      ...computeds,
      PlaylistData,
      ...methods

    }
  }
};
</script>

<style lang="less" scoped>
.songList {
  margin: 0 25px;
  .highQuality {
    height: 170px;
    width: 100%;
    border-radius: 10px;
    margin-top: 20px;
    overflow: hidden;
    position: relative;
    > div:first-child {
      background-position: center;
      filter: blur(60px);
      height: 100%;
    }
    > div:nth-child(2) {
      position: absolute;
      width: 100%;
      height: 150px;
      top: 10px;
      left: 10px;
      border-radius: 10px;
      > img:first-child {
        width: 150px;
        height: 150px;
        border-radius: 10px;
        float: left;
      }
      > div:nth-child(2) {
        height: 30px;
        width: 100px;
        margin: 20px 0 20px 160px;
        text-align: center;
        line-height: 30px;
        border-style: solid;
        border-radius: 30px;
        border-width: 1px;
        border-color: rgb(231, 170, 90);
        color: rgb(231, 170, 90);
        font-size: 15px;
      }
      > div:nth-child(3) {
        margin-left: 160px;
        color: #fff;
        font-size: 17px;
        margin-bottom: 10px;
      }
      > div:nth-child(4) {
        font-size: 13px;
        color: #999989;
        margin-left: 160px;
      }
    }
  }
  .songListNav {
    height: 30px;
    margin-top: 15px;
    > span {
      color: #d0d0d0;
      border-radius: 30px;
      padding: 2px 10px;
      border: #acacac solid 1px;
    }

    > div {
      float: right;
      > span {
        margin-left: 20px;
        color: #acacac;
        font-size: 12px;
        &:hover {
          color: #d0d0d0;
        }
      }
    }
  }
}
.detailedList {
  margin: 0 5px 0 25px;
  width: 100%;
  margin-top: 10px;
  overflow: auto;
  > div {
    float: left;
    margin-right: 20px;
    > div:first-child {
      position: relative;
      .ListPic {
        width: 100%;
        border-radius: 10px;
      }
      &:hover {
        .playButton {
          opacity: 1;
        }
      }
    }
    > div:last-child {
      color: #999898;
      font-size: 13px;
    }
  }

  .playCount {
    color: #fff;
    position: absolute;
    top: 2px;
    right: 8px;
    font-size: 12px;
  }
  .playButton {
    color: #ec4141;
    position: absolute;
    bottom: 20px;
    right: 20px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    background-color: #f9f2ed;
    opacity: 0;
    transition: all 1s;
    > span {
      margin-left: 9px;
    }
  }
  > div > span {
    color: #cacaca;
    font-size: 15px;
    // height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    //强制超出两行显示...
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    &:hover {
      color: #fff;
    }
  }
}
</style>