import React from 'react'
import { ColFilteredTable } from '../../../../index'
const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
]

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 100,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 100,
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
    width: 100,
  },
]
export default function Demo() {
  return (
    <div
      style={{
        background: 'white',
        height: '500px',
      }}
    >
      <ColFilteredTable
        dataSource={dataSource}
        colunms={columns}
        loading={false}
      ></ColFilteredTable>
    </div>
  )
}
