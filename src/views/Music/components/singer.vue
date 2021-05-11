<template>
  <div class="classification">
    <div class="classification-info" v-for="(data,name) in classification" :key="name">
      <div>{{getTitle(name)}}：</div>
      <div
        @click="stateChange(name,key)"
        v-for="(key,Area_) in data"
        :key="key"
        :class="state[name]==key?'clickTag':''"
      >{{Area_}}</div>
    </div>
  </div>
  <div style="margin:0 25px;">
    <div class="artistsList">
      <div
        @click="clickArtists(artistsData.id)"
        class="artistsData"
        v-for="artistsData in artistsList"
        :key="artistsData.id"
      >
        <img :src="artistsData.picUrl+'?param=150y150'" />
        <div>{{artistsData.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
GetArtistListApi
import {
  GetArtistListApi
} from '@/Api/api'
export default {
  name: 'singer',
  setup () {
    const classification = {
      area: {
        "全部": "-1",
        "华语": "7",
        "欧美": "96",
        "日本": "8",
        "韩国": "16",
        "其他": "0",
      },
      type: {
        "全部": "-1",
        "男歌手": "1",
        "女歌手": "2",
        "乐队": "3",
      },
      initial: {
        "热门": "-1",
        "A": "a",
        "B": "b",
        "C": "c",
        "D": "d",
        "E": "e",
        "F": "f",
        "G": "g",
        "H": "h",
        "I": "i",
        "J": "j",
        "K": "k",
        "L": "l",
        "M": "m",
        "N": "n",
        "O": "o",
        "P": "p",
        "Q": "q",
        "R": "r",
        "S": "s",
        "T": "t",
        "U": "u",
        "V": "v",
        "W": "w",
        "X": "x",
        "Y": "y",
        "Z": "z",
        "#": "0"
      }

    }
    const classificationName = {
      area: "语种",
      type: "分类",
      initial: "筛选",
    }

    let state = reactive({
      area: '-1',
      type: '-1',
      initial: '-1'
    })
    const stateChange = (e, val) => {
      console.log(e, val);
      state[e] = val
    }
    const getTitle = e => classificationName[e]
    let artistsList = ref([])
    watchEffect(() => {
      GetArtistListApi(state.area, state.type, state.initial).then(res => {
        if (res.code == 200) {

          artistsList.value = res.artists

        }
      })
    })
    const clickArtists = id => {
      alert(id)
    }
    return {
      state,
      classification,
      stateChange,
      getTitle,
      artistsList,
      clickArtists
    }
  }
}
</script>

<style lang='less' scoped>
.classification {
  margin: 20px 25px;
  color: rgb(135, 135, 135);
  font-size: 14px;
  .classification-info {
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 60px;
      margin-bottom: 15px;
    }
    > div:not(:first-child) {
      border-right: 1px solid #ffffff0d;
      text-align: center;
      &:hover {
        color: #fff;
      }
    }
    > div:first-child {
      color: #fff;
    }
  }
}
.clickTag {
  border-radius: 30px;
  background-color: #ff000014;
  color: rgb(236, 65, 65);
}
.artistsList {
  color: rgb(208, 208, 208);
  font-size: 14px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-column-gap: 10px;
  .artistsData {
    width: 150px;
    height: 180px;
    > img {
      width: 100%;
      border-radius: 10px;
    }
  }
}
</style>
