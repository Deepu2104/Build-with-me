// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Space, Spin } from 'antd';

export default function Loader() {
  return (
    <div className='loader'>
    <p>loading...</p>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  )
}
