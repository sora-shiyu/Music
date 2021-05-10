<template>
  <div class="top">
    <div @click="isNewSong=true" :class="isNewSong?'isActive':''">新歌速递</div>
    <div @click="isNewSong=false" :class="!isNewSong?'isActive':''">新碟上架</div>
  </div>
  <div class="Nav">
    <div>
      <span
        :class="isClick(data.type)"
        @click="switchMode(data)"
        v-for="data in NavList"
        :key="data.type"
      >{{data.name}}</span>
    </div>
    <div class="isNewSongAction" v-if="isNewSong">
      <span>播放全部</span>
      <span>收藏全部</span>
    </div>
    <div class="noNewSongAction" v-else>
      <span @click="isRecommend=true" :class="isRecommend?'noNewSongChoose':''">推荐</span>
      <span @click="isRecommend=false" :class="!isRecommend?'noNewSongChoose':''">全部</span>
    </div>
  </div>
  <div v-if="isNewSong" class="SongDataList">
    <div
      :class=" index%2==0?'SongData odd':'SongData'"
      v-for="(data,index) in TopSongData"
      :key="data.id"
    >
      <span style="margin: 0 25px;width:25px">{{index+1}}</span>
      <div style="margin-right: 10px;position: relative;">
        <div class="playIco">
          <span>▶</span>
        </div>
        <img :src="data.album.picUrl+'?param=200y200'" />
      </div>
      <span style="flex: 3; color:rgb(211,211,211);">{{data.name}}</span>
      <div style="flex: 2;">{{data.artists[0].name}}</div>
      <div style="flex: 2;">{{data.album.name}}</div>
      <div style="flex: 1; text-align: right;margin-right: 25px;">{{data.duration}}</div>
    </div>
  </div>
  <div class="AlbumList" v-else>
    <div v-if="isRecommend && TopAlbumData.weekData" class="weekAlbumList">
      <el-affix @scroll="affixChange" style="float: left;" target=".weekAlbumList" :offset="100">
        <div style="width: 50px;font-size: 20px;color: rgb(208,208,208);">本周新碟</div>
      </el-affix>
      <div class="AlbumListContent">
        <div v-for="(Data,index) in TopAlbumData.weekData" :key="index">
          <div>
            <img class="ListPic" :src="Data.blurPicUrl+'?param=200y200'" />
            <div class="playIco">
              <span>▶</span>
            </div>
            <div></div>
          </div>
          <div>{{Data.name}}</div>
          <div>{{Data.artist.name}}</div>
        </div>
      </div>
    </div>
    <div class="weekAlbumList1">
      <el-affix style="float: left;" target=".weekAlbumList1" :offset="100">
        <div style="width: 50px;font-size: 20px;color: rgb(208,208,208);">本周新碟</div>
      </el-affix>
      <div class="AlbumListContent">
        <div v-for="(Data,index) in TopAlbumData.monthData" :key="index">
          <div>
            <img class="ListPic" :src="Data.blurPicUrl+'?param=200y200'" />
            <div class="playIco">
              <span>▶</span>
            </div>
            <div></div>
          </div>
          <div>{{Data.name}}</div>
          <div>{{Data.artist.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, nextTick, ref, watch, watchEffect } from 'vue';
import {
  GetTopSongApi,
  GetTopAlbumApi,
} from '@/Api/api'
export default {
  name: 'MusicNew',
  setup () {
    //对应type
    const NavList = [
      { name: "全部", type: 0, alias: "ALL" },
      { name: "华语", type: 7, alias: "ZH" },
      { name: "欧美", type: 96, alias: "EA" },
      { name: "韩国", type: 16, alias: "KR" },
      { name: "日本", type: 8, alias: "JP" }
    ]
    //切换新歌速递和新碟上架
    const isNewSong = ref(true)

    //
    let mode = ref(NavList[0])
    let TopSongData = ref([])
    let TopAlbumData = ref({
      weekData: [],
      monthData: []
    })
    let isRecommend = ref(true)

    const methods = {
      switchMode: function (e) {
        mode.value = e

      },
    }
    watch(() => isNewSong.value, () => {
      mode.value = NavList[0]
    })
    watchEffect(() => {
      if (isNewSong.value) {
        GetTopSongApi(mode.value.type).then(res => {
          TopSongData.value = res.data
          //MVid!=0 Mv
          //fee==8  SQ
        })
      } else {
        //  * area: ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
        //  * type : new:全部 hot:热门,默认为 new
        console.log(isRecommend);
        GetTopAlbumApi(mode.value.alias, isRecommend.value ? 'new' : 'hot').then(res => {
          if (res.code == 200) {
            TopAlbumData.value.weekData = res.weekData == [] ? undefined : res.weekData
            TopAlbumData.value.monthData = res.monthData.slice(0, 30)
          }
        })

      }

    })
    const isClick = computed(() => {
      return type => {
        if (type == mode.value.type) return 'weight'
      }
    })
    const affixChange = e => {

    }



    return {
      NavList,
      isNewSong,
      isRecommend,
      TopSongData,
      ...methods,
      isClick,
      TopAlbumData,
      affixChange
    }
  }
};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  justify-content: space-around;
  border-radius: 30px;
  border: 1px solid rgb(102, 102, 102);
  width: 224px;
  margin: 20px auto;
  color: rgb(122, 135, 135);
  font-size: 13px;
  > * {
    display: inline-block;
    padding: 5px 30px;
  }
  .isActive {
    border-radius: 30px;
    background: rgb(102, 102, 102);
    color: rgb(255, 255, 255);
  }
}
.Nav {
  margin: 0 25px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 20px;
  > div:first-child {
    > span {
      color: #878787;
      margin-right: 20px;
      &:hover {
        color: rgb(208, 208, 208);
      }
    }
  }
  .isNewSongAction {
    > span:last-child {
      background-color: rgba(245, 245, 245, 0%);
      border: 1px solid #9c9c9c4a;
    }
    > span {
      color: #fff;
      padding: 2px 15px;
      border-radius: 30px;
      background-color: rgb(236, 65, 65);
      margin-left: 10px;
    }
  }
  .noNewSongAction {
    > span {
      // color: rgb(236, 65, 65);
      color: rgb(135, 135, 135);
      padding: 2px 15px;
      border-radius: 30px;
      // background-color: rgba(236, 65, 65, 0.205);
      margin-left: 10px;
    }
  }
}
.noNewSongChoose {
  color: rgb(236, 65, 65) !important;
  background-color: rgba(236, 65, 65, 0.205);
}
.SongDataList {
  color: rgb(137, 137, 137);
  font-size: 14px;
  .SongData {
    display: flex;
    height: 80px;
    align-items: center;
    &:hover {
      background-color: rgb(55, 55, 55);
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: 5px;
    }
  }
}
.AlbumList {
  margin: 0 25px;
  .weekAlbumList1,
  .weekAlbumList {
    > .AlbumListContent {
      // display: flex;
      // flex-wrap: wrap;
      font-size: 14px;
      display: grid;
      justify-content: space-between;
      grid-template-columns: repeat(auto-fill, 200px);
      grid-gap: 10px;
      > div {
        &:hover {
          .playIco {
            opacity: 1;
          }
        }
        position: relative;
        > :nth-child(2) {
          color: rgb(208, 208, 208);
        }
        > :nth-child(3) {
          color: rgb(102, 102, 102);
        }
        img {
          border-radius: 10px;
        }
        .playIco {
          opacity: 0;
          transition: 1s;
          color: #ec4141;
          position: absolute;
          top: 75px;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          background-color: rgba(255, 255, 255, 0.82);
          left: 75px;
          display: flex;
          align-items: center;
          justify-content: center;
          > span {
            font-size: 26px;
            margin: 0;
          }
        }
      }

      // > :last-child:nth-child(4n - 1) {
      //   margin-right: calc(24% + 9% / 3);
      // }
      // /* 如果最后一行是2个元素 */
      // > :last-child:nth-child(4n - 2) {
      //   margin-right: calc(48% + 12% / 3);
      // }
    }
  }
}
.odd {
  background-color: rgb(46, 46, 46);
}
.playIco {
  color: #ec4141;
  position: absolute;
  top: 15px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  background-color: rgba(255, 255, 255, 0.82);
  left: 15px;
  > span {
    margin-left: 9px;
  }
}
.weight {
  font-weight: bold;
  color: rgb(208, 208, 208) !important;
}
</style>