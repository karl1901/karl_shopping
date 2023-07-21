export interface IListItem {
  avatar?: string
  title: string
  datetime?: string
  description?: string
  status?: '' | 'success' | 'info' | 'warning' | 'danger'
  extra?: string
}

export const notifyData: IListItem[] = [
  {
    avatar: '',
    title: '要续费啦',
    datetime: '一个小时前',
    description: '你的服务即将到期，为了不影响你的使用，请尽快续费'
  }
]

export const messageData: IListItem[] = [
  {
    avatar: '',
    title: '来自系统内消息',
    description: '有人开通了你的服务',
    datetime: new Date().toLocaleDateString()
  },
  {
    avatar: '',
    title: '来自系统内消息',
    description: '有人开通了你的服务',
    datetime: new Date().toLocaleDateString()
  },
  {
    avatar: '',
    title: '来自系统内消息',
    description: '有人开通了你的服务',
    datetime: new Date().toLocaleDateString()
  },
  {
    avatar: '',
    title: '来自系统内消息',
    description: '有人开通了你的服务',
    datetime: new Date().toLocaleDateString()
  }
]

export const todoData: IListItem[] = [
  {
    title: '任务名称',
    description: '这家伙很懒，什么都没留下',
    extra: '未开始',
    status: 'info'
  },
  {
    title: '任务名称',
    description: '这家伙很懒，什么都没留下',
    extra: '进行中',
    status: ''
  },
  {
    title: '任务名称',
    description: '这家伙很懒，什么都没留下',
    extra: '已超时',
    status: 'danger'
  }
]
