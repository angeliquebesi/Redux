import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { login, logout } from './store/user'
import { RootState, useAppDispatch } from './store/store'
import DeliveryComponent from './components/delivery'
import { Button, Flex, Layout } from 'antd'
import DetailComponent from './components/detail';

const { Header, Content } = Layout;

function App() {
  const dispatch = useAppDispatch()
  const user = useSelector((state: RootState) => state.user)

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
  };
  return (
    <Layout>
      <Header style={headerStyle}>
        <Flex gap='middle' justify='space-between' align='center'>
          <Button onClick={() => dispatch(login({ id: 1, name: 'John Doe', logged: true }))}>Login</Button>
          <Button onClick={() => dispatch(logout())}>Logout</Button>
          {user.logged ? <p>User name: {user.name}</p> : <></>}
        </Flex>
      </Header>
      <Content>
        <Router>
          <Routes>
            <Route path="/detail/:id" element={<DetailComponent />} />
            <Route path="/" element={user.logged ? <DeliveryComponent /> : <></>} />
          </Routes>
        </Router>
      </Content>
    </Layout>
  )
}

export default App
