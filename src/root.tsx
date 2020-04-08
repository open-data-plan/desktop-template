import App from '@/app'
import store from '@/redux'
import { actions } from 'aerux'
import { ConfigProvider } from 'antd'
import { createHashHistory } from 'history'
import React from 'react'
import { Provider } from 'react-redux'

let locale: any

if (process.env.NODE_ENV === 'test') {
  locale = require('antd/lib/locale/en_US').default
} else {
  locale = require('antd/es/locale/en_US').default
}

// history
const history = createHashHistory()
history.listen((nextLocation) => actions.location.locationChange(nextLocation))

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}

const Root = () => (
  <Provider store={store}>
    <ConfigProvider locale={locale}>
      <App history={history} />
    </ConfigProvider>
  </Provider>
)

export default Root
