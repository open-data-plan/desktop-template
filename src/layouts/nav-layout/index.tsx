import React, { FC } from 'react'
import { Layout } from 'antd'
import BasicHeader from '@/components/basic-header'
import BasicFooter from '@/components/basic-footer'
import styles from '../index.module.less'
import { SiderTheme } from 'antd/lib/layout/Sider'
import { getSearchParams } from '@/utils/helpers'
import classNames from 'classnames'
import NavMenu from '@/components/nav-menu'
import useMatchedRoute from '@/hooks/use-matched-route'

const searchParams = getSearchParams()

const { Content } = Layout

interface Props {
  theme?: SiderTheme
}

const NavLayout: FC<Props> = ({ children, theme }) => {
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
      {Header && !hideHeader ? (
        <Header center={<NavMenu mode="horizontal" theme={theme} />} />
      ) : null}
      <Layout>
        <Content
          className={classNames(styles.mainLayoutContent, {
            [styles.hasHeader]: headerVisible,
          })}
        >
          {children}
        </Content>
        {Footer && !hideFooter ? <Footer /> : null}
      </Layout>
    </Layout>
  )
}

export default NavLayout
