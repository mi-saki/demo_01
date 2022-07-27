// 文章相关的API接口，都封装到这个模块
import request from '/src/utils/request.js'

export const getArticleListAPI = function (_page, _limit) {
  return request.get('/articles', {
    // 请求参数
    params: {
      _page: _page,
      _limit: _limit,
    },
  })
}
