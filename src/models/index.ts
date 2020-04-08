import { Location } from 'history'
import loading, { LoadingModel } from './loading'
import location from './location'

const reducers = {
  loading,
  location,
}

export default reducers

export interface State {
  loading: LoadingModel
  location: Location
}
