import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Button } from 'antd'

const Home = () => {
  console.log(1111)
  return (
    <div>
      <Button type="primary">Home</Button>
    </div>
  )
}

export default hot(Home)
