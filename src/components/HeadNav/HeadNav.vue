<template>
  <div class="headNav">
    <div class="logo">
      <img @click="goto('/')" src="@/assets/png/logo.png" />
    </div>
    <div class="search">
      <img @click="previous" src="@/assets/img/TopNav/next.svg" />
      <img src="@/assets/img/TopNav/go.svg" />
      <div class="combination">
        <img @click="searchClick(searchValue)" src="@/assets/img/TopNav/search.svg" />
        <input
          @blur="isSuggestShowDelay(false)"
          @focus="isSuggestShowDelay(true)"
          @keyup.enter="searchClick(searchValue)"
          @input="searchSuggest"
          v-model="searchValue"
          type="text"
          placeholder="搜索"
        />

        <div v-show="isSuggestShow" class="searchSuggest">
          <div v-if="isHot">热搜榜</div>
          <div
            class="relatedResults"
            @click="searchClick(searchValue)"
            v-else
          >搜"{{searchValue}}"相关的结果 ></div>
          <div v-if="isHot" class="searchSuggestList">
            <div
              @click="suggestClick(hotData.searchWord)"
              v-for="(hotData,index) in HotDataList"
              :key="index"
            >
              <div :style="{color:index<3?'rgb(255,58,54)':''}">{{index+1}}</div>
              <div class="searchSuggestInfo">
                <span>{{hotData.searchWord}}</span>
                <img :src="hotData.iconUrl" />
                <span>{{hotData.score}}</span>
              </div>
              <div class="searchSuggestContent">{{hotData.content}}</div>
            </div>
          </div>
          <div class="SearchSuggestObj" v-else>
            <div v-for="order in SearchSuggestObj.order" :key="order">
              <div>{{orderMode(order)}}</div>
              <div
                @click="listClick(order,data)"
                v-for="(data,index) in SearchSuggestObj[order]"
                :key="index"
              >{{getName(order,data)}}</div>
            </div>
          </div>
        </div>
      </div>
      <img src="@/assets/img/TopNav/identify.svg" title="听歌识曲" />
    </div>
    <div class="control">
      <div class="userinfo">
        <div class="userImg">
          <img src="@/assets/img/TopNav/user.svg" />
        </div>
        <span>未登录 ⏷</span>
        <span>开通VIP</span>
      </div>

      <div class="close">
        <img src="@/assets/img/TopNav/mini.svg" />
        <img src="@/assets/img/TopNav/less.svg" />
        <img src="@/assets/img/TopNav/max.svg" />
        <img src="@/assets/img/TopNav/close.svg" />
      </div>
      <div class="setting">
        <img src="@/assets/img/TopNav/skin.svg" />
        <img src="@/assets/img/TopNav/setting.svg" />
        <img src="@/assets/img/TopNav/msg.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex";
import { debounce } from '@/Utils';
import { GetSearchHotApi, GetSearchSuggestApi } from '@/Api/api.js'
export default {
  name: 'MusicHeadnav',
  setup () {
    //GetSearchSuggestApi
    let searchValue = ref('')
    const router = useRouter()
    const route = useRoute()
    const store = useStore();
    let isSuggestShow = ref(false);
    let HotDataList = ref([]);
    GetSearchHotApi().then(res => {
      HotDataList.value = res.data
    })
    let isHot = ref(true);
    let SearchSuggestObj = ref({
      order: []
    })
    const methods = {
      searchClick: (e) => {
        if (e.trim() == "") searchValue.value = '你是我的眼'
        isSuggestShow.value = false
        store.commit("setSearchText", e);
        //search
        console.log(route);
        if (route.path.indexOf("/search/") == -1) {
          router.push({
            name: 'MusicSearchSong',
            params: {
              value: e
            }
          })
        }



      },
      previous: () => {
        router.go(-1)
      },
      goto: (e) => {
        router.push(e)
      },
      searchSuggest: debounce(() => {
        if (isSuggestShow) {
          let keyword = searchValue.value.trim()
          if (keyword == "") {
            isHot.value = true
          } else {
            isHot.value = false
            GetSearchSuggestApi(keyword).then(res => {
              console.log(res);
              if (res.code == 200) {
                SearchSuggestObj.value = res.result
              }


            })
            console.log(keyword);

          }

        }

      }, 500),
      suggestClick (e) {
        searchValue.value = e;
        methods.searchClick(e)
        methods.searchSuggest(e)
      },
      isSuggestShowDelay (e) {
        isHot.value = searchValue.value.trim() == ""
        if (!e) {
          setTimeout(() => {
            isSuggestShow.value = e
          }, 150)
        }
        else {
          isSuggestShow.value = e

        }
      },
      orderMode (e) {
        const dictionary = {
          songs: '𝅘𝅥𝅮 单曲',
          albums: '⊚ 专辑',
          playlists: '𝅘𝅥𝅯 歌单',
          artists: '  歌手'
        }
        if (dictionary[e]) {
          return dictionary[e]
        } else {
          return '未知:' + e
        }

      },
      getName (mode, data) {
        switch (mode) {
          case 'songs':
            return data.name + '-' + data.artists[0].name
          case 'albums':
            return data.name + '-' + data.artist.name
          case 'playlists':
          case 'artists':
            return data.name
          default:
            return '未知'
        }
      },
      listClick (mode, Data) {
        console.log(Data);
        switch (mode) {
          case 'songs':
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
            store.commit('setCurrentPlay', songData);
            return
          case 'albums':
            return
          case 'playlists':
            return
          case 'artists':
            return
          default:
            return
        }
      }



    }
    return {
      isSuggestShow,
      searchValue,
      isHot,
      ...methods,
      HotDataList,
      SearchSuggestObj
    }
  }
};
</script>

<style lang="less" scoped>
.headNav {
  height: 60px;
  position: absolute;
  top: 0;
  width: 100%;
  background-color: #212124;
  border-bottom-style: solid;
  // border-color: rgb(182, 36, 36);
  //渐变
  border-image: -webkit-linear-gradient(
      45deg,
      rgb(105, 5, 5),
      rgb(178, 35, 35),
      rgb(105, 5, 5)
    )
    30 30;
  border-width: 3px;
  > * {
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
}

.logo {
  width: 200px;

  img {
    margin: 15px 0 15px 12px;
  }
}
.search {
  width: 300px;
  > * {
    float: left;
    margin-left: 10px;
  }
  > img {
    width: 18px;
    height: 18px;
    margin-top: 21px;
  }
}
.searchSuggest {
  box-shadow: 0px 0px 9px #080808d9;
  width: 400px;
  height: 400px;
  position: absolute;
  top: 50px;
  left: 240px;
  background: rgb(54, 54, 54);
  z-index: 10;
  border-radius: 10px;
  overflow: auto;
  color: rgb(108, 108, 102);
  > :first-child {
    font-size: 15px;
    margin: 10px 20px;
  }
  .searchSuggestList {
    > div {
      clear: both;
      font-size: 12px;
      &:hover {
        background-color: rgb(51, 51, 51);
      }
      > :first-child {
        width: 50px;
        height: 50px;
        float: left;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
      }
      .searchSuggestInfo,
      .searchSuggestContent {
        height: 25px;
        line-height: 25px;
      }
      .searchSuggestInfo {
        > span:first-child {
          color: rgb(211, 211, 211);
          font-weight: bold;
        }
        > img {
          height: 12px;
          margin: 0 5px;
        }
      }
    }
  }
  .SearchSuggestObj {
    color: rgb(211, 211, 211);
    > div {
      > div:first-child {
        font-size: 12px;
        color: rgb(211, 211, 211);
        border-bottom-style: solid;
        border-top-style: solid;
        border-width: 1px;
        border-color: rgb(63, 63, 63);
        background-color: rgb(57, 57, 57);
        height: 20px;
        line-height: 20px;
        padding-left: 10px;
      }
      > div:not(:first-child) {
        height: 25px;
        font-size: 14px;
        margin-left: 20px;
        line-height: 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover {
          background-color: rgb(51, 51, 51);
        }
      }
    }
  }
  .relatedResults {
    margin: 5px;
    font-size: 12px;
    &:hover {
      color: #fff;
    }
  }
}
.combination {
  width: 150px;
  height: 30px;
  margin-top: 15px;
  border-radius: 20px;
  background-color: rgb(42, 42, 45);
  > * {
    display: inline-block;
    vertical-align: middle;
  }
  > input {
    color: rgb(255 255 255);
    background-color: rgba(0, 0, 0, 0);
    border-style: none;
    width: 110px;
    outline: none;
    height: 28px;
  }
  > img {
    width: 14px;
    height: 14px;
    margin: 0 9px;
  }
}
.control {
  float: right;
  width: 500px;
  > * {
    display: inline-block;
  }
  .userinfo {
    width: 150px;
    > * {
      float: left;
    }
    > .userImg {
      width: 30px;
      height: 30px;
      display: inline-block;
      border-radius: 50%;
      overflow: hidden;
      background: #2e2e30;
      margin-top: 12px;
      margin-right: 6px;
      > img {
        width: 18px;
        height: 18px;
        margin-left: 6px;
        margin-top: 10px;
      }
    }
    > span {
      color: rgb(173, 173, 173);
      font-size: 12px;
      margin-top: 22px;
      margin-right: 5px;
      &:last-child {
        color: rgb(208, 208, 208);
        &:hover {
          color: #fff;
        }
      }
    }
  }

  .setting {
    width: 139px;
    float: right;
    display: flex;
    margin-top: 20px;
    > img {
      width: 20px;
      height: 20px;
      flex: 1;
    }
  }
  .close {
    display: flex;
    float: right;
    margin-top: 20px;
    width: 200px;
    border-left-style: solid;
    border-width: 1px;
    border-color: #e3e3e3;
    padding-left: 10px;
    > img {
      width: 20px;
      height: 20px;
      flex: 1;
    }
  }
  .setting,
  .close {
    > img {
      &:hover {
        filter: drop-shadow(#ffffff 0px 0);
      }
    }
  }
}
</style>