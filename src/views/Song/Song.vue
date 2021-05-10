<template>
  <div @scroll="scrolling" class="Song">
    <div class="Top">
      <div class="cover">
        <div>
          <img
            :style="{'animation':!playState?'loadRotate 30s linear infinite':''}"
            :src="currentPlayData.PicUrl"
          />
        </div>

        <div :style="{'transform':playState?'rotate(30deg)':''}"></div>
      </div>
      <div class="lyrics">
        <div>
          <div>{{currentPlayData.name}}</div>
          <div>{{currentPlayData.artists.name}}-{{currentPlayData.album.name}}</div>
        </div>
        <div id="lyrics">
          <ul>
            <li v-for="(val, key) in lyricListData" :key="key">{{val.lyrStr}}</li>
          </ul>
        </div>
      </div>
      <div class="include"></div>
    </div>
    <div v-if="dataPage==1" class="comment">
      <div>全部评论({{total}})</div>
      <div class="commentList">
        <div v-for="HotData in hotCommentMusicData " :key="HotData.time">
          <img :src="HotData.avatarUrl" />
          <div>
            <span>{{HotData.nickname}}:</span>
            <span>{{HotData.content}}</span>
            <div class="reply" v-if="HotData.isReplied">
              <span>@{{HotData.beReplied.nickname}}:</span>
              <span>{{HotData.beReplied.content}}</span>
            </div>
            <div>
              <div>{{formatDate(HotData.time)}}</div>
              <div class="ico">
                <div>举报</div>
                <div>
                  <img src="@/assets/img/Song/like.svg" />
                  {{HotData.likedCount}}
                </div>
                <img src="@/assets/img/Song/forward.svg" />
                <img src="@/assets/img/Song/reply.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment">
      <div>最新评论({{total}})</div>
      <div class="commentList">
        <div v-for="HotData in commentMusicData " :key="HotData.time">
          <img :src="HotData.avatarUrl" />
          <div>
            <span>{{HotData.nickname}}:</span>
            <span>{{HotData.content}}</span>
            <div class="reply" v-if="HotData.isReplied">
              <span>@{{HotData.beReplied.nickname}}:</span>
              <span>{{HotData.beReplied.content}}</span>
            </div>
            <div>
              <div>{{formatDate(HotData.time)}}</div>
              <div class="ico">
                <div>举报</div>
                <div>
                  <img src="@/assets/img/Song/like.svg" />
                  {{HotData.likedCount}}
                </div>
                <img src="@/assets/img/Song/forward.svg" />
                <img src="@/assets/img/Song/reply.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div @click="toTop" v-if="showbackToTop" class="ToTop">
      <img src="@/assets/img/Song/ToTop.svg" />
    </div>
    <pagination :page_size="20" :total="total" @pageChange="pageChange" />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import pagination from '@/components/Pagination/pagination.vue'
import {
  GetAlbumApi,
  GetLyricApi,
  GetCommentMusicApi
} from '@/Api/api'
import { computed, nextTick, reactive, ref, toRefs, watch, watchEffect } from 'vue'
export default {
  name: 'Song',
  components: {
    pagination
  },
  setup () {
    const store = useStore()
    //获取当前播放歌曲信息
    let currentPlayData = store.state.currentPlay
    //判断是否存在歌曲封面信息 无则重新获取
    if (!currentPlayData.PicUrl) {
      GetAlbumApi(currentPlayData.album.id).then(res => {
        console.log(res);
      })

    }
    //获取歌词信息 
    let lyricListData = ref({})
    let li = null
    GetLyricApi(currentPlayData.id).then(res => {
      //判断歌词状态
      if (!res.nolyric && res.lrc) {
        //分割成数组
        console.log(res);
        let lyricList = res.lrc.lyric && res.lrc.lyric.split('\n') || []
        //将歌词数组转换成数据对象 数组下标为对象属性名
        lyricList.map((e, index) => {
          let data = e.split(']')
          let Time = data.shift()
          //删前缀'['
          Time = Time.substr(1)
          let lyrStr = ''
          //处理歌词中存在']'的情况 拼接
          data.map((res, index) => {
            lyrStr += res
            if (index != data.length - 1) {
              lyrStr += ']'
            }
          })

          if (Time) {
            lyricListData.value[index] = { Time, lyrStr }
          }

        })
        //获取到歌词dom 后续操作歌词滚动
        li = lyricsDiv.getElementsByTagName('li')

      } else {
        //无歌词 修改样式
        lyricsDiv.className = "nolyrics"
        let ul = lyricsDiv.getElementsByTagName('ul')[0]
        ul.innerHTML += '<li>暂无歌词</li>';

      }

    })

    //监听播放状态 修改封面旋转动画
    let playState = ref(false)
    watchEffect(() => {
      playState.value = store.state.playState
    })
    // 获取 lyricsDiv
    let lyricsDiv = null
    nextTick(() => {
      lyricsDiv = document.getElementById('lyrics')

    })
    //定义当前歌词index
    let lyricListIndex = 0;
    //监听播放位置来判断歌词位置
    watch(() => store.state.currentTime, (val) => {
      //遍历歌词数据对象
      for (const key in lyricListData.value) {
        if (Object.hasOwnProperty.call(lyricListData.value, key)) {
          const element = lyricListData.value[key];
          //拿到结束时间
          const next = lyricListData.value[Number(key) + 1];
          //判断是否存在下个对象 不存在则表示歌词底部
          if (next) {
            //是否处于时间区间内
            if (methods.timeConversion(element.Time) < val
              && methods.timeConversion(next.Time) > val) {
              //歌词index是否变动
              if (lyricListIndex != key) {
                //更新歌词index
                lyricListIndex = key
                console.log(key, element.lyrStr);
                //清除上个li样式
                if (key != 0) li[Number(key) - 1].className = ""
                //设置当前li样式
                li[key].className = "weight_"
                //移动滚动条位置到歌词处
                lyricsDiv.scrollTop = li[key].offsetTop - lyricsDiv.offsetTop * 2
              }
              return
            }
          } else {
            //歌词底部
            if (lyricListIndex != key) {
              lyricListIndex = key
              li[li.length - 2].className = ""
              li[li.length - 1].className = "weight_"
            }
          }

        }
      }


    })

    //弃用
    const isChoose = computed(() => {
      return (Time, index) => {
        //效率太差

        // let nextObj = lyricListData.value[Number(index) + 1]
        // let next
        // if (nextObj) next = nextObj.Time
        // if (methods.timeConversion(Time) < currentTime.value && methods.timeConversion(next) > currentTime.value) {
        //   // let li = document.getElementsByClassName("weight_")[0]
        //   // if (li) {
        //   //   lyricsDiv.scrollTop = li.offsetTop - lyricsDiv.offsetTop * 2 + 30
        //   // }
        //   change.value = !change.value
        //   return "weight_"
        // }
        return ""

      }
    })
    let showbackToTop = ref(false)
    const methods = {
      timeConversion: Time => {
        //Time 格式 00:01.000
        return Time.split(":")[0] * 60 + Number(Time.split(":")[1])
      },
      commentDataProcessing: DataList => {
        if (DataList || DataList.length != 0) {
          let NewDataList = [];
          DataList.map(e => {
            let Obj = {
              nickname: '',
              userId: 0,
              avatarUrl: '',
              content: '',
              time: 0,
              likedCount: 0,
              isReplied: false,
              beReplied: {
                nickname: '',
                userId: 0,
                avatarUrl: '',
                content: '',
              }
            }
            let {
              user: { nickname },
              user: { userId },
              user: { avatarUrl },
              content,
              time,
              likedCount,
              beReplied
            } = e || {}
            Obj = {
              ...Obj, nickname, userId, avatarUrl, content, time, likedCount
            }
            if (beReplied[0]) {
              Obj.isReplied = true;
              let { content, user: { userId }, user: { nickname }, user: { avatarUrl } } = beReplied[0]
              Obj.beReplied = {
                nickname,
                userId,
                avatarUrl,
                content
              }
            }
            NewDataList.push(Obj)
          })
          console.log(NewDataList);
          return NewDataList
        }
        return []
      },
      formatDate: date => {
        var date = new Date(date);
        var YY = date.getFullYear();
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return `${YY}年${MM}月${DD}日 ${hh}:${mm}`
      },
      scrolling: e => {
        if (e.path[0].scrollTop > 0) {
          if (!showbackToTop.value) {
            showbackToTop.value = true
          }

        }
        else {
          showbackToTop.value = false
        }

      },
      toTop: () => {
        document.getElementsByClassName("Song")[0].scrollTop = 0
      }
    }
    //评论内容 
    let CommentData = reactive({
      hotCommentMusicData: [],
      commentMusicData: []
    })
    let total = ref(0)
    GetCommentMusicApi(currentPlayData.id, 1).then(res => {
      console.log(res);
      if (res.code == 200) {
        console.log(res.total);
        total.value = res.total
        CommentData.hotCommentMusicData = methods.commentDataProcessing(res.hotComments)
        CommentData.commentMusicData = methods.commentDataProcessing(res.comments)
      }
    })
    let dataPage = ref(1)
    const pageChange = page => {
      dataPage.value = page
      if (page != 1) {
        GetCommentMusicApi(currentPlayData.id, page).then(res => {
          // console.log(res);
          if (res.code == 200) {
            CommentData.commentMusicData = methods.commentDataProcessing(res.comments)
            let SongDiv = document.getElementsByClassName("Song")[0]
            SongDiv.scrollTop = SongDiv.clientHeight * 0.7
          }
        })
      }

    }

    return {
      currentPlayData,
      playState,
      lyricListData,
      isChoose,
      ...methods,
      ...toRefs(CommentData),
      total,
      showbackToTop,
      pageChange,
      dataPage
    }
  }
}
</script>

<style lang='less' scoped>
.Song {
  overflow: auto;
  background-color: rgb(43, 43, 43);
  width: 100%;
  height: 100%;
  background: linear-gradient(rgb(43, 43, 43) 50%, rgb(42, 42, 42) 50%);
  background-size: 100% 30px;
}
.Top {
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: space-evenly;

  > div {
    width: 30%;
    // background-color: red;
  }
  .cover {
    position: relative;
    > div:first-child {
      width: 260px;
      height: 260px;
      border-radius: 50%;
      background-image: url('../../assets/img/Song/1.png');
      margin: auto;
      background-repeat: space;
      margin-top: 100px;
      > img {
        width: 170px;
        border-radius: 50%;
        height: 170px;
        margin: 43.5px;
        animation: loadRotate 30s linear infinite;
        animation-fill-mode: both;
        // -webkit-animation-fill-mode: both;
      }
    }
    > div:nth-child(2) {
      background-image: url('../../assets/img/Song/2.png');
      position: absolute;
      top: 40px;
      width: 120px;
      height: 70px;
      left: 50%;
      // transform: rotate(30deg);
      transform-origin: top left;
      transition: all 0.5s;
    }
  }
  .lyrics {
    > div:first-child {
      height: 20%;
      text-align: center;
      margin-top: 10%;
      > div:first-child {
        color: rgb(213, 213, 213);
        font-size: 30px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      > div:last-child {
        color: rgb(116, 117, 117);
        font-size: 14px;
      }
    }
    > div:last-child {
      color: #747575;
      overflow-y: auto;
      height: 70%;
      > ul {
        list-style: none;
        margin: 0;
        padding: 0;
        font-size: 14px;
        > li {
          line-height: 30px;
          text-align: center;
        }
      }
    }
  }
  .include {
  }
  .weight_ {
    color: #fff;
    font-size: 17px;
    font-weight: 600;
  }
  .nolyrics {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
}

.comment {
  width: 60%;
  margin: 0 20%;
  margin-top: 5%;
  > :first-child {
    color: rgb(214, 214, 214);
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .commentList {
    > div {
      display: flex;
      padding: 20px 0;
      border-bottom: 1px solid #ffffff0f;
      font-size: 12px;
      &:hover {
        .ico > div:first-child {
          display: block;
        }
      }

      > img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 20px;
      }
      > div {
        color: rgba(213, 213, 213, 86%);
        width: 100%;
        > :first-child {
          color: rgb(133, 185, 230);
        }
        > :last-child {
          color: rgb(106, 105, 106);
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
      }
    }
    .reply {
      border-radius: 5px;
      background-color: rgb(54, 54, 54);
      color: rgb(145, 145, 145);
      padding: 5px;
      > span:first-child {
        color: #85b9e6;
      }
    }
    .ico {
      display: flex;
      // width: 150px;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      > * {
        &:hover {
          color: rgb(213, 213, 213);
          filter: drop-shadow(#ffffff 0px 0);
        }
      }
      > div:first-child {
        display: none;
      }
      img {
        width: 14px;
        height: 14px;
        margin: auto 0;
        margin-left: 20px;
      }
    }
  }
}
.ToTop {
  width: 40px;
  height: 40px;
  background: rgb(62, 62, 62);
  position: absolute;
  bottom: 20px;
  right: 15%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: rgb(80, 80, 80);
  }
  > img {
    width: 20px;
    height: 20px;
  }
}

@-webkit-keyframes loadRotate {
  from {
    -webkit-transform: rotateZ(0deg);
  }
  to {
    -webkit-transform: rotateZ(360deg);
  }
}
@keyframes loadRotate {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
</style>
