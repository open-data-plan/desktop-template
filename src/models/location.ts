import { createModel } from 'aerux'
import { Location, parsePath } from 'history'
import { AnyAction } from 'redux'

const initialState: Location = parsePath(window.location.hash.replace('#', ''))

export const { namespace, reducer } = createModel({
  namespace: 'location',
  state: initialState,
  actions: {
    locationChange: (payload: Location) => payload,
  },
  reducers: {
    locationChange: (state: Location, { payload }: AnyAction): Location =>
      payload,
  },
})

export default reducer
