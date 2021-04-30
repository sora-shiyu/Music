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

    },
    currentPlayList: [],
    index: -1,
    AudioVolume: 20,
    isShowPlayList: false
  },
  mutations: {
    setSearchText: (state, newValue) => {
      state.searchText = newValue
    },
    setCurrentPlay: (state, newValue) => {
      state.currentPlay = newValue
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
        commit('setIndex', state.index - 1)
        if (state.index + 1 == index) { dispatch('nextSong') }


      }
    },
    nextSong ({ commit, state }) {
      if (state.currentPlayList.length != 0) {
        console.log(state.index, state.currentPlayList.length);
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
        console.log(state.index, state.currentPlayList.length);
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
