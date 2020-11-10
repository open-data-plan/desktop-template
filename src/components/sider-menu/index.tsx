import React, { FC, useState, useCallback, ComponentType } from 'react'
import { Layout } from 'antd'
import { SiderTheme } from 'antd/lib/layout/Sider'
import BasicLogo from '@/components/basic-logo'
import styles from './index.module.less'
import classnames from 'classnames'
import NavMenu from '../nav-menu'

const { Sider } = Layout

interface Props {
  width?: number
  theme?: SiderTheme
  logo?: ComponentType | null
  className?: string
}

const SiderMenu: FC<Props> = ({
  width = 220,
  theme = 'dark',
  logo: Logo = BasicLogo,
  className,
}) => {
  const [collapsed, setCollapsed] = useState(false)

  const handleCollapsedChange = useCallback((collapsed) => {
    setCollapsed(collapsed)
  }, [])
  return (
    <Sider
      theme={theme}
      className={classnames(styles.siderMenu, className)}
      collapsible
      defaultCollapsed={collapsed}
      width={width}
      onCollapse={handleCollapsedChange}
    >
      {Logo ? (
        <div className={styles.siderMenuHeader}>
          <Logo collapsed={collapsed} />
        </div>
      ) : null}
      <NavMenu theme={theme} />
    </Sider>
  )
}

export default SiderMenu
