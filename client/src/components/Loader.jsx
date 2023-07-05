import React from 'react'
import { Spin } from 'antd'

function Loader() {
  return (
    <div>
        <Spin className='loader' size="large" />
    </div>
  )
}

export default Loader