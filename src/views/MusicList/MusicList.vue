<template>
  <div v-if="PlaylistDetailData && PlaylistData.creator" class="MusicList">
    <div class="TopInfo">
      <img :src="PlaylistData.coverImgUrl" />
      <div>
        <div>
          <span>歌单</span>
          {{PlaylistData.name}}
        </div>
        <div class="creatorInfo">
          <img :src="PlaylistData.creator.avatarUrl" />
          <span>{{PlaylistData.creator.nickname}}</span>
          <span>2020-11-27创建</span>
        </div>
        <div class="data">
          <div @click="PlayAll">
            ▶播放全部
            <span>🞢</span>
          </div>
          <div>🗀 收藏({{PlaylistData.subscribedCount}})</div>
          <div>➚ 分享({{PlaylistData.shareCount}})</div>
          <div>⮋ 下载全部</div>
        </div>
        <div class="Tag">
          <span class="lightWhite">标签：</span>
          <span>{{Tag}}</span>
        </div>
        <div class="count">
          <span class="lightWhite">歌曲：</span>
          <span style="margin-right:10px" class="lightGray">{{PlaylistData.trackIds.length}}</span>
          <span class="lightWhite">播放：</span>
          <span class="lightGray">{{PlaylistData.playCount}}</span>
        </div>
        <div class="description">
          <span>描述：</span>
          <span>{{PlaylistData.description}}</span>
        </div>
      </div>
    </div>

    <div class="Title">
      <span class="title">音乐标题</span>
      <span class="singer">歌手</span>
      <span class="album">专辑</span>
      <span style="color: #999989;overflow: hidden;display: inline-block;margin-left:10px">时长</span>
    </div>

    <div class="resultList">
      <div
        @dblclick="GetId(Data)"
        :class="index%2==0?'isEven':''"
        v-for="(Data,index) in PlaylistDetailData"
        :key="index"
      >
        <span class="gray" style="margin: 0 20px 0 30px;">{{formatIndex(index+1)}}</span>
        <img src="@/assets/img/Player/like.svg" alt />
        <img src="@/assets/img/NavList/down.svg" alt />
        <span class="title">{{Data.name}}</span>
        <span class="singer">{{Data.ar[0].name}}</span>
        <span class="album">{{Data.al.name}}</span>
        <div>{{getDuration(Data.dt)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import {
  GetPlaylistDetailApi,
  GetSongDetailApi,
} from '@/Api/api'
import { computed, onBeforeUnmount, ref } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'MusicList',
  setup () {
    const route = useRoute()
    const store = useStore();
    let id = route.params.value
    if (!id) id = '24381616'
    let PlaylistData = ref([])
    let Tag = ref('')
    let PlaylistDetailData = ref([])
    GetPlaylistDetailApi(id).then(res => {
      PlaylistData.value = res.playlist
      res.playlist.tags.map(tag => {
        Tag.value += tag + '/'
      })
      console.log(res.playlist.trackIds);
      let SongIDList = []
      res.playlist.trackIds.map(trackId => {
        SongIDList.push(trackId.id)
      })
      return SongIDList
    }).then(res => {
      console.log(res);
      GetSongDetailApi(res).then(e => {
        PlaylistDetailData.value = e.songs
      })
    })
    onBeforeUnmount(() => {
      // alert("销毁")
    })
    const SetSongData = Data => {
      let artistsId = '';
      let artistsName = '';
      Data.ar.map(res => {
        artistsId += res.id + '/'
        artistsName += res.name + '/'
      })
      artistsId = artistsId.substring(0, artistsId.length - 1)
      artistsName = artistsName.substring(0, artistsName.length - 1)
      //

      let songData = {
        id: Data.id,
        name: Data.name,
        album: {
          id: Data.al.id,
          name: Data.al.name
        },
        artists: {
          id: artistsId,
          name: artistsName,
        },
        mvid: Data.mv,
        dt: Data.dt

      }
      return songData
    }
    const methods = {
      formatIndex: index => index < 10 ? '0' + index : index,
      GetId: Data => {
        console.log("111", SetSongData(Data));
        store.commit('setCurrentPlay', SetSongData(Data));
      },
      Getheat: heat => Math.floor(heat * 100 / 330000),
      PlayAll () {
        if (PlaylistDetailData.value.length != 0) {
          let SongDatas = [];
          PlaylistDetailData.value.forEach(e => {
            SongDatas.push(SetSongData(e))
          })
          store.commit('setCurrentPlayList', SongDatas);
          store.commit('setCurrentPlay', SongDatas[0]);
        }

      },
      getDuration: dt => {
        let time = Math.floor(dt / 1000)
        let minute = Math.floor(time / 60)
        if (minute < 10) minute = '0' + minute
        let second = time % 60
        if (second < 10) second = '0' + second
        return `${minute}:${second}`;
      }

    }
    return {
      PlaylistData,
      Tag,
      PlaylistDetailData,
      ...methods
    }
  }
}
</script>

<style lang='less' scoped>
.MusicList {
  margin: 30px 25px 0 25px;
  .TopInfo {
    // height: 185px;
    // height: auto;

    > img {
      height: 185px;
      width: 185px;
      border-radius: 10px;
      margin-right: 20px;
      float: left;
    }
    > div {
      // height: 185px;
      margin-left: 210px;

      > div:first-child {
        color: rgb(208, 208, 208);
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 20px;
        > span {
          color: red;
          font-size: 12px;
          font-weight: 100;
          border-radius: 3px;
          border: 1px solid rgb(158, 56, 56);
          padding: 1px 3px;
          margin-right: 10px;
        }
      }

      .creatorInfo {
        > img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          display: inline-block;
        }
        > * {
          vertical-align: middle;
          margin-right: 10px;
          font-size: 13px;
        }
        span:nth-child(2) {
          color: rgb(133, 171, 183);
          &:hover {
            color: rgb(179, 206, 229);
          }
        }
        span:last-child {
          color: rgb(135, 135, 135);
        }
      }
      .data {
        margin-top: 20px;
        > div:first-child {
          background-color: rgb(236, 65, 65) !important;
          border-color: #fff0;
          color: #fff;
          > span {
            border-left-style: solid;
            border-width: 1px;
            padding-left: 5px;
            border-color: #fff4;
          }
        }
        > div:hover {
          background-color: rgb(52, 52, 52);
        }
        > * {
          display: inline-block;
          color: #fff9;
          border-radius: 30px;
          padding: 6px 15px;
          margin-right: 5px;
          border: 1px solid #fff6;
        }
      }
      .Tag {
        font-size: 14px;
        margin-top: 10px;
        :last-child {
          color: rgb(133, 185, 230);
        }
      }
      .count {
        font-size: 14px;
        margin-top: 9px;
      }
      .description {
        font-size: 14px;
        .lightWhite();
        > span:first-child {
          float: left;
        }
        > span:last-child {
          .lightGray();
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
          &:hover {
            white-space: normal;
          }
        }
      }
    }
  }
}
.Title {
  clear: both;
  font-size: 14px;
  margin-bottom: 10px;
  margin-top: 20px;
  > span:first-child {
    margin-left: 133px;
  }
}
.title {
  width: 34%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #cacaca;
}
.singer {
  width: 18%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999989;
}
.album {
  width: 22%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999989;
}
.resultList {
  > div {
    height: 35px;
    border-radius: 5px;
    &:hover {
      background-color: rgb(55, 55, 55);
    }
    > img {
      width: 24px;
      margin-right: 5px;
    }
    > * {
      display: inline-block;
      overflow: hidden;
      vertical-align: -webkit-baseline-middle;
      font-size: 14px;
    }
    > span:first-child {
      width: 25px;
    }
    > div {
      margin-left: 10px;
      color: #999989;
    }
  }
  .isEven {
    background-color: rgb(46, 46, 46);
  }
}
.lightWhite {
  color: rgb(208, 208, 208);
}
.lightGray {
  color: rgb(129, 135, 122);
}
</style>
