import React from 'react'
import styles from './styles.module.scss'
interface Props {
  /**
   * @description 卡片容器内容
   */
  children?: React.ReactNode
  /**
   * @description 标题卡片容器的类样式,和默认样式共同作用
   */
  className?: string
  /**
   * @description 标题卡片的标题
   */
  title: React.ReactNode
}

export function DefaultTitleNode2({ title }: { title: string }) {
  return <div className={styles['titleNodeDefault2']}>{title}</div>
}
export function DefaultTitleNode({ title }: { title: string }) {
  return (
    <div className={styles['titleNodeDefault']}>
      <div className={styles['blue-vertical-line']}></div>
      <span className={styles['title']}>{title}</span>
    </div>
  )
}
export default function TitledCard({ className, title, children }: Props) {
  return (
    <div className={[styles.cardContainer, className].join(' ')}>
      <div className={styles['titleHead']}>
        {typeof title === 'string' ? <DefaultTitleNode title={title} /> : title}
      </div>
      {children}
    </div>
  )
}
