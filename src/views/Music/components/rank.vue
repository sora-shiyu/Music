<template>
  <div class="rank">
    <div class="title">官方榜</div>
    <!-- <div>{{TopListData.top5}}</div> -->
    <div class="TopRank" v-for="topData in TopListData.top5" :key="topData.id">
      <img @click="clickSongList(topData.id)" :src="topData.coverImgUrl+'?param=200y200'" />
      <div>
        <div
          class="TopRankSongList"
          @dblclick="clickRankSong(song.id)"
          v-for="(song,index) in topData.songList"
          :key="song.id"
        >
          <div>{{index+1}}</div>
          <div>-</div>
          <div>
            {{song.name}}
            <span v-if="song.alias">({{song.alias}})</span>
          </div>
          <div>{{song.ar_name}}</div>
        </div>
      </div>
    </div>
    <div class="title">全球榜</div>
    <div class="detailedList">
      <div @click="clickSongList(Data.id)" v-for="(Data,index) in TopListData.other" :key="index">
        <div>
          <img class="ListPic" :src="Data.coverImgUrl+'?param=200y200'" />
          <div class="playCount">▷ {{Data.playCount}}</div>
          <div class="playButton">
            <span>▶</span>
          </div>
          <div></div>
        </div>
        <span>{{Data.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>

import {
  GetTopListDetailApi,
  GetPlaylistDetailApi,
} from '@/Api/api'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import { ref } from 'vue'
export default {
  name: 'rank',
  setup () {
    let TopListData = ref({
      top5: [],
      other: []
    })
    async function GetData () {
      let res = await GetTopListDetailApi()
      let list = [];
      let other = []
      if (res.code == 200) {
        list = res.list.slice(0, 4) || []
        list.map(data => {
          GetPlaylistDetailApi(data.id).then(e => {
            if (e.code == 200) {
              let { name, id, playCount, coverImgUrl, updateTime, tracks } = e.playlist
              let songList = []
              tracks = tracks.slice(0, 5)
              tracks.map(e => {
                let { name, id, alia, ar: { 0: { name: ar_name } }, ar: { 0: { id: ar_id } } } = e
                let alias = ''
                if (alia.length) alias = alia[0]
                songList.push({
                  name, id, ar_name, ar_id, alias
                })
              })
              TopListData.value.top5.push({ name, id, playCount, coverImgUrl, updateTime, songList })
            }
          })
        })
        other = res.list.slice(4, res.list.length) || []
        console.log(other);
        other.map(e => {
          let { name, id, playCount, coverImgUrl } = e
          playCount = Math.floor(playCount / 10000) + '万'
          TopListData.value.other.push({
            name, id, playCount, coverImgUrl
          })
        })

      }

    }
    GetData()
    const store = useStore();
    const Router = useRouter()
    function clickRankSong (id) {
      store.commit('setCurrentPlay', { id });
    }
    function clickSongList (id) {
      Router.push({
        name: 'MusicList',
        params: {
          value: id
        }
      })
      // Router.push('/musicList', { value: id })
    }
    return {
      TopListData,
      clickRankSong,
      clickSongList
    }
  }
}
</script>

<style lang='less' scoped>
.rank {
  margin: 0 25px;
  .title {
    font-size: 26px;
    font-weight: 900;
    margin: 10px 0;
    color: rgb(208, 208, 208);
  }
}
.TopRank {
  display: flex;
  font-size: 14px;
  margin-bottom: 50px;
  > img {
    width: 170px;
    height: 170px;
    margin-right: 40px;
    border-radius: 10px;
  }
  > div {
    width: 100%;
  }

  .TopRankSongList {
    color: rgb(104, 104, 104);
    clear: both;
    height: 30px;
    line-height: 34px;
    border-radius: 5px;
    margin: 2px 0;
    > div {
      display: inline-block;
    }
    &:nth-child(odd) {
      background-color: rgb(46, 46, 46);
    }
    &:nth-child(-n + 3) {
      > div:first-child {
        color: rgb(207, 57, 55);
      }
    }
    &:hover {
      background-color: rgb(51, 51, 51);
    }
    > div:first-child {
      margin: 0 10px;
    }
    > div:nth-child(2) {
      width: 35px;
      text-align: center;
    }
    > div:nth-child(3) {
      color: rgb(209, 209, 209);
      > span {
        color: rgb(104, 104, 104);
      }
    }
    > div:last-child {
      float: right;
    }
  }
}
.detailedList {
  color: rgb(182, 208, 202);
  font-size: 15px;
  width: 100%;
  margin-top: 10px;
  overflow: auto;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-gap: 10px;
  > div {
    width: 150px;
    height: 180px;
    margin-bottom: 20px;
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
</style>
