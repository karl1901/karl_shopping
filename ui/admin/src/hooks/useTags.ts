import { useSettingsStore } from '@/store/modules/settings'
import { ITagView, useTagsViewStore } from '@/store/modules/tags-view'
import router from '@/router'
enum TagsActionEnum {
  REFRESH,
  CLOSE_ALL,
  CLOSE_OTHER,
  CLOSE_CURRENT,
  CLOSE
}
export function useTags() {
  const settingStore = useSettingsStore()

  /** 是否显示tag */
  function isShowTagsView() {
    return settingStore.showTagsView
  }

  const tagsViewStore = useTagsViewStore()

  const route = computed(() => {
    return router.currentRoute.value
  })

  async function handleTabAction(action: TagsActionEnum, tag: ITagView = route.value) {
    if (!isShowTagsView()) {
      console.log('TagsView未开启')
      return
    }
    switch (action) {
      // 刷新
      case TagsActionEnum.REFRESH:
        await tagsViewStore.refreshSelectedTag(tag)
        break

      // 关闭所有
      case TagsActionEnum.CLOSE_ALL:
        await tagsViewStore.closeAllTags(tag)
        break

      // 关闭其他
      case TagsActionEnum.CLOSE_OTHER:
        await tagsViewStore.closeOthersTags(tag)
        break

      // 关闭当前，如果传入tag，则关闭指定tag
      case TagsActionEnum.CLOSE_CURRENT:
      case TagsActionEnum.CLOSE:
        await tagsViewStore.closeSelectedTag(tag)
        break
    }
  }
  return {
    refresh: (tag: ITagView) => handleTabAction(TagsActionEnum.REFRESH, tag),
    closeAll: (tag?: ITagView) => handleTabAction(TagsActionEnum.CLOSE_ALL, tag),
    closeOther: (tag: ITagView) => handleTabAction(TagsActionEnum.CLOSE_OTHER, tag),
    close: (tag?: ITagView) => handleTabAction(TagsActionEnum.CLOSE, tag),
    closeCurrent: () => handleTabAction(TagsActionEnum.CLOSE_CURRENT)
  }
}
