import flattenRoutes from '@/utils/flatten-routes'
import { useMemo } from 'react'
import useRoutes from './use-routes'

export default () => {
  const routes = useRoutes()
  const flattenedRoutes = useMemo(() => flattenRoutes(routes), [routes])

  return flattenedRoutes
}
