import { useMemo } from 'react'
import { useLocation } from 'react-router'
import { pathToRegexp } from 'path-to-regexp'
import useFlattenedRoutes from './use-flattened-routes'

export default () => {
  const { pathname } = useLocation()

  const flattenedRoutes = useFlattenedRoutes()

  const route = useMemo(
    () =>
      flattenedRoutes.find((route) => {
        if (!route.path) {
          return false
        } else if (Array.isArray(route.path)) {
          return route.path.some((path) => {
            const regExp = pathToRegexp(path, [], {})
            return regExp.test(pathname)
          })
        } else {
          const regExp = pathToRegexp(route.path, [], {})
          return regExp.test(pathname)
        }
      }) || {},
    [flattenedRoutes, pathname]
  )

  return route
}
