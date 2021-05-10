<template>
  <div v-if="BannersData" class="turn">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(Banners,index) in BannersData" :key="index">
        <img class="BannersImage" :src="Banners.imageUrl+ '?param=2000y1000'" />
        <div
          :style="{backgroundColor: Banners.titleColor=='red'?'rgb(204,74,74)':'rgb(74,121,204)'}"
          class="typeTitle"
        >{{Banners.typeTitle}}</div>
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="recommendedSong">
    <div class="title2">
      <span>推荐歌单</span>
      <img src="@/assets/img/Player/Top.svg" />
    </div>
    <div class="List">
      <div
        @click="clickSongList(Data.id)"
        :style="{width:divWidth(5)+'px',height:divWidth(5)+70+'px'}"
        v-for="(Data,index) in PersonalizedData"
        :key="index"
      >
        <div>
          <img class="ListPic" :src="Data.picUrl" />
          <div class="playCount">▷ {{playCountToW(Data.playCount)}}</div>
          <div class="playButton">
            <span>▶</span>
          </div>
          <div></div>
        </div>
        <span>{{Data.name}}</span>
      </div>
    </div>
  </div>

  <div class="exclusive">
    <div class="title2">
      <span>独家放送</span>
      <img src="@/assets/img/Player/Top.svg" />
    </div>
    <div class="List">
      <div
        :style="{width:divWidth(3)+'px',height:divWidth(3)*0.58+70+'px'}"
        v-for="(Data,index) in PrivateContentData"
        :key="index"
      >
        <div>
          <img class="ListPic" :src="Data.sPicUrl" />
          <!-- <div class="playCount">▷ {{playCountToW(Data.playCount)}}</div> -->
          <div class="playButton">
            <span>▶</span>
          </div>
          <div></div>
        </div>
        <span>{{Data.name}}</span>
      </div>
    </div>
  </div>
  <div class="newSong">
    <div class="title2">
      <span>最新音乐</span>
      <img src="@/assets/img/Player/Top.svg" />
    </div>
    <div class="newSongList">
      <div
        :style="{width:divWidth(3)+'px',height:'50px'}"
        v-for="(Data,index) in GetTopSongData"
        :key="index"
      >
        <img class="newSongListPic" :src="Data.PicUrl" />
        <!-- <img
          class="newSongListPic"
          src="http://p4.music.126.net/rKjgA6ietsSS-hIpl_RdUA==/109951165933857216.jpg"
        />-->
        <div class="newSongInfo">
          <div>
            {{Data.name}}
            <span v-if="Data.alias">({{Data.alias}})</span>
          </div>
          <div>
            <span v-if="Data.sq">S Q</span>
            <span v-if="Data.mv">MV▸</span>
            {{Data.ar_name}}
          </div>
        </div>
        <div>
          <span>▶</span>
        </div>
      </div>
    </div>
  </div>
  <div class="推荐MV">
    <div class="title2">
      <span>推荐MV</span>
      <img src="@/assets/img/Player/Top.svg" />
    </div>
    <div class="List">
      <div
        :style="{width:divWidth(4)+'px',height:divWidth(4)*0.58+70+'px'}"
        v-for="(Data,index) in PersonalizedMvData"
        :key="index"
      >
        <div>
          <img class="ListPic" :src="Data.picUrl" />
          <div class="playCount">▷ {{playCountToW(Data.playCount)}}</div>
          <div></div>
        </div>
        <span>{{Data.name}}</span>
        <div>{{Data.artistName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GetBannersApi,
  GetPersonalizedApi,
  GetPrivateContentApi,
  GetTopSongApi,
  GetPersonalizedMvApi,
} from '@/Api/api'
import { reactive, ref, computed, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router';
export default {
  name: 'MusicRecommend',
  setup () {
    //轮播图数据
    let BannersData = ref([])
    GetBannersApi().then(res => {
      BannersData.value = res.banners
    })
    //推荐歌单
    let PersonalizedData = ref([])
    GetPersonalizedApi(10).then(res => {
      PersonalizedData.value = res.result
    })
    //独家放送
    let PrivateContentData = ref([])
    GetPrivateContentApi().then(res => {
      PrivateContentData.value = res.result
    })
    //推荐新歌
    let TopSongData = ref([])
    GetTopSongApi(0).then(res => {
      TopSongData.value = res.data
      //MVid!=0 Mv
      //fee==8  SQ
    })
    //推荐mv GetPersonalizedMvApi
    let PersonalizedMvData = ref([])
    GetPersonalizedMvApi().then(res => {
      PersonalizedMvData.value = res.result
    })

    //初始化容器宽度
    let contentWidth = ref(document.getElementById("content").clientWidth - 201)
    //监听浏览器窗口变化
    window.onresize = () => {
      //取content宽度
      contentWidth.value = document.getElementById("content").clientWidth - 201
    }
    onBeforeUnmount(() => {
      window.onresize = () => { }
    })
    const computeds = {
      divWidth: computed(() => {
        return function (DivNumber) {
          //margin 30px 间隙20*5 右侧滑块4px
          return ((contentWidth.value - 4 - 25 - 5) / DivNumber) - 20
        }
      }),
      GetTopSongData: computed(() => {
        // console.log(TopSongData);
        let data = []
        TopSongData.value.slice(0, 12).forEach(e => {
          let songData = {};
          songData.name = e.name;
          songData.PicUrl = e.album.picUrl + '?param=100y100';
          songData.sq = e.fee == 8;
          songData.mv = e.mvid != 0
          songData.mvid = e.mvid
          songData.ar_name = e.artists[0].name
          songData.alias = e.alias[0]
          data.push(songData)
        })
        return data
      })
    }

    const Router = useRouter()
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
      BannersData,
      PersonalizedData,
      PrivateContentData,
      TopSongData,
      PersonalizedMvData,
      ...computeds,
      ...methods
    }
  }
};

</script>

<style lang="less" scoped>
.turn {
  margin: 0 25px;
  .BannersImage {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    // object-fit: contain;
  }
  .typeTitle {
    position: absolute;
    bottom: 0px;
    right: 0px;

    border-bottom-right-radius: 10px;
    border-top-left-radius: 10px;
    padding: 5px 12px;
    color: #fff;
    font-size: 12px;
  }
}
.title2 {
  margin: 0 5px 0 25px;
  > * {
    vertical-align: middle;
    &:hover {
      color: #fff;
    }
  }
  > span {
    font-size: 22px;
    font-weight: 900;
    color: #cacaca;
  }
  > img {
    width: 24px;
    height: 24px;
    transform: rotate(90deg);
  }
}
.ListPic {
  width: 100%;
  border-radius: 10px;
}
.List {
  margin: 0 5px 0 25px;
  width: 100%;
  margin-top: 10px;
  overflow: auto;
  > div {
    float: left;
    margin-right: 20px;
    > div:first-child {
      position: relative;
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
.exclusive .playButton {
  top: 10px;
  left: 10px;
  width: 25px;
  height: 25px;
  line-height: 22px;
  color: #fff;
  border-style: solid;
  background: #3e3c3c8f;
  border-width: 1px;
  border-color: #acacac69;
  opacity: 1;
  > span {
    margin-left: 8px;
    font-size: 14px;
  }
}
// .exclusiveList {
//   margin: 0 5px 0 25px;
//   width: 100%;
//   margin-top: 10px;
// }

.newSong {
  .newSongList {
    margin: 0 5px 0 25px;
    width: 100%;
    margin-top: 10px;
    overflow: auto;
    .newSongListPic {
      height: 50px;
      border-radius: 5px;
      float: left;
      width: 50px;
      margin-right: 10px;
    }
    .newSongInfo {
      height: 100%;
      line-height: 25px;
      font-size: 13px;
      > div:first-child {
        color: #cacaca;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        > span {
          color: #999898;
        }
      }
      > div:last-child {
        color: #999898;
        > span {
          color: rgb(236, 65, 65);
          border-style: ridge;
          border-width: 1px;
          padding: 0 1px;
          font-size: 12px;
          border-radius: 3px;
          border-color: rgb(236, 65, 65);
          margin-right: 2px;
        }
      }
    }
    > div {
      float: left;
      margin-bottom: 18px;
      border-radius: 5px;
      margin-right: 20px;
      position: relative;
      &:hover {
        background: #acacac4f;
      }
      > div:last-child {
        color: #ec4141;
        position: absolute;
        top: 10px;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        line-height: 30px;
        background-color: rgba(255, 255, 255, 0.82);
        left: 10px;
        > span {
          margin-left: 9px;
        }
      }
    }
  }
  // .newSongList:after {
  //   content: '.';
  //   display: block;
  //   height: 0;
  //   clear: left;
  //   visibility: hidden;
  // }
}
</style>
<style lang="less" >
.turn {
  .el-carousel__mask {
    background-color: #fff0 !important;
  }
  .el-carousel__indicator {
    .el-carousel__button {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
  }
  .el-carousel__indicators--outside button {
    background-color: rgb(89 91 95) !important;
  }
  .el-carousel__indicator.is-active button {
    background-color: rgb(236, 65, 65) !important;
  }
}
</style>


