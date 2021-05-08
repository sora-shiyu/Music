<template>
  <div class="Search">
    <div class="Title">
      <span class="title">音乐标题</span>
      <span class="singer">歌手</span>
      <span class="album">专辑</span>
      <span style="color: #999989;overflow: hidden;display: inline-block;">热度</span>
    </div>

    <div v-if="SearchData.songs" class="resultList">
      <div
        @dblclick="GetId(Data)"
        :class="index%2==0?'isEven':''"
        v-for="(Data,index) in SearchData.songs"
        :key="index"
      >
        <span class="gray" style="margin: 0 20px 0 30px;">{{formatIndex(index+1)}}</span>
        <img src="@/assets/img/Player/like.svg" alt />
        <img src="@/assets/img/NavList/down.svg" alt />
        <span class="title">{{Data.name}}</span>
        <span class="singer">{{Data.artists[0].name}}</span>
        <span class="album">{{Data.album.name}}</span>
        <div class="duration">
          <div :style="{width:Getheat(Data.duration)+'%'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GetCloudSearchApi,
} from '@/Api/api'
import { ref, watch, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from "vuex";
import TopNav from '@/components/TopNav/TopNav'
export default {
  name: 'song',
  components: {
    TopNav,
  },
  setup (porps, context) {

    const route = useRoute()
    const store = useStore();
    let searchText = route.params.value
    let SearchData = ref([])
    if (!searchText) searchText = '你是我的眼'
    GetCloudSearchApi(searchText, 1, 99).then(res => {
      SearchData.value = res.result
      context.emit("getMessage", res.result.songCount);
    })
    watch(() => store.state.searchText, (val, old) => {

      GetCloudSearchApi(val, 1, 99).then(res => {
        if (res.code == 200) {
          SearchData.value = res.result
          context.emit("getMessage", res.result.songCount);
        }

      })
    })
    // if (!searchText) searchText = '你是我的眼'


    const methods = {
      formatIndex: index => {
        return index < 10 ? '0' + index : index
      },
      GetId: Data => {
        let artistsId = '';
        let artistsName = '';
        Data.artists.map(res => {
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
            id: Data.album.id,
            name: Data.album.name
          },
          artists: {
            id: artistsId,
            name: artistsName,
          },
          mvid: Data.mvid,
          dt: Data.duration
        }
        // console.log("123", songData);
        store.commit('setCurrentPlay', songData);
      },
      Getheat: (heat) => {
        return Math.floor(heat * 100 / 330000)
      }
    }

    return {
      SearchData,
      ...methods
    }
  }
}
</script>

<style lang='less' scoped>
.Search {
  margin: 0 25px;

  .Title {
    font-size: 14px;
    margin-bottom: 10px;
    margin-top: 20px;
    > span:first-child {
      margin-left: 125px;
    }
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
    }
    .isEven {
      background-color: rgb(46, 46, 46);
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
    width: 17%;
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
  .duration {
    width: 80px;
    height: 5px;

    background: rgb(52, 52, 52);
    border-radius: 5px;
    > div {
      border-radius: 5px;
      background: rgb(72, 72, 72);
      // width: 10%;
      height: 5px;
    }
  }
}
</style>
