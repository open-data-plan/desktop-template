import { RouteConfig } from '@/interfaces/route'

const flattenedRoutes: RouteConfig[] = []
const cache: RouteConfig[] = []

const flattenRoutes = (routes: RouteConfig[]) => {
  if (cache === routes) {
    return flattenedRoutes
  } else {
    routes.forEach((route) => {
      flattenedRoutes.push(route)
      if (Array.isArray(route.routes)) {
        flattenRoutes(route.routes)
      }
    })
    return flattenedRoutes
  }
}

export default flattenRoutes
