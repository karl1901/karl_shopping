import { getActiveThemeName, setActiveThemeName } from '@/utils/cache/localStorage'

interface IThemeList {
  title: string
  name: ThemeName
}

const DEFAULT_THEME_NAME = 'dark'
type DefaultThemeNameType = typeof DEFAULT_THEME_NAME

export type ThemeName = DefaultThemeNameType | 'normal' | 'auto'

/** 主题列表 */
const themeList: IThemeList[] = [
  {
    title: '跟随系统',
    name: 'auto'
  },
  {
    title: '黑暗',
    name: 'dark'
  },
  {
    title: '白色',
    name: 'normal'
  }
]

/** 正在应用的主题名称 */
const activeThemeName = ref<ThemeName>(getActiveThemeName() || DEFAULT_THEME_NAME)

const initTheme = () => {
  watchEffect(() => {
    const value = activeThemeName.value
    setHtmlClassName(value)
    setActiveThemeName(value)
  })
}

const setTheme = (value: ThemeName) => {
  activeThemeName.value = value
}

const match = matchMedia('(prefers-color-scheme: dark)')

const followSystem = () => {
  themeList.forEach((item) => {
    document.documentElement.classList.remove(item.name)
  })
  if (match.matches) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.add('normal')
  }
}

/** 在 html 根元素上挂载 class */
const setHtmlClassName = (value: ThemeName) => {
  if (value === 'auto') {
    followSystem()
    match.addEventListener('change', followSystem)
  } else {
    document.documentElement.className = value
    match.removeEventListener('change', followSystem)
  }
}

/** 主题 hook */
export function useTheme() {
  return { themeList, activeThemeName, initTheme, setTheme }
}
