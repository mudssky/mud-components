import React from 'react'
import useHook, { Props } from './hooks'
import styles from './styles.module.scss'
export default function Dropdown(props: Props) {
  const { children, overlay, overlayStyle, visible } = props
  const {
    isDropdownVisible,
    triggerDom,
    handleVisibleChange,
    handleOverlayContainerClick,
  } = useHook(props)
  return (
    <div className={styles['container']}>
      <div ref={triggerDom} onClick={handleVisibleChange}>
        {children}
      </div>
      {(visible !== undefined ? visible : isDropdownVisible) ? (
        <div
          onClick={handleOverlayContainerClick}
          className={styles['dropdown-container']}
          style={overlayStyle}
        >
          {overlay}
        </div>
      ) : null}
    </div>
  )
}
