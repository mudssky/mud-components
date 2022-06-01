import {
  CSSProperties,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import cancelBubble from '../../../../tools/util'

export interface Props {
  /**
   * @description 包裹的容器
   */
  children?: ReactNode
  /**
   * @description 菜单(点击后显示的容器)
   */
  overlay?: ReactNode
  /**
   * @description 点击后显示的容器的样式
   */
  overlayStyle?: CSSProperties
  /**
   * @description 是否显示菜单
   */
  visible?: boolean
  /**
   * @description  组件显示状态改变时触发
   */
  onVisibleChange?: (visible: boolean) => void
}

export default function useHook(props: Props) {
  const { visible, onVisibleChange } = props
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const triggerDom = useRef<HTMLDivElement>(null)

  // const innerDropdownVisibleChange = (newVisible: boolean) => {
  //   if (visible === undefined) {
  //     setIsDropdownVisible(newVisible)
  //   }
  // }
  const handleVisibleChange = (e: SyntheticEvent) => {
    cancelBubble(e)
    // innerDropdownVisibleChange(!isDropdownVisible)
    setIsDropdownVisible(!isDropdownVisible)
    // onVisibleChange?.(!visible)
  }

  const hideDropdown = (e: any) => {
    console.log('document click')
    // innerDropdownVisibleChange(false)
    setIsDropdownVisible(false)
    //
  }
  const handleOverlayContainerClick = (e: SyntheticEvent) => {
    cancelBubble(e)
  }
  useEffect(() => {
    document.addEventListener('click', hideDropdown)
    return () => {
      document.removeEventListener('click', hideDropdown)
    }
  }, [])
  useEffect(() => {
    if (visible !== undefined) {
      setIsDropdownVisible(visible)
    }
    return () => {
      // second
    }
  }, [visible])
  useEffect(() => {
    onVisibleChange?.(isDropdownVisible)
    return () => {}
  }, [isDropdownVisible])

  return {
    triggerDom,
    isDropdownVisible,
    handleVisibleChange,
    handleOverlayContainerClick,
  }
}
