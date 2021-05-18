<template>
  <div class="AlbumList">
    <div
      @click="clickSongList(artistAlbumData.id)"
      class="Album"
      v-for="artistAlbumData in artistAlbum"
      :key="artistAlbumData.id"
    >
      <img :src="artistAlbumData.picUrl+'?param=60y60'" />
      <div>{{artistAlbumData.name}}</div>
      <p>{{artistAlbumData.size}}首</p>
      <p>发行时间：{{artistAlbumData.publishTime}}</p>
    </div>
  </div>
</template>

<script>
import {
  GetArtistAlbumApi,
} from '@/Api/api.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'album',
  props: {
    singerId: String
  },
  setup (props) {
    let artistAlbum = ref([])
    GetArtistAlbumApi(props.singerId).then(res => {
      artistAlbum.value = res.hotAlbums
    })
    const Router = useRouter()
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
      artistAlbum,
      clickSongList
    }
  }
}
</script>

<style lang='less' scoped>
.Album {
  display: flex;
  height: 80px;
  font-size: 14px;
  color: #686868;
  align-items: center;
  > * {
    flex: 1;
  }
  > img {
    border-radius: 10px;
    margin: 0 25px;
    width: 60px;
    height: 60px;
    flex: 0;
  }
  > div {
    color: rgb(183, 209, 183);
  }
  > p:last-child {
    text-align: right;
    margin-right: 25px;
  }
  &:nth-child(odd) {
    background-color: rgb(46, 46, 46);
  }
  &:hover {
    background-color: rgb(55, 55, 55);
  }
}
</style>
