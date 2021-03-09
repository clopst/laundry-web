import React, { useState } from 'react';
import { Avatar, Dropdown, Layout, Menu, Typography } from 'antd';
import {
  PieChartOutlined,
  ShopOutlined,
  ShoppingOutlined,
  SkinOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './SiderLayout.css';
import { NavLink, Route, Switch, withRouter } from 'react-router-dom';
import UserManagement from '../UserManagement/UserManagement';
import Customer from '../Customer/Customer';
import Outlet from '../Outlet/Outlet';
import Product from '../Product/Product';
import Transaction from '../Transaction/Transaction';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

const profileMenu = (
  <Menu>
    <Text type="secondary" style={{ fontSize: 12, padding: 12 }}>Manage Account</Text>
    <Menu.Item key="/">
      <NavLink to="/profile">Profile</NavLink>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="/logout">Logout</Menu.Item>
  </Menu>
);

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
        <Header className="site-layout-background" style={{
          padding: '0px 24px', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between' }}
        >
          <Typography.Title level={3} style={{ marginTop: 8 }}>Laundry App</Typography.Title>
          <Dropdown overlay={profileMenu} trigger={['click']}>
            <Avatar size='default' icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
          </Dropdown>
        </Header>
        <Content style={{ margin: '16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          {/* <div className="site-layout-background" style={{ padding: 24, height: '100%' }}>
          </div> */}

          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/users" exact component={UserManagement} />
            <Route path="/customers" exact component={Customer} />
            <Route path="/outlets" exact component={Outlet} />
            <Route path="/products" exact component={Product} />
            <Route path="/transactions" exact component={Transaction} />
            <Route path="/profile" exact component={Profile} />
          </Switch>
        </Content>

        <Footer style={{ textAlign: 'center' }}>Laundry App ©2020 Created by Dimas Nurfauzi</Footer>
      </Layout>
    </Layout>
  )
}

export default withRouter(SiderLayout);
