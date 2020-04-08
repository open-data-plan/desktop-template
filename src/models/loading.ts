import { createModel } from 'aerux'
import { AnyAction } from 'redux'
import { State } from '.'

interface LoadingPayload {
  loading: boolean
  action: AnyAction
}

type ModelStateMap = {
  [K in keyof State]: boolean
}

interface ActionStateMap {
  [actionType: string]: boolean
}

export interface LoadingModel {
  global: boolean
  models: Partial<ModelStateMap>
  actions: ActionStateMap
}

interface LoadingAction {
  type: string
  payload: LoadingPayload
}

const initialState: LoadingModel = {
  global: false,
  models: {},
  actions: {},
}

export const { namespace, reducer } = createModel({
  namespace: 'loading',
  state: initialState,
  actions: {
    updateLoadingState: (payload: LoadingPayload) => payload,
  },
  reducers: {
    updateLoadingState: (state: LoadingModel, action: LoadingAction) => {
      const { payload } = action
      const { loading, action: dispatchedAction } = payload
      const { type } = dispatchedAction
      const [model]: [keyof State] = type.split('/')

      const actions: ActionStateMap = {
        ...state.actions,
        [type]: loading,
      }
      const isModelLoading = Object.keys(actions)
        .filter((actionType) => actionType.startsWith(model))
        .some((actionType) => actions[actionType])
      const models: Partial<ModelStateMap> = {
        ...state.models,
        [model]: isModelLoading,
      }
      const isGlobalLoading = Object.keys(models).some(
        (modelName) => models[modelName as keyof State]
      )

      return {
        global: isGlobalLoading,
        models,
        actions,
      }
    },
  },
})

export default reducer
