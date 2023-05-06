import { Layout, Space } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useDispatch } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import NotFound from './404'
import bgImg from './assets/bg.jpg'
import { useAuth } from './common/hooks/useAuth'
import { ModalProvider } from './common/hooks/useModal'
import { Logo } from './components/icons/logo'
import './index.css'
import Index from './pages'
import Login from './pages/login'
import Members from './pages/members'
import redirectTo from './utils/redirect'

const linkStyle = {
  color: '#bbd1b8',
  fontWeight: 'bolder',
  fontSize: '20px',
}

function App() {
  const isAuth = useAuth()
  const dispatch = useDispatch()
  return (
    <ModalProvider>
      <Layout
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundImage: !isAuth && `url(${bgImg})`,
        }}
      >
        {isAuth && (
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
              <Logo />
              <Link style={linkStyle} to={{ pathname: '/' }}>
                Dashboard
              </Link>
              <Link style={linkStyle} to={{ pathname: '/members' }}>
                Members
              </Link>
              <Link
                style={linkStyle}
                onClick={() => {
                  dispatch({
                    type: 'USER_LOGOUT',
                  })
                  localStorage.removeItem('isLogin')
                  localStorage.removeItem('name')
                  localStorage.removeItem('role')
                  redirectTo('/')
                }}
              >
                logout
              </Link>
            </Space>
          </Sider>
        )}
        <Space
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <Routes>
            <Route path="/" element={isAuth ? <Index /> : <Login />} />
            <Route path="/members" element={isAuth ? <Members /> : <Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Space>
      </Layout>
    </ModalProvider>
  )
}

export default App
