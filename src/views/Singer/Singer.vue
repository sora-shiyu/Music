<template>
  <div>
    <div class="user">
      <img src="1" />
      <div class="userInfo">
        <p>王力宏</p>
        <p>Wang Leehom;Home Boy</p>
        <div>
          <div>收藏</div>
          <div>个人主页</div>
        </div>
        <div>
          <span>单曲数:807</span>
          <span>专辑数:48</span>
          <span>MV数:92</span>
        </div>
      </div>
    </div>
    <TopNav :ListData="ListData" />
    <router-view />
  </div>
</template>

<script>
import TopNav from '@/components/TopNav/TopNav'
import { reactive } from 'vue'
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
    return {
      ListData
    }
  }
}
</script>

<style lang='less' scoped>
.user {
  height: 180px;
  margin: 25px;
  > img {
    height: 180px;
    width: 180px;
    border-radius: 10px;
  }
  .userInfo {
    > p {
      margin: 0;
      padding: 0;
    }
    color: rgb(208, 208, 208);
    font-size: 15px;
    > p:first-child {
      font-size: 18px;
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
