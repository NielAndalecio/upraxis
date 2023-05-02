import { Layout } from 'antd'
import React from 'react'

function NotFound() {
  return (
    <Layout
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h2>Upraxis</h2>
      <div>Error 404 | Page not found</div>
    </Layout>
  )
}

export default NotFound
