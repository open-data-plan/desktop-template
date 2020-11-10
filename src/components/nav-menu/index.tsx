import React, { FC, useCallback, useMemo, ReactNode } from 'react'
import { useLocation, useHistory, matchPath } from 'react-router-dom'
import { Menu } from 'antd'
import { RouteConfig } from '@/interfaces/route'
import { MenuProps } from 'antd/lib/menu'
import useRoutes from '@/hooks/use-routes'
import useFlattenedRoutes from '@/hooks/use-flattened-routes'

const { SubMenu, Item: MenuItem } = Menu

interface Props extends MenuProps {
  routes?: RouteConfig[]
}

function getKeyByPath(path?: string | string[]) {
  return Array.isArray(path) ? path[0] : path
}

function renderMenuItems(routes: RouteConfig[] = []): ReactNode[] {
  return routes
    .map((route) => {
      const { path, meta = {}, routes: childRoutes = [] } = route
      const { visible = true, title, icon } = meta
      const key = getKeyByPath(path)
      const visibleChildRoutes = childRoutes.filter(({ meta = {} }) => {
        const { visible = true } = meta
        return visible
      })
      if (visible) {
        const el = (
          <>
            {icon}
            <span>{title}</span>
          </>
        )
        if (visibleChildRoutes.length) {
          return (
            <SubMenu key={key} title={el}>
              {renderMenuItems(visibleChildRoutes)}
            </SubMenu>
          )
        } else {
          return <MenuItem key={key}>{el}</MenuItem>
        }
      } else {
        return null
      }
    })
    .filter((v) => v)
}

const NavMenu: FC<Props> = ({
  theme = 'dark',
  mode = 'inline',
  ...restProps
}) => {
  const routes = useRoutes()
  const { pathname } = useLocation()
  const history = useHistory()

  const flattenedRoutes = useFlattenedRoutes()

  const menu = useMemo(() => renderMenuItems(routes), [routes])

  const handleMenuItemClick = useCallback(
    ({ key }) => {
      if (pathname !== key) {
        history.push(key)
      }
    },
    [history, pathname]
  )

  const matchedKeys = useMemo(() => {
    return flattenedRoutes
      .map((route) => {
        const match = matchPath(pathname, route)
        return match ? getKeyByPath(route.path) : undefined
      })
      .filter((v) => v)
  }, [flattenedRoutes, pathname]) as string[]

  return (
    <Menu
      mode={mode}
      theme={theme}
      defaultOpenKeys={matchedKeys}
      selectedKeys={matchedKeys}
      onClick={handleMenuItemClick}
      {...restProps}
    >
      {menu}
    </Menu>
  )
}

export default NavMenu
