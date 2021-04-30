<template>
  <div v-show="showPlayList" class="PlayList">
    <div>播放列表</div>
    <div>
      <span>总{{PlayList.length}}首</span>
      <span @click="setPlayListEmpty">清空</span>
    </div>
    <div class="SongList">
      <div
        @dblclick="GetId(data,index)"
        :class="isPlay(index)"
        v-for="(data,index) in PlayList"
        :key="index"
      >
        <div :title="data.name">{{data.name}}</div>
        <div :title="data.artists.name">{{data.artists.name}}</div>
        <div :title="data.album.name">{{data.album.name}}</div>
        <span @click="SongRemove(index)">×</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'PlayList',
  setup () {
    let showPlayList = ref(true)
    const store = useStore();

    let PlayList = ref([])
    watchEffect(() => {
      PlayList.value = store.state.currentPlayList
      showPlayList.value = store.state.isShowPlayList

    })
    const isPlay = computed(() => {
      return index => {
        let class_ = "";
        class_ = index % 2 == 0 ? 'lightGray' : ''
        class_ += store.state.index == index ? ' red' : ''
        return class_
      }
    })
    const methods = {
      GetId: function (data, index) {
        console.log(data, index);
        store.commit('setCurrentPlay', data);
        store.commit('setIndex', index);
      },
      SongRemove: function (index) {
        store.dispatch('SubPlayList', index)
      },
      setPlayListEmpty: function () {
        store.commit('setCurrentPlayList', [])
        store.commit('setIndex', -1)
      }
    }



    return {
      showPlayList,
      PlayList,
      isPlay,
      ...methods
    }
  }
}
</script>

<style lang='less' scoped>
.PlayList {
  z-index: 9999;
  width: 350px;
  height: 100%;
  background-color: rgb(54, 54, 54);
  position: absolute;
  right: 0;
  > div:first-child {
    color: #fff;
    background-color: #666666;
    border-radius: 30px;
    width: 100px;
    text-align: center;
    margin: 4% auto 0 auto;
    padding: 5px 10px;
    font-size: 14px;
    height: 4.5%;
  }
  > div:nth-child(2) {
    margin: 0 20px;
    padding-bottom: 1%;
    border-bottom: 1px solid #fff2;
    height: 5.5%;
    // line-height: 30px;
    > span:first-child {
      font-size: 12px;
      color: rgb(94, 94, 94);
    }
    > span:last-child {
      float: right;
      font-size: 14px;
      color: rgb(214, 214, 214);
    }
  }
}

.SongList {
  overflow-y: auto;
  overflow-x: hidden;
  height: 83%;
  clear: both;
  > div {
    margin: 0 20px;
    &:hover {
      background-color: rgb(61, 61, 61);
      color: #fff;
      > span {
        display: inline-block;
      }
    }
    > :first-child {
      width: 50%;
      color: rgb(214, 214, 214);
    }
    > :nth-child(2) {
      width: 25%;
    }
    > :nth-child(3) {
      width: 25%;
    }
    > div {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      // display:block;
      height: 25px;
      line-height: 25px;
      font-size: 14px;
      color: rgb(144, 144, 144);
    }
    > span {
      position: absolute;
      display: none;
      border-radius: 50%;
      background: #77717147;
      width: 20px;
      height: 20px;
      margin-top: 2.5px;
      line-height: 20px;
      text-align: center;
    }
  }
}
.lightGray {
  background-color: rgb(57, 57, 57);
}
.red {
  > * {
    color: rgb(236, 65, 65) !important;
  }
}
</style>
