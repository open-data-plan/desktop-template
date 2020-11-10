import React, { FC } from 'react'
import { Layout } from 'antd'
import BasicHeader from '@/components/basic-header'
import BasicFooter from '@/components/basic-footer'
import SiderMenu from '@/components/sider-menu'
import styles from '../index.module.less'
import { getSearchParams } from '@/utils/helpers'
import { SiderTheme } from 'antd/lib/layout/Sider'
import classNames from 'classnames'
import useMatchedRoute from '@/hooks/use-matched-route'

const searchParams = getSearchParams()

const { Content } = Layout

interface Props {
  siderWidth?: number
  theme?: SiderTheme
}

const HeaderLayout: FC<Props> = ({ children, siderWidth = 220, theme }) => {
  const route = useMatchedRoute()

  const { meta = {} } = route
  const {
    header: Header = BasicHeader,
    footer: Footer = BasicFooter,
    sider: Sider = SiderMenu,
  } = meta

  const { header = 1, sider = 1, footer = 0 } = searchParams

  const hideHeader = +header === 0
  const hideSider = +sider === 0
  const hideFooter = +footer === 0

  const siderVisible = Sider && !hideSider
  const headerVisible = Header && !hideHeader
  // const footerVisible = Footer && !hideFooter

  return (
    <Layout className={styles.mainLayout}>
      {Header && !hideHeader ? <Header /> : null}
      <Layout>
        {Sider && !hideSider ? (
          <Sider
            className={headerVisible ? undefined : styles.noHeaderSider}
            theme={theme}
            width={siderWidth}
            logo={null}
          />
        ) : null}
        <Layout>
          <Content
            className={classNames(styles.mainLayoutContent, {
              [styles.hasHeader]: headerVisible,
              [styles.hasSider]: siderVisible,
            })}
          >
            {children}
          </Content>
          {Footer && !hideFooter ? <Footer /> : null}
        </Layout>
      </Layout>
    </Layout>
  )
}

export default HeaderLayout
