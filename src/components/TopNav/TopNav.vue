<template>
  <div class="wrap">
    <!-- <span>个性推荐</span>
    <span>歌单</span>
    <span>主播电台</span>
    <span>排行榜</span>
    <span>歌手</span>
    <span>最新音乐</span>-->
    <span
      :class="isActive(data.path)"
      @click="goto(data.path)"
      v-for="data in ListData"
      :key="data.path"
    >{{data.name}}</span>
  </div>
</template>

<script>
import { reactive, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'MusicTopnav',
  props: {
    ListData: Array
  },
  setup (props) {
    const ListData = props.ListData
    const route = useRoute()
    const router = useRouter()

    const methods = {
      goto: (path) => {
        router.push(path)
      }
    }
    const computeds = {
      isActive: computed(() => {
        //匿名函数传参 比对path 
        return data => {
          return data == route.path ? 'expand' : ''
        }
      })
    }


    return {
      ListData,
      ...computeds,
      ...methods
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 10%;
  line-height: 50px;
  > span {
    font-size: 16px;
    color: #afafaf;
    margin-left: 25px;
    position: relative;
    &:hover {
      color: #fff;
    }
  }
}
.expand {
  font-size: 20px !important;
  font-weight: bold;
  // border-bottom-style: ridge;
  // border-width: 3px;
  // border-color: rgb(236, 65, 65);
  &:after {
    content: ' ';
    width: 80%;
    height: 0.12rem;
    background: rgb(236, 65, 65);
    position: absolute;
    bottom: -0.1rem;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>