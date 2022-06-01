import { Button } from 'antd'
import React from 'react'
import Dropdown from '../index'

export default function Demo() {
  return (
    <div>
      <Dropdown overlay={<div>sdadadsad</div>}>
        <Button>测试下拉菜单</Button>
      </Dropdown>
    </div>
  )
}
