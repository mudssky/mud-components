import React, { useState } from 'react'
import Dropdown from '../index'

export default function Demo() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const handleVisibleChange = (visible: boolean) => {
    setIsDropdownVisible(visible)
  }
  const handleToggleVisibleClick = () => {
    setIsDropdownVisible(!isDropdownVisible)
  }
  return (
    <div>
      <button onClick={handleToggleVisibleClick}>切换显示</button>
      <Dropdown
        overlay={<div>sdadadsad</div>}
        visible={isDropdownVisible}
        onVisibleChange={handleVisibleChange}
      >
        <button>测试下拉菜单</button>
      </Dropdown>
    </div>
  )
}
