import models from '@/models'

export const makeRootReducer = (asyncReducers = {}): any => ({
  ...models,
  ...asyncReducers,
})
