import React, { FC, CSSProperties } from 'react'
import { Layout } from 'antd'
import classnames from 'classnames'
import styles from '../index.module.less'

interface BlankLayoutProps {
  className?: string
  style?: CSSProperties
}

const BlankLayout: FC<BlankLayoutProps> = ({ className, style, children }) => (
  <Layout className={classnames(styles.mainLayout, className)} style={style}>
    <Layout.Content className={styles.mainLayoutContent}>
      {children}
    </Layout.Content>
  </Layout>
)

export default BlankLayout
