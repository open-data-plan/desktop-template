import { ActionMeta } from 'redux-actions'
import { isError } from 'flux-standard-action'
import { message } from 'antd'

const last = {
  message: '',
  timestamp: Date.now(),
}

const timeInterval = 2 * 1000

function isPromise(val: any) {
  return val && typeof val.then === 'function'
}

interface Meta {
  success?: string
  error?: string
}

function shouldShowMessage(message: string) {
  const timestamp = Date.now()
  if (!message) {
    return false
  }
  if (
    last.message !== message ||
    (last.message === message && last.timestamp + timeInterval < timestamp)
  ) {
    last.message = message
    last.timestamp = timestamp
    return true
  }
  return false
}

export default () => (next: any) => (action: ActionMeta<any, Meta>) => {
  if (!isPromise(action.payload)) {
    if (isError(action)) {
      let error = action.payload
      if (error.message === 'Failed to fetch') {
        error = {
          message: '网络异常',
        }
      }
      const meta: Meta = action.meta
      if (meta && meta.error) {
        error = {
          message: meta.error,
        }
      }
      if (process.env.NODE_ENV === 'development') {
        // tslint:disable-next-line
        console.log(action)
      }
      if (shouldShowMessage(error.message)) {
        message.error(error.message)
      }
    } else if (action.meta && action.meta.success) {
      if (shouldShowMessage(action.meta.success)) {
        message.success(action.meta.success)
      }
    }
  }
  return next(action)
}
