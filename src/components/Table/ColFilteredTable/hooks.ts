import React, { useEffect, useReducer, ReactNode, useState } from 'react'
import { message } from 'antd'
import copy from 'copy-to-clipboard'
import { ColumnType } from 'antd/lib/table'
import { RowSelectionType } from 'antd/lib/table/interface'
import Item from 'antd/lib/list/Item'
const ACTION_TYPE = {
  SET_CHECKDATA: 'TABLE/SET_CHECKDATA', //填充checkbox数据
  SWITCH_VISIBLE: 'TABLE/SWITCH_VISIBLE', //控制筛选列box显示隐藏
  SET_FOCUSDATA: 'TABLE/SET_FOCUSDATA', // 保存focus数据
  SET_FILTER_COL: 'TABLE/SET_FILTER_COL', // 设置显示的列数据
  SET_CHECKLENGTH: 'TABLE/SET_CHECKLENGTH', // 勾选的数据长度
  SET_Highlight: 'TABLE/SET_Highlight', // 设置高亮
  SET_COL: 'TABLE/SET_COL', // 设置列
}
interface Action {
  type: ActionType
  payload: any
}

export type ActionType =
  | 'setInnerDataSource'
  | 'setIsTableLoading'
  | 'setSelectedRows'
  | 'setFilteredColumns'
  // 列筛选功能
  | 'setSelectedCols'
  | 'setIsColFilterDropdownVisible'
  //点击格子聚焦
  | 'setCellFocusData'

export interface colCheckInfo {
  key: string
  name: string
  checked: boolean
  disabled: boolean
}

export interface State {
  innerDataSource: any[]
  filterbtn: boolean
  selectedCols: colCheckInfo[]
  dataSourceList: any[]
  checkLength: string[]
  cellFocusData: {
    text: string
    x?: number
    y?: number
  }
  highlight: {
    x?: number
    y?: number
  }
  filterCol: string[] //
  Column: any[]
  filteredColumn: any[]
  selectedRows: any[]
  isColFilterDropdownVisible: boolean
}
const defaultState: State = {
  innerDataSource: [],
  filterbtn: false,
  selectedCols: [],
  dataSourceList: [],
  checkLength: [],
  cellFocusData: {
    text: '',
  },
  highlight: {},
  filterCol: [],
  Column: [],
  filteredColumn: [],
  selectedRows: [],
  isColFilterDropdownVisible: false,
}

const reducer = (state: State, action: Action) => {
  let newstate = { ...state }
  switch (action.type) {
    case 'setInnerDataSource':
      newstate.innerDataSource = action.payload
    case 'setFilteredColumns':
      newstate.filteredColumn = action.payload
    case 'setSelectedCols':
      newstate.selectedCols = action.payload
    case 'setIsColFilterDropdownVisible':
      newstate.isColFilterDropdownVisible = action.payload
    case 'setCellFocusData':
      newstate.cellFocusData = action.payload
    case ACTION_TYPE.SWITCH_VISIBLE:
      newstate.filterbtn = action.payload
      return newstate
    case ACTION_TYPE.SET_CHECKLENGTH:
      newstate.checkLength = action.payload
      return newstate
    case ACTION_TYPE.SET_COL:
      newstate.Column = action.payload
      return newstate
    case ACTION_TYPE.SET_Highlight:
      newstate.highlight = action.payload
      return newstate
    default:
      return newstate
  }
}

/**
 * 设置组件内表格数据
 * @param val
 * @returns
 */
export const setInnerDataSource = (val: any[]): Action => ({
  type: 'setInnerDataSource',
  payload: val,
})

/**
 * 设置选择列的筛选框的信息
 * @param val
 * @returns
 */
export const setSelectedCols = (val: colCheckInfo[]): Action => ({
  type: 'setSelectedCols',
  payload: val,
})

/**
 * 设置筛选后的列
 * @param val
 * @returns
 */
export const setFilteredColumns = (val: any[]): Action => ({
  type: 'setFilteredColumns',
  payload: val,
})

/**
 * 控制筛选下拉框的显示和隐藏
 * @param val
 * @returns
 */
export const setCellFocusData = (val: {
  text: string
  x?: number
  y?: number
}): Action => ({
  type: 'setCellFocusData',
  payload: val,
})
// const setCheckLengthAction = (param: (string | number)[]) => ({
//   type: ACTION_TYPE.SET_CHECKLENGTH,
//   value: param,
// })
// 设置需要显示的列
const setFilterColDataAction = (param: string[]) => ({
  type: ACTION_TYPE.SET_FILTER_COL,
  value: param,
})

/**
 * 控制筛选下拉框的显示和隐藏
 * @param val
 * @returns
 */
export const setIsColFilterDropdownVisible = (val: boolean): Action => ({
  type: 'setIsColFilterDropdownVisible',
  payload: val,
})

// const setDataFoucsAction = (param: {
//   text: string
//   x?: number
//   y?: number
// }) => ({
//   type: ACTION_TYPE.SET_FOCUSDATA,
//   value: param,
// })

const setHighlightAction = (param: { x?: number; y?: number }) => ({
  type: ACTION_TYPE.SET_Highlight,
  value: param,
})

const setFilterbtnAction = (param: boolean) => ({
  type: ACTION_TYPE.SWITCH_VISIBLE,
  value: param,
})

const setColAction = (param: ColumnType<any>[]) => ({
  type: ACTION_TYPE.SET_COL,
  value: param,
})

interface Collist {
  key: string
  title: string
  width?: number
  // 当前行的值，当前行数据，行索引
  render?: (text: any, record: any, index: number) => any
  [x: string]: any
}

interface mod {
  key: string
  list: string[]
}

interface contextMenuItem {
  title: string
  onClick: () => void
  disabled?: boolean
}
export interface Props {
  /**
   * @description 表格数据源
   */
  className?: string
  /**
   * @description 表格数据源
   */
  dataSource: any[]
  colunms: Collist[] //表格列
  getRowStyle?: (e: any) => React.CSSProperties | undefined //改变当前行css
  headerTool?: ReactNode //头部工具box
  title?: string //标题
  loading?: boolean //loading
  Y?: number //y轴 固定表头自动固定
  onChangeCheck?: (selectedRowKeys: any, selectedRows: any[]) => void //选中变化回调checkbox
  showSort?: boolean //显示 序号
  pagination?: {
    total: number
    current: number
    pagesize: number
    onChange: (page: number, pageSize?: number) => void
  } //分页
  paginationClassName?: string
  onShowContextMenu?: (e: any) => contextMenuItem[]
  selectRowType?: RowSelectionType
  rowKey?: any
  noScroll?: boolean
  showSizeChanger?: boolean
}

export default function useHook(props: Props) {
  const { dataSource, colunms, onChangeCheck, onShowContextMenu } = props

  const [state, dispatch] = useReducer(reducer, defaultState)
  const {
    selectedCols,
    selectedRows,
    Column,
    cellFocusData,
    highlight,
    isColFilterDropdownVisible,
    filteredColumn,
  } = state

  useEffect(() => {
    // dispatch(
    //   setFilteredColumns(
    //     colunms.map((item) => {
    //       return {
    //         ...item,
    //         checked: item.checked === undefined ? true : false,
    //         name: item.title,
    //       }
    //     })
    //   )
    // )
    // 切换显示列
    return () => {}
    // eslint-disable-next-line
  }, [colunms])

  // 显示隐藏 切换
  function handleColSelectedChange(info: colCheckInfo, index: number) {
    // 复选框 check、uncheck
    let checkData = [...selectedCols]
    checkData[index].checked = !checkData[index].checked
    dispatch(setSelectedCols(checkData))
  }

  // 选中行改变
  //   const onSelectionChanged = (
  //     selectedRowKeys: (string | number)[],
  //     selectedRows: any[]
  //   ) => {
  //     if (onChangeCheck) {
  //       onChangeCheck(selectedRowKeys, selectedRows)
  //       const action = setCheckLengthAction(selectedRowKeys)
  //       dispatch(action)
  //     }
  //   }

  // 单击单元格
  const onCellFocused = (e: any, x: number, y: number) => {
    // 单元格选中状态
    dispatch(
      setCellFocusData({
        text: e,
        x: x,
        y: y,
      })
    )
  }

  // 保存筛选项
  //   function onClickSave() {
  //     let visiblekey: string[] = [] // 需显示的key
  //     for (let index = 0; index < checkBoxData.length; index++) {
  //       if (checkBoxData[index].check) {
  //         visiblekey.push(checkBoxData[index].key)
  //       }
  //     }
  //     // 需要显示的列
  //     dispatch(setFilterColDataAction(visiblekey))
  //     // 获取 checkBoxData 中选中的
  //     const checkCol = checkBoxData.filter((item) => item.check)
  //     const colname = checkCol.map((item) => item.key)
  //     // 关闭筛选窗
  //     dispatch(setFilterbtnAction(false))
  //     message.success(`保存成功`)
  //   }

  //   关闭筛选列
  useEffect(() => {
    console.log('visible change', isColFilterDropdownVisible)

    return () => {}
  }, [isColFilterDropdownVisible])

  const handleFilterColDropdownClose = () => {
    // 关闭筛选窗
    console.log('close')

    dispatch(setIsColFilterDropdownVisible(false))
  }
  const handleColFilterDropdownVisibleChange = (visible: boolean) => {
    console.log('change', visible)
    dispatch(setIsColFilterDropdownVisible(visible))
  }
  const handleFilterColDropdownSave = () => {
    handleFilterColDropdownClose()
  }
  return {
    state,
    selectedCols,
    selectedRows,
    Column,
    cellFocusData,
    highlight,
    isColFilterDropdownVisible,
    filteredColumn,
    onCellFocused,
    handleColSelectedChange,
    handleFilterColDropdownClose,
    handleColFilterDropdownVisibleChange,
    handleFilterColDropdownSave,
    // handleVisibleChange,
    // onSelectionChanged,
    // onCellFocused,
    // onClickClose,
    // onClickSave,
  }
}
