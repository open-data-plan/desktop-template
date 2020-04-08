import { namespace as loadingNamespace } from '@/models/loading'
import { actions } from 'aerux'
import { isFSA } from 'flux-standard-action'
import { AnyAction, Dispatch, MiddlewareAPI } from 'redux'

function isLoadingAction(action: AnyAction) {
  return (action.type as string).startsWith(loadingNamespace)
}

export default function promiseMiddleware({ getState }: MiddlewareAPI) {
  return (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    const isLoading = isLoadingAction(action)
    if (!isLoading) {
      const state = getState()
      const loadingState = state[loadingNamespace]
      const isActionLoading = loadingState.actions[action.type]
      if (!isActionLoading) {
        // loading start
        actions.loading.updateLoadingState({
          loading: true,
          action,
        })
      }
    }
    const res = next(action)
    if (isFSA(res)) {
      if (!isLoading) {
        // loading end
        actions.loading.updateLoadingState({
          loading: false,
          action,
        })
      }
    }
    return res
  }
}
