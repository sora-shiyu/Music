<template>
  <div class="singer">
    <div class="singerInfo" v-for="artistsData in SearchData " :key="artistsData.id">
      <img
        :src="artistsData.picUrl||'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'+'?param=60y60'"
      />
      <div class="singerName">
        <span>{{artistsData.name}}</span>
        <span v-if="artistsData.alias[0]">({{artistsData.alia[0]}})</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GetCloudSearchApi,
} from '@/Api/api'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from "vuex";

export default {
  name: 'singer',
  setup (porps, context) {

    const route = useRoute()
    const store = useStore();
    let searchText = ""
    let SearchData = ref([])

    watchEffect(() => {
      searchText = store.state.searchText
      if (!searchText) searchText = '王'
      GetCloudSearchApi(searchText, 100).then(res => {
        console.log(res);
        SearchData.value = res.result.artists
        context.emit("getMessage", res.result.artistCount + '位歌手');

      })
    })




    return {
      SearchData
    }
  }
}
</script>

<style lang='less' scoped>
.singer {
  margin: 20px 0;
  .singerInfo {
    height: 80px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    font-size: 15px;
    > img {
      width: 60px;
      height: 60px;
      margin: 0 25px;
      border-radius: 10px;
    }
    .singerName {
      color: rgb(102, 102, 96);
      > div:first-child {
        color: rgb(209, 209, 209);
      }
    }
    &:hover {
      background-color: rgb(55, 55, 55);
    }
    &:nth-child(odd) {
      background-color: rgb(46, 46, 46);
    }
  }
}
</style>
