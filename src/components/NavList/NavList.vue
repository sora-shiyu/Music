<template>
  <div>
    <ul>
      <li
        :class="isActive(data.path)"
        @click="goto(data.path)"
        v-for="data in ListData"
        :key="data.path"
      >{{data.name}}</li>

      <div>我的音乐</div>
      <li>
        <img src="@/assets/img/NavList/music.svg" />
        <span>本地音乐</span>
      </li>
      <li>
        <img src="@/assets/img/NavList/down.svg" />
        <span>下载管理</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, watch, computed } from 'vue'

import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'MusicNavlist',
  setup () {
    const ListData = [
      {
        name: '发现音乐',
        path: '/home'
      }, {
        name: '视频',
        path: '/video'
      }, {
        name: '朋友',
        path: '/friend'
      }, {
        name: '直播',
        path: '/live'
      }, {
        name: '私人FM',
        path: '/FM'
      },
    ]
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
          return data == '/' + route.path.split('/')[1] ? 'expand' : ''
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
ul {
  list-style: none;
  padding: 0;
  margin-top: 14px;
  > li {
    height: 36px;
    width: 172px;
    margin-left: 15px;
    line-height: 36px;
    padding-left: 10px;
    border-radius: 5px;
    color: rgb(214, 214, 214);
    margin-bottom: 2px;
    > img {
      height: 18px;
      width: 18px;
      margin-right: 10px;
      vertical-align: middle;
    }
    &:hover {
      color: #fff;
      background-color: rgb(51, 51, 51);
    }
  }
  > div {
    height: 36px;
    width: 172px;
    margin-left: 15px;
    line-height: 36px;
    padding-left: 10px;
    color: rgb(153, 152, 152);
    margin-top: 5px;
    font-size: 12px;
  }
}
.expand {
  font-size: 22px;
  font-weight: 900;
  color: #fff;
  background-color: rgb(51, 51, 51);
}
</style>