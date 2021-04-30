<template>
  <div class="headNav">
    <div class="logo">
      <img src="@/assets/png/logo.png" />
    </div>
    <div class="search">
      <img @click="previous" src="@/assets/img/TopNav/next.svg" />
      <img src="@/assets/img/TopNav/go.svg" />
      <div class="combination">
        <img @click="searchClick(searchValue)" src="@/assets/img/TopNav/search.svg" />
        <input
          @keyup.enter="searchClick(searchValue)"
          v-model="searchValue"
          type="text"
          placeholder="搜索"
        />
      </div>
      <img src="@/assets/img/TopNav/identify.svg" title="听歌识曲" />
    </div>
    <div class="control">
      <div class="userinfo">
        <div class="userImg">
          <img src="@/assets/img/TopNav/user.svg" />
        </div>
        <span>未登录 ⏷</span>
        <span>开通VIP</span>
      </div>

      <div class="close">
        <img src="@/assets/img/TopNav/mini.svg" />
        <img src="@/assets/img/TopNav/less.svg" />
        <img src="@/assets/img/TopNav/max.svg" />
        <img src="@/assets/img/TopNav/close.svg" />
      </div>
      <div class="setting">
        <img src="@/assets/img/TopNav/skin.svg" />
        <img src="@/assets/img/TopNav/setting.svg" />
        <img src="@/assets/img/TopNav/msg.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from "vuex";
export default {
  name: 'MusicHeadnav',
  setup () {
    let searchValue = ref('')
    const router = useRouter()
    const store = useStore();
    const methods = {
      searchClick: (e) => {
        store.commit("setSearchText", e);
        router.push({
          name: 'MusicSearchSong',
          params: {
            value: e
          }
        })
      },
      previous: () => {
        router.go(-1)
      }
    }

    return {
      searchValue,
      ...methods
    }
  }
};
</script>

<style lang="less" scoped>
.headNav {
  height: 60px;
  position: absolute;
  top: 0;
  width: 100%;
  background-color: #212124;
  border-bottom-style: solid;
  // border-color: rgb(182, 36, 36);
  //渐变
  border-image: -webkit-linear-gradient(
      45deg,
      rgb(105, 5, 5),
      rgb(178, 35, 35),
      rgb(105, 5, 5)
    )
    30 30;
  border-width: 3px;
  > * {
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
}

.logo {
  width: 200px;

  img {
    margin: 15px 0 15px 12px;
  }
}
.search {
  width: 300px;
  > * {
    float: left;
    margin-left: 10px;
  }
  > img {
    width: 18px;
    height: 18px;
    margin-top: 21px;
  }
}

.combination {
  width: 150px;
  height: 30px;
  margin-top: 15px;
  border-radius: 20px;
  background-color: rgb(42, 42, 45);
  > * {
    display: inline-block;
    vertical-align: middle;
  }
  > input {
    color: rgb(255 255 255);
    background-color: rgba(0, 0, 0, 0);
    border-style: none;
    width: 110px;
    outline: none;
    height: 28px;
  }
  > img {
    width: 14px;
    height: 14px;
    margin: 0 9px;
  }
}
.control {
  float: right;
  width: 500px;
  > * {
    display: inline-block;
  }
  .userinfo {
    width: 150px;
    > * {
      float: left;
    }
    > .userImg {
      width: 30px;
      height: 30px;
      display: inline-block;
      border-radius: 50%;
      overflow: hidden;
      background: #2e2e30;
      margin-top: 12px;
      margin-right: 6px;
      > img {
        width: 18px;
        height: 18px;
        margin-left: 6px;
        margin-top: 10px;
      }
    }
    > span {
      color: rgb(173, 173, 173);
      font-size: 12px;
      margin-top: 22px;
      margin-right: 5px;
      &:last-child {
        color: rgb(208, 208, 208);
        &:hover {
          color: #fff;
        }
      }
    }
  }

  .setting {
    width: 139px;
    float: right;
    display: flex;
    margin-top: 20px;
    > img {
      width: 20px;
      height: 20px;
      flex: 1;
    }
  }
  .close {
    display: flex;
    float: right;
    margin-top: 20px;
    width: 200px;
    border-left-style: solid;
    border-width: 1px;
    border-color: #e3e3e3;
    padding-left: 10px;
    > img {
      width: 20px;
      height: 20px;
      flex: 1;
    }
  }
  .setting,
  .close {
    > img {
      &:hover {
        filter: drop-shadow(#ffffff 0px 0);
      }
    }
  }
}
</style>