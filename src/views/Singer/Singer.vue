<template>
  <div>
    <div class="user">
      <img :src="ArtistDetailData.picUrl+'?param=200y200'" />
      <div class="userInfo">
        <p>{{ArtistDetailData.name}}</p>
        <p v-for=" alias in ArtistDetailData.alias" :key="alias">{{alias}}</p>
        <div>
          <div>收藏</div>
          <div>个人主页</div>
        </div>
        <div>
          <span>单曲数:{{ArtistDetailData.musicSize}}</span>
          <span>专辑数:{{ArtistDetailData.albumSize}}</span>
          <span>MV数:{{ArtistDetailData.mvSize}}</span>
        </div>
      </div>
    </div>
    <TopNav :ListData="ListData" />
    <router-view :singerId="id" />
  </div>
</template>

<script>
import TopNav from '@/components/TopNav/TopNav'
import { reactive, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import {
  GetArtistsApi,
} from '@/Api/api.js'
export default {
  name: 'Singer',
  components: {
    TopNav
  },
  setup () {
    const ListData = reactive([
      {
        name: '专辑',
        path: '/singer/album'
      }, {
        name: 'MV',
        path: '/singer/mv'
      }, {
        name: '歌手详情',
        path: '/singer/detail'
      }, {
        name: '相似歌手',
        path: '/singer/simi'
      },
    ])
    const route = useRoute()
    let id = ref(route.params.singerId)
    let ArtistDetailData = ref({})

    watchEffect(() => {
      if (route.params.singerId) {
        GetArtistsApi(route.params.singerId).then(res => {
          if (res.code == 200) {
            ArtistDetailData.value = res.artist
          }
        })
      }

    })


    return {
      ListData,
      id,
      ArtistDetailData,

    }
  }
}
</script>

<style lang='less' scoped>
.user {
  height: 180px;
  margin: 25px;
  display: flex;
  > img {
    height: 180px;
    width: 180px;
    border-radius: 10px;
    margin-right: 25px;
  }
  .userInfo {
    color: #d0d0d0;
    font-size: 14px;
    > p {
      margin: 0;
      margin-bottom: 10px;
      padding: 0;
    }
    > * {
      margin-bottom: 10px;
    }

    > p:first-child {
      font-size: 24px;
      font-weight: bold;
    }
    > div:first-of-type {
      display: flex;
      > div {
        border-radius: 30px;
        border: 1px solid #ffffff61;
        padding: 3px 10px;
        margin-right: 10px;
        &:hover {
          background-color: rgb(52, 52, 52);
        }
      }
    }

    > div:last-child {
      display: flex;
      > * {
        margin-right: 25px;
      }
    }
  }
}
</style>
