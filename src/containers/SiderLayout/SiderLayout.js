import React, { useEffect, useState } from 'react';
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
import { useAuthContext } from '../../context/AuthContext';
import { getStorageUrl } from '../../helpers/backendUrl';

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

const ROUTE_LIST = [
  {
    path: '/users',
    title: 'User Management',
    icon: <UserOutlined />,
    component: UserManagement
  },
  {
    path: '/customers',
    title: 'Customers',
    icon: <TeamOutlined />,
    component: Customer
  },
  {
    path: '/outlets',
    title: 'Outlets',
    icon: <ShopOutlined />,
    component: Outlet
  },
  {
    path: '/products',
    title: 'Products',
    icon: <SkinOutlined />,
    component: Product
  },
  {
    path: '/transactions',
    title: 'Transactions',
    icon: <ShoppingOutlined />,
    component: Transaction
  }
];

const SiderLayout = (props) => {
  const { user, logout } = useAuthContext();
  
  const [collapsed, setCollapsed] = useState(false);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (!user) {
      setRoutes([]);
      return null;
    }

    const { role } = user;
    
    let paths = [];
    if (role === 'admin') {
      paths = ['/users', '/customers', '/outlets', '/products', '/transactions'];
    } else if (role === 'owner') {
      paths = ['/transactions'];
    } else if (role === 'cashier') {
      paths = ['/customers', '/transactions'];
    }

    setRoutes(ROUTE_LIST.filter(route => paths.includes(route.path)));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  
  const handleCollapse = value => {
    setCollapsed(value);
  }

  const renderMenuItems = () => {
    return routes.map(route => (
      <Menu.Item key={route.path} icon={route.icon}>
        <NavLink to={route.path}>
          {route.title}
        </NavLink>
      </Menu.Item>
    ));
  }
  
  const renderRouteComponents = () => {
    return routes.map(route => (
        <Route key={route.path} path={route.path} exact component={route.component} />
    ));
  }

  const profileMenu = (
    <Menu>
      <Menu.ItemGroup 
        title={
          <Text type="secondary" style={{ fontSize: 12 }}>Manage Account</Text>
        }
      />
      <Menu.Item key="/">
        <NavLink to="/profile">Profile</NavLink>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="/logout" onClick={logout}>Logout</Menu.Item>
    </Menu>
  );

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
            {renderMenuItems()}
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
            <Avatar 
              size='default'
              src={user?.avatar_path ? getStorageUrl(user.avatar_path) : null}
              icon={<UserOutlined />} 
              style={{ cursor: 'pointer' }} />
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
            <Route path="/profile" exact component={Profile} />
            {renderRouteComponents()}
          </Switch>
        </Content>

        <Footer style={{ textAlign: 'center' }}>Laundry App ©2020 Created by Dimas Nurfauzi</Footer>
      </Layout>
    </Layout>
  )
}

export default withRouter(SiderLayout);
