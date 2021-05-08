import { createStore } from 'vuex'

export default createStore({
  state: {
    searchText: '',
    currentPlay: {
      id: 0,
      name: '',
      album: {
        id: 0,
        name: '',
      },
      artists: {
        id: '',
        name: ''
      },
      mvid: 0,
      dt: 0

    },
    currentPlayList: [],
    playState: false,
    index: -1,
    currentTime: 0,
    AudioVolume: 100,
    isShowPlayList: false,
    isShowSongDetailed: false
  },
  mutations: {
    setSearchText: (state, newValue) => {
      state.searchText = newValue
    },
    setCurrentTime: (state, newValue) => {
      state.currentTime = newValue
    },
    setCurrentPlay: (state, newValue) => {
      state.currentPlay = newValue
    },
    setPlayState: (state, newValue) => {
      state.playState = newValue
    },
    setCurrentPlayList: (state, newValue) => {
      state.currentPlayList = newValue
    },
    addPlayList: (state, { val, index }) => {
      state.currentPlayList.splice(index, 0, val)
    },
    subPlayList: (state, val) => {
      state.currentPlayList.splice(val, 1)
    },
    setIndex: (state, val) => {
      state.index = val
    },
    setAudioVolume: (state, val) => {
      state.AudioVolume = val
    },
    setShowPlayList: (state, val) => {
      state.isShowPlayList = val
    },
    setShowSongDetailed: (state, val) => {
      state.isShowSongDetailed = val
    },
  },
  actions: {
    AddPlayList ({ commit, state }, data) {
      let flag = false
      let index = 0
      for (index; index < state.currentPlayList.length; index++) {
        if (state.currentPlayList[index].id == data.id) {
          flag = true
          break;
        }
      }
      if (!flag) {
        commit('addPlayList', { val: data, index: state.index + 1 })
        commit('setIndex', state.index + 1)
      } else {
        commit('setIndex', index)
      }



    },
    SubPlayList ({ dispatch, commit, state }, index) {
      //subPlayList
      if (state.currentPlayList.length > index) {
        commit('subPlayList', index)
        if (index < state.index) {
          commit('setIndex', state.index - 1)
        } else if (index == state.index) {
          commit('setIndex', state.index - 1)
          dispatch('nextSong')
        }

      }
    },
    nextSong ({ commit, state }) {
      if (state.currentPlayList.length != 0) {
        if (state.index < state.currentPlayList.length - 1) {
          commit('setCurrentPlay', state.currentPlayList[state.index + 1])
          commit('setIndex', state.index + 1)
        } else {
          commit('setIndex', 0)
          commit('setCurrentPlay', state.currentPlayList[0])
        }
      }
    },
    lastSong ({ commit, state }) {
      if (state.currentPlayList.length != 0) {
        if (state.index > 0) {
          commit('setCurrentPlay', state.currentPlayList[state.index - 1])
          commit('setIndex', state.index - 1)
        } else {
          commit('setIndex', state.currentPlayList.length - 1)
          commit('setCurrentPlay', state.currentPlayList[state.currentPlayList.length - 1])
        }
      }
    }

  },
  modules: {
  }
})
