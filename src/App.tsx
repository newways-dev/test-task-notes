import { Layout } from 'antd'
import { Sidebar, Toolbar, Workspace } from './components'
const { Header, Sider, Content } = Layout

function App() {
  return (
    <div className='app'>
      <Layout style={{ background: '#fff', height: '100%' }}>
        <Header style={{ background: '#fff', paddingInline: '0' }}>
          <Toolbar />
        </Header>
        <Layout>
          <Sider style={{ background: '#fff', height: '100%' }}>
            <Sidebar />
          </Sider>
          <Content style={{ background: '#fff' }}>
            <Workspace />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default App
