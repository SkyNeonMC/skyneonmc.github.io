export interface FriendLink {
  name: string
  url: string
  avatar?: string
  desc?: string
}

export const friendLinks: FriendLink[] = [
  {
    name: '姜一的Blog',
    url: 'https://blog.jianges.com',
    avatar: 'https://blog.jianges.com/favicon.ico',
    desc: '个人博客，记录技术与生活'
  },
  {
    name: 'WUSTACM',
    url: 'https://blog.wustacm.com',
    avatar: '/wustacm.ico',
    desc: '武汉科技大学 ACM 俱乐部官方博客'
  }
]
