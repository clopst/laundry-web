import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  ShopOutlined,
  ShoppingOutlined,
  SkinOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './SiderLayout.css';
import { NavLink, Route, withRouter } from 'react-router-dom';
import UserManagement from '../UserManagement/UserManagement';
import Customer from '../Customer/Customer';
import Outlet from '../Outlet/Outlet';

const { Header, Content, Footer, Sider } = Layout;

const SiderLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const handleCollapse = value => {
    console.log(value);
    setCollapsed(value);
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse}>
        <div className="logo" />

        <Menu 
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          selectedKeys={[props.location.pathname]}>
          <Menu.Item key="/" icon={<PieChartOutlined />}>
            <NavLink to="/">
              Dashboard
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/users" icon={<UserOutlined />}>
            <NavLink to="/users">
              User Management
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<TeamOutlined />}>
            <NavLink to="/customers">
              Customers
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/outlets" icon={<ShopOutlined />}>
            <NavLink to="/outlets">
              Outlets
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/products" icon={<SkinOutlined />}>
            <NavLink to="/products">
              Products
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/transactions" icon={<ShoppingOutlined />}>
            <NavLink to="/transactions">
              Transactions
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: '0px 24px' }}>
          <h2>Laundry App</h2>
        </Header>
        <Content style={{ margin: '16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div className="site-layout-background" style={{ padding: 24, minHeight: 540 }}>
            <Route path="/" exact render={() => 'Dashboard bung'} />
            <Route path="/users" exact component={UserManagement} />
            <Route path="/customers" exact component={Customer} />
            <Route path="/outlets" exact component={Outlet} />
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default withRouter(SiderLayout);
