import { Layout, Space } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'
import NotFound from './404'
import { ModalProvider } from './common/hooks/useModal'
import './index.css'
import Index from './pages'
import Login from './pages/login'
import Members from './pages/members'
import store from './store'

const linkStyle = {
  color: '#bbd1b8',
  fontWeight: 'bolder',
  fontSize: '20px',
}

function App() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <Layout
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Sider
            style={{
              height: '100vh',
              minHeight: '20vw',
              padding: '1em',
              backgroundColor: '#386648',
            }}
          >
            <Space
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1b1b1c',
              }}
            >
              <Link style={linkStyle} to={{ pathname: '/' }}>
                Dashboard
              </Link>
              <Link style={linkStyle} to={{ pathname: '/members' }}>
                Members
              </Link>
              <Link style={linkStyle} to={{ pathname: '/login' }}>
                logout
              </Link>
            </Space>
          </Sider>
          <Space
            style={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Routes>
              <Route index path="/" element={<Index />} />
              <Route path="/members" element={<Members />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Space>
        </Layout>
      </ModalProvider>
    </Provider>
  )
}

export default App
