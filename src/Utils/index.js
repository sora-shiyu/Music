//防抖
export function debounce (fn, delay) {
  // 记录上一次的延时器
  var timer = null;
  var delay = delay || 200;
  return function () {
    var args = arguments;
    var that = this;
    // 清除上一次延时器
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(that, args)
    }, delay);
  }
}
//数据处理
export function songDataFormat (songData) {
  if (!songData) {
    return {}
  }
  let { name, id } = songData
  let type = songData.dt
  let dt, mvid, albumName, albumId, artists
  if (type) {
    //简写
    let {
      dt: dt_,
      mv: mvid_,
      al: { name: albumName_, id: albumId_ },
      ar: artists_
    } = songData
    dt = dt_;
    mvid = mvid_
    albumName = albumName_
    albumId = albumId_
    artists = artists_
  } else {
    let {
      duration: dt_,
      mvid: mvid_,
      album: { name: albumName_, id: albumId_ },
      artists: artists_
    } = songData
    dt = dt_;
    mvid = mvid_
    albumName = albumName_
    albumId = albumId_
    artists = artists_
  }
  let artistsData = []
  artists.map(data => {
    let { name, id } = data;
    artistsData.push({
      name,
      id
    })
  })
  return {
    id,
    name,
    album: {
      id: albumId,
      name: albumName
    },
    artists: artistsData,
    dt,
    mvid
  }


}


