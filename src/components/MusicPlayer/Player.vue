<template>
  <div class="Player">
    <audio autoplay ref="audio" id="audio" src></audio>
    <div class="control">
      <img src="@/assets/img/Player/random.svg" />
      <img @click="lastSong" src="@/assets/img/Player/return.svg" />
      <img @mousedown="play" start style="width: 48px;height: 48px;" :src="flag?start:stop" />
      <img @click="nextSong" src="@/assets/img/Player/next.svg" />
      <span>词</span>
    </div>

    <div class="progressBar">
      <span>{{toTime}}</span>
      <div @mousedown="sliderPressdown" @mouseup="sliderPressup" class="timeSlider">
        <el-slider
          @change="sliderChange"
          :show-tooltip="false"
          input-size="mini"
          :max="sliderValue.length"
          v-model="sliderValue.value"
        ></el-slider>
      </div>
      <span>{{numberToTime(sliderValue.length)}}</span>
    </div>
  </div>
</template>

<script>
import {
  computed,
  reactive,
  ref,
  watch,
  nextTick
} from 'vue'
import { useStore } from 'vuex';

export default {
  props: {
    SongId: Number
  },
  name: 'MusicPlayer',
  setup (props) {
    const Store = useStore();
    let sliderValue = reactive({
      length: 0,
      value: 0,
    })
    let flag = ref(false)
    const image = {
      start: require('@/assets/img/Player/start.svg'),
      stop: require('@/assets/img/Player/stop.svg'),
    }
    let audio = ref(null);
    let computeds = {
      toTime: computed(() => {
        return methods.numberToTime(sliderValue.value)
      })
    }
    let press = false;
    nextTick(() => {
      console.log("底部音乐组件创建完成");
      audio.value.oncanplay = function () {
        sliderValue.length = Math.floor(audio.value.duration)
      }
      audio.value.ontimeupdate = () => {
        if (!press) sliderValue.value = Math.floor(audio.value.currentTime);
      }
      audio.value.onended = () => {
        methods.nextSong()
      }
      audio.value.volume = Store.state.AudioVolume / 100
    })
    watch(() => props.SongId, () => {
      let url = `https://music.163.com/song/media/outer/url?id=${props.SongId}.mp3`
      audio.value.src = url
      flag.value = true
    })
    watch(() => Store.state.AudioVolume, () => {
      // console.log(Store.state.AudioVolume);
      audio.value.volume = Store.state.AudioVolume / 100

    })



    let methods = {
      numberToTime: (value) => {
        let minute = Math.floor(value / 60);
        if (minute < 10) minute = '0' + minute;
        let second = value % 60
        if (second < 10) second = '0' + second;
        return `${minute}:${second}`
      },
      play () {
        flag.value = !flag.value;
        if (flag.value) {
          audio.value.play()
        } else {
          audio.value.pause()
        }

      },
      sliderChange (e) {
        audio.value.currentTime = e;
      },
      sliderPressdown (e) {
        press = true
      },
      sliderPressup (e) {
        press = false
      },
      nextSong () {
        Store.dispatch('nextSong');
      },
      lastSong () {
        Store.dispatch('lastSong');
      }


    }


    return {
      sliderValue,
      ...computeds,
      ...methods,
      audio,
      flag,
      ...image
    }
  },
};
</script>

<style lang="less" scoped>
.Player {
  width: 40%;
  height: 70px;
  margin: 0 5%;
  .control {
    height: 50px;
    flex: 1;
    display: flex;
    width: 50%;
    margin: 0 auto;
    line-height: 50px;
    color: #d3d3d3;
    > img {
      position: relative;
      height: 24px;
      width: 24px;
      flex: 1;
      margin: auto;
      &:not([start]):hover {
        // 滤镜转为红色 不包括开始停止图片
        filter: invert(54%) sepia(59%) saturate(6658%) hue-rotate(338deg)
          brightness(80%) contrast(89%);
      }
    }
    span {
      flex: 1;
      text-align: center;
      &:hover {
        color: rgb(194, 58, 59);
      }
    }
  }
  .progressBar {
    height: 10px;
    display: flex;
    line-height: 10px;
    font-size: 14px;
    color: rgb(97, 97, 97);
    .timeSlider {
      width: 80%;
      margin: auto;
    }
  }
}
</style>

<style lang="less">
//修改滑块样式
.el-slider > .el-slider__runway {
  margin: 1px 0 0 0;
  background-color: rgb(74, 74, 74);
  height: 4px;
  .el-slider__bar {
    height: 100%;
    background-color: rgb(236, 65, 65);
  }
  .el-slider__button {
    display: none;
  }
  .el-slider__button-wrapper {
    height: 10px;
    width: 10px;
    position: absolute;
    z-index: 1;
    top: -8px;
  }

  &:hover {
    padding: 1px 0;
    .el-slider__bar {
      height: 100%;
      margin-top: -1px;
    }
    .el-slider__button {
      border: 2px solid #ec4141;
      background-color: #ec4141;
      width: 10px;
      height: 10px;
      display: inline-block;
    }
  }
}
</style>