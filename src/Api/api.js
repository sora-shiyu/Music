import request from './http'

//轮播图数据
export const GetBannersApi = () => request.get('/banner')
//推荐歌单
export const GetPersonalizedApi = limit => request.get('/personalized?limit=' + limit)
//独家放送 
export const GetPrivateContentApi = () => request.get('/personalized/privatecontent')
/**
 * 推荐新音乐 新歌速递 
 * type:全部:0华语:7欧美:96日本:8韩国:16
 * @param {number} number 
 * @returns 新歌速递
 */
export const GetTopSongApi = type => request.get('/top/song?type=' + type)
//新碟上架 /top/album
/**
 * area: ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
 * type : new:全部 hot:热门,默认为 new
 */
export const GetTopAlbumApi = (area = 'ALL', type = 'new') => {
  return request.get('/top/album?area=' + area + '&type=' + type)
}
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
export const GetCheckMusicApi = id => request.get('/check/music?id=' + id)
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
export const GetPlaylistDetailApi = id => request.get('/playlist/detail?id=' + id)
//获取歌曲详情 /song/detail?ids=
export const GetSongDetailApi = (...url) => request.get('/song/detail?ids=' + url)

//获取搜索建议 
export const GetSearchSuggestApi = keyword => request.get('/search/suggest?keywords=' + keyword)
//热搜列表(详细) 
export const GetSearchHotApi = () => request.get('/search/hot/detail')
//获取专辑内容
export const GetAlbumApi = id => request.get('/album?id=' + id)
//获取歌词 /lyric?id=33894312
export const GetLyricApi = id => request.get('/lyric?id=' + id)
//获取单曲评论 /comment/music
export const GetCommentMusicApi = (id, page = 1, limit = 20, before = undefined) => {
  let offset_ = ''
  if (page != 1) {
    offset_ = '&offset=' + (page - 1) * 20;
  }
  let before_ = ''
  if (before) before_ = '&before=' + before;
  return request.get(`/comment/music?id=${id}&limit=${limit}${offset_}${before_}`)
}
//所有榜单内容摘要 /toplist/detail
export const GetTopListDetailApi = () => request.get('/toplist/detail')
//歌手分类列表 /artist/list?type=1&area=96&initial=b
export const GetArtistListApi = (area = -1, type = -1, initial = -1) => request.get(`/artist/list?type=${type}&area=${area}&initial=${initial}`)

//获取歌手详情
export const GetArtistDetailApi = id => request.get('/artist/detail?id=' + id)
//获取歌手专辑
export const GetArtistAlbumApi = id => request.get('/artist/album?id=' + id)
//获取歌手单曲 热门50首 /artists
export const GetArtistsApi = id => request.get('/artists?id=' + id)
//获取相似歌手 
export const GetSimiArtistApi = id => request.get('/simi/artist?id=' + id)
//获取歌手描述  
export const GetArtistDescApi = id => request.get('/artist/desc?id=' + id)


