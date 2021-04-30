import { createRouter, createWebHistory } from 'vue-router'

import MusicHome from '@/views/Music/Home.vue'
import recommend from '@/views/Music/components/recommend.vue'
import songList from '@/views/Music/components/songList.vue'
import MusicStation from '@/views/Music/components/MusicStation.vue'
import rank from '@/views/Music/components/rank.vue'
import singer from '@/views/Music/components/singer.vue'
import MusicNew from '@/views/Music/components/new.vue'

import MusicVideo from '@/views/Video/Home.vue'
import video from '@/views/Video/components/video.vue'
import mv from '@/views/Video/components/mv.vue'


import MusicSearch from '@/views/Search/Home.vue'
// import search from '@/views/Search/Search.vue'
import song from '@/views/Search/components/song.vue'

import MusicList from '@/views/MusicList/MusicList.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'MusicHome',
    component: MusicHome,
    children: [
      {
        path: '',
        redirect: '/home/recommend'
      },
      {
        path: 'recommend',
        component: recommend
      },
      {
        path: 'songList',
        component: songList
      },
      {
        path: 'MusicStation',
        component: MusicStation
      },
      {
        path: 'rank',
        component: rank
      },
      {
        path: 'singer',
        component: singer
      },
      {
        path: 'new',
        component: MusicNew
      },
    ]
  },
  {
    path: '/video',
    name: 'MusicVideo',
    component: MusicVideo,
    children: [
      {
        path: '',
        component: video
      },
      {
        path: 'mv',
        component: mv
      },
    ]
  },
  {
    path: '/search',
    name: 'MusicSearch',
    component: MusicSearch,
    children: [
      {
        path: '',
        redirect: '/search/song'
      },
      {
        path: 'song',
        component: song,
        name: 'MusicSearchSong'
      },
    ]
  },
  {
    path: '/musicList',
    name: 'MusicList',
    component: MusicList,
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
