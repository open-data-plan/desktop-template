import App from '@/app'
import store from '@/redux'
import { actions } from 'aerux'
import { ConfigProvider } from 'antd'
import { createHashHistory } from 'history'
import React, { useState, useEffect, FC } from 'react'
import { Provider } from 'react-redux'
import { Locale } from 'antd/lib/locale-provider'

// history
const history = createHashHistory()
history.listen((nextLocation) => actions.location.locationChange(nextLocation))

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}

const Root: FC = () => {
  const [antdLocale, setAntdLocale] = useState<Locale>()

  useEffect(() => {
    let active = true
    const loadAntdLocale = async () => {
      let locale: any
      /* istanbul ignore next */
      if (process.env.NODE_ENV === 'test') {
        locale = await import('antd/lib/locale/zh_CN')
      } else {
        locale = await import('antd/es/locale/zh_CN')
      }

      if (active) {
        setAntdLocale(locale.default)
      }
    }

    loadAntdLocale()

    return () => {
      active = false
    }
  }, [])

  return (
    <Provider store={store}>
      <ConfigProvider locale={antdLocale}>
        <App history={history} />
      </ConfigProvider>
    </Provider>
  )
}

export default Root
