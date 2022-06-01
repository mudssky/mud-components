import { SyntheticEvent } from 'react'
/**
 * 取消事件冒泡
 * @param e
 */
export default function cancelBubble(e: SyntheticEvent) {
  e.stopPropagation()
  e.nativeEvent.stopImmediatePropagation()
}
