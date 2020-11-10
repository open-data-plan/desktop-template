import React, { FC } from 'react'
import BasicFooter from '@/components/basic-footer'
import BasicHeader from '@/components/basic-header'
import { Layout } from 'antd'
import { getSearchParams } from '@/utils/helpers'
import styles from '../index.module.less'
import classNames from 'classnames'
import useMatchedRoute from '@/hooks/use-matched-route'

const searchParams = getSearchParams()

const { Content } = Layout

const BasicLayout: FC = ({ children }) => {
  const route = useMatchedRoute()

  const { meta = {} } = route
  const { header: Header = BasicHeader, footer: Footer = BasicFooter } = meta

  const { header = 1, footer = 0 } = searchParams

  const hideHeader = +header === 0
  const hideFooter = +footer === 0

  const headerVisible = Header && !hideHeader
  // const footerVisible = Footer && !hideFooter

  return (
    <Layout className={styles.mainLayout}>
      {Header && !hideHeader ? <Header /> : null}
      <Content
        className={classNames(styles.mainLayoutContent, {
          [styles.hasHeader]: headerVisible,
        })}
      >
        {children}
      </Content>
      {Footer && !hideFooter ? <Footer /> : null}
    </Layout>
  )
}

export default BasicLayout
