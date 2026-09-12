/**
 * 全站文章共享查询：左侧栏（数量/搜索）和右侧栏（统计）共用同一份数据，
 * 避免两个组件各发一次查询、payload 重复。
 * 顺序：日期 DESC（最新在前），需要 ASC 的地方自行反转。
 */
export const useAllPosts = () => {
  return useAsyncData('all-posts', () => {
    return queryCollection('posts')
      .where('draft', '=', false)
      .order('date', 'DESC')
      .all()
  })
}
