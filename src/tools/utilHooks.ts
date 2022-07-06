import { useEffect, useRef } from 'react'

/**
 * react中异步回调中的state,是创建的那次渲染中看到的,不是最新的state
 * 这个hook使用useRef保存那个state,确保获取最新的state
 * @param state
 * @returns
 */
export function useStateRef(state: any) {
  const stateRef = useRef<any>()
  useEffect(() => {
    stateRef.current = state
    return () => {}
  }, [state])
  return stateRef
}

/***
 * 组件初始化的时候不执行,只有后续更新才执行的useEffect
 */
export function useSkipInitEffect(
  fn: () => void,
  dependenceList: React.DependencyList | undefined
  // callback?: () => void
) {
  const didInit = useRef(false)
  useEffect(() => {
    if (didInit.current) {
      const callback = fn()
      return callback
    } else {
      didInit.current = true
    }
    // return callback
  }, dependenceList)
}

/**
 * 滚动到底部触发事件的hook
 * @param listDomRef 绑定滚动事件的dom节点的ref
 * @param callback 滚动到底部时执行的callback
 * @param reactionDistance 距离底部的触发距离，默认为0
 */
export const useScrollToBottomHook = (
  listDomRef: any,
  callback: () => void,
  reactionDistance = 0
) => {
  useEffect(() => {
    const currentDom = listDomRef.current
    if (!currentDom) {
      // useRef 未赋值的情况下 current值为undefined
      return
    }

    const handleScroll = (e: any) => {
      if (
        e.target.scrollHeight - e.target.scrollTop - e.target.offsetHeight <=
        reactionDistance
      ) {
        callback()
      }
    }
    currentDom!.addEventListener('scroll', handleScroll)
    return () => {
      // 组件销毁时清除绑定事件
      currentDom!.removeEventListener('scroll', handleScroll)
    }
  }, [callback, reactionDistance, listDomRef])
}
