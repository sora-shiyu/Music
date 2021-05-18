<template>
  <div class="container">
    <div class="SimiArtistList">
      <div
        class="SimiArtist"
        @click="clickArtists(SimiArtist.id)"
        v-for="SimiArtist in  SimiArtistList "
        :key="SimiArtist.id"
      >
        <img :src="SimiArtist.picUrl+'?param=150y150'" />
        <div>{{SimiArtist.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GetSimiArtistApi,
} from '@/Api/api.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'simi',
  props: {
    singerId: String
  },
  setup (props) {
    let SimiArtistList = ref([])
    GetSimiArtistApi(props.singerId).then(res => {
      if (res.code == 200) {
        SimiArtistList.value = res.artists

      }
    })
    const router = useRouter()
    const clickArtists = id => {
      router.push({
        name: 'MusicSingerAlbum',
        params: {
          singerId: id
        }
      })
    }
    return {
      SimiArtistList,
      clickArtists
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  margin: 10px 25px;
}
.SimiArtistList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  .SimiArtist {
    width: 140px;
    height: 170px;
    > img {
      width: 140px;
      height: 140px;
      border-radius: 10px;
    }
    > div {
      width: 100%;
      height: 30px;
      color: rgb(208, 208, 208);
    }
  }
}
</style>
