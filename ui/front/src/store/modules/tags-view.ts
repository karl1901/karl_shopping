import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type RouteLocationNormalized } from 'vue-router'
import router from '@/router/index'
export type ITagView = Partial<RouteLocationNormalized>
export const useTagsViewStore = defineStore('tags-view', () => {
  const route = router.currentRoute
  const visitedViews = ref<ITagView[]>([])
  const cachedViews = ref<string[]>([])
  /** 固定的tag */
  const affixTags = ref<ITagView[]>([])
  const setAffixTags = (tags: ITagView[]) => {
    affixTags.value = tags
  }

  /** 是否激活 */
  const isActive = (tag: ITagView) => {
    return tag.path === route.value.path
  }

  /** 添加视图tag */
  const addVisitedView = (view: ITagView) => {
    if (
      visitedViews.value.some((v, index) => {
        if (v.path === view.path) {
          if (v.fullPath !== view.fullPath) {
            // 防止 query 参数丢失
            visitedViews.value[index] = Object.assign({}, view)
          }
          return true
        }
      })
    ) {
      return
    }
    visitedViews.value.push(Object.assign({}, view))
  }

  /** 添加缓存tag */
  const addCachedView = (view: ITagView) => {
    if (typeof view.name !== 'string') return
    if (cachedViews.value.includes(view.name)) return
    if (view.meta?.keepAlive) {
      cachedViews.value.push(view.name)
    }
  }

  /** 关闭视图tag */
  const delVisitedView = (view: ITagView) => {
    for (const [i, v] of visitedViews.value.entries()) {
      if (v.path === view.path) {
        visitedViews.value.splice(i, 1)
        break
      }
    }
  }

  /** 关闭选中tag */
  const closeSelectedTag = (view: ITagView) => {
    delVisitedView(view)
    delCachedView(view)
    // 如果选中的tag是当前路由，则跳转到最后一个tag
    if (isActive(view)) {
      toLastView(visitedViews.value, view)
    }
  }

  /** 关闭当前tag */
  const closeCurrentTag = () => {
    closeSelectedTag(route.value)
  }

  /** 关闭所有tag */
  const closeAllTags = (view: ITagView) => {
    delAllVisitedViews()
    delAllCachedViews()
    // 如果有tag属于固定tag，则return
    if (affixTags.value.some((tag) => tag.path === route.value.path)) {
      return
    }
    // 跳转到最后一个tag
    toLastView(visitedViews.value, view)
  }

  /** 刷新选中tag */
  const refreshSelectedTag = (view: ITagView) => {
    delCachedView(view)
    router.replace({ path: '/redirect' + view.path, query: view.query })
  }

  /** 关闭其他tag */
  const closeOthersTags = (selectedTag: ITagView) => {
    if (selectedTag.fullPath !== route.value.path && selectedTag.fullPath !== undefined) {
      router.push(selectedTag.fullPath)
    }
    delOthersVisitedViews(selectedTag)
    delOthersCachedViews(selectedTag)
  }

  /** 前往最后一个tag */
  const toLastView = (visitedViews: ITagView[], view: ITagView) => {
    const latestView = visitedViews.slice(-1)[0]
    if (latestView !== undefined && latestView.fullPath !== undefined) {
      router.push(latestView.fullPath)
    } else {
      // 如果 TagsView 全部被关闭了，则默认重定向到主页
      if (view.name === 'Dashboard') {
        // 重新加载主页
        router.push({ path: '/redirect' + view.path, query: view.query })
      } else {
        router.push('/')
      }
    }
  }

  /** 关闭缓存tag */
  const delCachedView = (view: ITagView) => {
    if (typeof view.name !== 'string') return
    const index = cachedViews.value.indexOf(view.name)
    index > -1 && cachedViews.value.splice(index, 1)
  }

  /** 关闭其他试图tag */
  const delOthersVisitedViews = (view: ITagView) => {
    visitedViews.value = visitedViews.value.filter((v) => {
      return v.meta?.affix || v.path === view.path
    })
  }

  /** 关闭其他缓存tag */
  const delOthersCachedViews = (view: ITagView) => {
    if (typeof view.name !== 'string') return
    const index = cachedViews.value.indexOf(view.name)
    if (index > -1) {
      cachedViews.value = cachedViews.value.slice(index, index + 1)
    } else {
      // 如果 index = -1, 没有缓存的 tags
      cachedViews.value = []
    }
  }

  /** 关闭所有试图tag */
  const delAllVisitedViews = () => {
    // keep affix tags
    const affixTags = visitedViews.value.filter((tag) => tag.meta?.affix)
    visitedViews.value = affixTags
  }

  /** 关闭所有缓存tag */
  const delAllCachedViews = () => {
    cachedViews.value = []
  }
  return {
    visitedViews,
    cachedViews,
    addVisitedView,
    addCachedView,
    delVisitedView,
    delCachedView,
    delOthersVisitedViews,
    delOthersCachedViews,
    delAllVisitedViews,
    delAllCachedViews,
    isActive,
    affixTags,
    setAffixTags,
    refreshSelectedTag,
    closeOthersTags,
    closeSelectedTag,
    closeCurrentTag,
    closeAllTags
  }
})
