import React, { FC, ReactNode } from 'react'
import styles from './index.module.less'
import { Avatar, Dropdown, Layout, Menu } from 'antd'
import BasicLogo from '../basic-logo'
import { UserOutlined } from '@ant-design/icons'

const { Header } = Layout

interface Props {
  left?: ReactNode | null
  center?: ReactNode | null
  right?: ReactNode | null
}

const HeaderRight: FC = () => {
  const userName = 'User'
  return (
    <div className={styles.userInfo}>
      <Avatar size="large" src="" icon={<UserOutlined />}>
        {userName}
      </Avatar>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item>退出登录</Menu.Item>
          </Menu>
        }
      >
        <span title={userName} className={styles.userName}>
          {userName}
        </span>
      </Dropdown>
    </div>
  )
}

const BasicHeader: FC<Props> = ({
  left = <BasicLogo />,
  right = <HeaderRight />,
  center,
}) => {
  return (
    <Header className={styles.basicHeader}>
      <div className={styles.basicHeaderLeft}>{left}</div>
      <div className={styles.basicHeaderCenter}>{center}</div>
      <div className={styles.basicHeaderRight}>{right}</div>
    </Header>
  )
}

export default BasicHeader
