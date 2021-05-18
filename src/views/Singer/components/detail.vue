<template>
  <div class="detail">
    <div v-for="Data in ArtistDetailData" :key="Data">
      <div class="title">{{Data.ti}}</div>
      <div class="text" v-for="txt in Data.txt" :key="txt">{{txt}}</div>
    </div>
  </div>
</template>

<script>
import {
  GetArtistDescApi,
} from '@/Api/api.js'
import { ref } from 'vue'
export default {
  name: 'detail',
  props: {
    singerId: String
  },
  setup (props) {
    let ArtistDetailData = ref([])
    GetArtistDescApi(props.singerId).then(res => {

      if (res.code == 200) {
        res.introduction.forEach(element => {
          element.txt = element.txt.split("\n")
        });
        ArtistDetailData.value = res.introduction
        console.log(ArtistDetailData);

      }
    })
    return {
      ArtistDetailData
    }
  }
}
</script>

<style lang='less' scoped>
.detail {
  margin: 0 25px;
  font-size: 15px;
  > * {
    margin: 20px 0;
  }
}
.title {
  color: #d0d0d0;
  margin-bottom: 20px;
  font-weight: bold;
}
.text {
  text-indent: 2em;

  color: #878787;
  margin-bottom: 5px;
}
</style>
