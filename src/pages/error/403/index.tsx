import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const Exception403 = () => (
  <Result
    status="403"
    title="403"
    subTitle="No Auth"
    extra={
      <Link to="/">
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
)

export default Exception403
