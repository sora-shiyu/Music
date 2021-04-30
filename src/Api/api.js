import request from './http'

//轮播图数据
export const GetBannersApi = () => request.get('/banner')
//推荐歌单
export const GetPersonalizedApi = (limit) => request.get('/personalized?limit=' + limit)
//独家放送 
export const GetPrivateContentApi = () => request.get('/personalized/privatecontent')
/**
 * 推荐新音乐 新歌速递 
 * type:全部:0华语:7欧美:96日本:8韩国:16
 * @param {number} number 
 * @returns 新歌速递
 */
export const GetTopSongApi = (type) => request.get('/top/song?type=' + type)
//推荐mv 
export const GetPersonalizedMvApi = () => request.get('/personalized/mv')
/**
 * type: 搜索类型；默认为 1 即单曲 , 取值意义 : 
 * 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户,
 * 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 * @param {value} string 
 * @param {type} number 
 * @param {limit} number 
 * @returns 搜索结果
 */
export const GetCloudSearchApi = (value, type = 1, limit = 30) => {
  return request.get('/search?keywords=' + value + '&type=' + type + '&limit=' + limit)
}
//音乐是否可用
export const GetCheckMusicApi = (id) => {
  request.get('/check/music?id=' + id).then(res => {
    return res.success
  })
}
//获取音乐 url
export const GetSongUrlApi = (...url) => request.get('/song/url?id=' + url)

//精品歌单标签列表
export const GetHighQualityTagApi = () => request.get('/playlist/highquality/tags')
//获取精品歌单
export const GetHighQualityApi = (cat = '全部', before = undefined, limit = 20) => {
  if (before) {
    return request.get(`/top/playlist/highquality?limit=${limit}&cat=${cat}&before=${before}`)
  } else {
    return request.get(`/top/playlist/highquality?limit=${limit}&cat=${cat}`)
  }

}
//热门歌单分类 
export const GetPlaylistHotApi = () => request.get('/playlist/hot')
//歌单 ( 网友精选碟 ) 
export const GetPlaylistApi = (cat = '全部', order = 'hot', limit = 50) => {
  return request.get(`/top/playlist?limit=${limit}&cat=${cat}&order=${order}`)
}
//获取歌单详情 
export const GetPlaylistDetailApi = (id) => request.get('/playlist/detail?id=' + id)
//获取歌曲详情 /song/detail?ids=
export const GetSongDetailApi = (...url) => {
  console.log(url);
  return request.get('/song/detail?ids=' + url)
}


