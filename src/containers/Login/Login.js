import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './Login.css';
import { useAuthContext } from '../../context/AuthContext';
import { Redirect } from 'react-router';
import Loading from '../../components/Loading/Loading';

const Login = () => {
  const { isLoggedIn, login, loading } = useAuthContext();

  const [submiLoading, setSubmiLoading] = useState(false);
  
  if (loading) {
    return <Loading spinning={true} />
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  const onFinish = (values) => {
    setSubmiLoading(true);
    login(values, () => setSubmiLoading(false));
  };

  return (
    <div className="login">
      <Card title="Laundry App">
        <Form
          className="login-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Harap masukkan username anda',
              },
            ]}
          >
            <Input type='text' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Harap masukkan password anda',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={submiLoading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
