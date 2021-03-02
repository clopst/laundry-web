import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  PieChartOutlined,
  ShopOutlined,
  ShoppingOutlined,
  SkinOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './SiderLayout.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

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

        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            User Management
          </Menu.Item>
          <Menu.Item key="3" icon={<TeamOutlined />}>
            Customers
          </Menu.Item>
          <Menu.Item key="4" icon={<ShopOutlined />}>
            Outlets
          </Menu.Item>
          <Menu.Item key="5" icon={<SkinOutlined />}>
            Products
          </Menu.Item>
          <Menu.Item key="6" icon={<ShoppingOutlined />}>
            Transactions
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
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Bill is a cat.
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default SiderLayout;
