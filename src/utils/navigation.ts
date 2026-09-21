import { NavigationItem } from '@/constant'

export const nav = (items: NavigationItem[], id: string): string => {
  for (const item of items) {
    if (item.id === id && item.url) return item.url
    if (item.children) {
      const found = nav(item.children, id)
      if (found) return found
    }
  }
  return '#'
}
