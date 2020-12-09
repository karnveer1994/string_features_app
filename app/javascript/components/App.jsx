import React, { useState } from "react"
import { Router, Route, Link } from "react-router-dom"
import { createBrowserHistory } from "history"
import { Layout, Menu, Button} from 'antd';
import SignUp from "./signUp"
import SignIn from "./signIn"
import MatchForm from './matchForm'
import MatchRecords from './matchRecords'
import 'antd/dist/antd.css';
import './main.css';

const { Header, Content, Footer } = Layout;
const history = createBrowserHistory()

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const path = history.location.pathname.replace('/','')
  const handleSignOut = () => {
    localStorage.clear('token')
    history.push('/sign_in')
    localStorage.setItem('token','')
    refreshToken()
  }

  const refreshToken = () => {
    setToken(localStorage.getItem('token'))
  }

  return (
    <Router history={history}>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          {
            token && 
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={path || 'list'}>
              <Menu.Item key="list"><Link to="/list"><Button type="primary">Matching Records</Button></Link></Menu.Item>
              <Menu.Item key="new"><Link to="/new"><Button type="primary">String Matcher</Button></Link></Menu.Item>
              <Menu.Item key="signout">
                <Button type="primary" onClick={handleSignOut}>Sign Out</Button>
              </Menu.Item>
            </Menu>
          }
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Route history={history} exact path="/" render={(props) => token ? <MatchRecords {...props}/> : <SignIn refreshToken={refreshToken} {...props} />} />
            <Route history={history} path={"/sign_up"} component={SignUp} />
            <Route history={history} path={"/sign_in"} render={(props) => <SignIn refreshToken={refreshToken} {...props} />} />
            <Route history={history} path={"/new"} component={MatchForm} />
            <Route history={history} path={"/list"} component={MatchRecords} />
          </div>
        </Content>
        <Footer />
      </Layout>
    </Router>
  )
}
