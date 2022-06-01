import React from 'react'
import {
  Button,
  Checkbox,
  Pagination,
  Spin,
  Space,
  Dropdown,
  Row,
  Col,
  Table,
} from 'antd'
import { CloseOutlined, MenuOutlined } from '@ant-design/icons'
import styles from './styles.module.scss'
import usehook, { Props, colCheckInfo } from './hooks'

//  自定义 table组件
const CustomTableGrid = (props: Props) => {
  const {
    dataSource,
    headerTool,
    title,
    loading,
    onChangeCheck,
    Y,
    pagination,
    getRowStyle,
    showSizeChanger = true,
    rowKey,
    selectRowType,
    noScroll,
  } = props
  const {
    selectedCols,
    selectedRows,
    Column,
    cellFocusData,
    highlight,
    isColFilterDropdownVisible,
    filteredColumn,
    handleColSelectedChange,
    handleFilterColDropdownClose,
    handleColFilterDropdownVisibleChange,
    handleFilterColDropdownSave,

    // onKeyDown,
    // handleVisibleChange,
    // onSelectionChanged,
    onCellFocused,
    // onClickClose,
    // onClickSave,
  } = usehook(props)

  return (
    <div className={styles.tablebox}>
      <div className={styles.headertitle}>
        {/* 标题 */}
        <div className={styles.headertext}>{title}</div>
        {/* 右侧筛选条件 */}
        <div className={styles.headertoolright} id="headertoolright">
          {/* 显示自定义列 */}
          <Dropdown
            trigger={['click']}
            onVisibleChange={handleColFilterDropdownVisibleChange}
            visible={isColFilterDropdownVisible}
            getPopupContainer={() =>
              document!.querySelector('#headertoolright') || document.body
            }
            overlay={
              <div className="checkboxbox">
                <div className="checkboxheader">
                  <span>可用筛选条件</span>
                  <Button
                    className="icon"
                    onClick={handleFilterColDropdownClose}
                    icon={<CloseOutlined />}
                  ></Button>
                </div>
                <Row>
                  {selectedCols.map((item, index) => (
                    <Col key={item.key} span={24} className="item">
                      <Checkbox
                        // key={item.key}
                        onChange={() => handleColSelectedChange(item, index)}
                        checked={item.checked}
                        disabled={item.disabled}
                      >
                        {item.name}
                      </Checkbox>
                    </Col>
                  ))}
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Space style={{ margin: '10px 0px 10px 0' }}>
                      <Button
                        type="primary"
                        style={{ width: '100px' }}
                        size="middle"
                        id="filterButton"
                        onClick={handleFilterColDropdownSave}
                      >
                        保存
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </div>
            }
          >
            <Button
              type="link"
              size="small"
              shape="circle"
              className={styles.filterBtn}
            >
              <MenuOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
      <Spin tip="数据加载中..." spinning={loading}>
        <div id="components-table-resizable-column">
          <Table
            rowKey={rowKey ? rowKey : 'id'}
            bordered
            scroll={
              noScroll ? undefined : { y: `calc(100vh - ${Y ? Y : 350}px)` }
            }
            style={{ height: `calc(100vh - ${Y ? Y : 410}px)` }}
            pagination={false}
            dataSource={dataSource}
            onRow={(record) => ({
              style: getRowStyle ? getRowStyle(record) : undefined,
            })}
            rowSelection={
              onChangeCheck
                ? {
                    // onChange: onSelectionChanged,
                    type: selectRowType ? selectRowType : 'checkbox',
                    columnWidth: '30px',
                    getCheckboxProps: (record) => ({
                      disabled: record.isDisabled,
                      checked: record.defaultChecked,
                    }),
                  }
                : undefined
            }
          >
            {filteredColumn.map((item, index) => (
              <Table.Column
                key={`${item.key}_A`}
                ellipsis
                align="left"
                width={Column?.[index]?.width ? Column[index].width : 100}
                dataIndex={item.key}
                title={item.title}
                render={item.render}
                onHeaderCell={() => {
                  return {
                    className: styles['headercell'],
                    width: Column?.[index]?.width ? Column[index].width : 100,
                  }
                }}
                onCell={(record: any, rowIndex) => {
                  return {
                    onClick: () =>
                      onCellFocused(
                        item.key ? record[String(item.key)] : null,
                        index,
                        rowIndex ? rowIndex : 0
                      ),
                    className: `${styles['cell']} ${
                      cellFocusData.x === index && cellFocusData.y === rowIndex
                        ? styles['focus']
                        : ''
                    } ${
                      highlight.x === index && highlight.y === rowIndex
                        ? styles['copyHighlight']
                        : ''
                    }`,
                  }
                }}
              />
            ))}
          </Table>
        </div>
        {pagination ? (
          <div className={styles.pagination}>
            <div className={styles.paginationleft}>
              {onChangeCheck ? `已选：${selectedRows.length}条数据` : null}
            </div>
            <Row>
              {`共${pagination.total}条数据`}
              <Pagination
                // hideOnSinglePage
                showSizeChanger={showSizeChanger}
                showQuickJumper
                pageSize={pagination.pagesize}
                pageSizeOptions={['10', '20', '30', '50', '100', '200', '500']}
                total={pagination ? pagination.total : 0}
                // showTotal={(total) => `共 ${total} 条`}
                current={pagination ? pagination.current : 1}
                size="small"
                onShowSizeChange={(current: number, size: number) => {
                  if (pagination) {
                    pagination.onChange(1, size)
                  }
                }}
                onChange={(page: number, pageSize?: number) => {
                  if (pagination) {
                    pagination.onChange(page, pageSize)
                  }
                }}
              />
            </Row>
          </div>
        ) : null}
      </Spin>
    </div>
  )
}

export default CustomTableGrid
