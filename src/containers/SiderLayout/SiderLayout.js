import React, { useState } from 'react';
import { Avatar, Dropdown, Layout, Menu } from 'antd';
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
import Product from '../Product/Product';
import Transaction from '../Transaction/Transaction';

const { Header, Content, Footer, Sider } = Layout;

const profileMenu = (
  <Menu>
    <Menu.Item key="0">
      <a href="https://www.antgroup.com">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="https://www.aliyun.com">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
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
        <Header className="site-layout-background" style={{ padding: '0px 24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h2>Laundry App</h2>
            <Dropdown overlay={profileMenu} trigger={['click']}>
              <Avatar size='large' icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div className="site-layout-background" style={{ padding: 24, height: '100%' }}>
            <Route path="/" exact render={() => 'Dashboard bung'} />
            <Route path="/users" exact component={UserManagement} />
            <Route path="/customers" exact component={Customer} />
            <Route path="/outlets" exact component={Outlet} />
            <Route path="/products" exact component={Product} />
            <Route path="/transactions" exact component={Transaction} />
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default withRouter(SiderLayout);
