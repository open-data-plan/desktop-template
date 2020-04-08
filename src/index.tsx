import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}

ReactDOM.render(<Root />, document.getElementById('root'))
