import React from 'react';
import { Button, Form, Input } from 'antd';

const ChangePasswordProfileForm = (props) => (
  <Form
    layout="vertical"
    form={props.form}
    initialValues={props.initialValues}
    onFinish={props.onFinish}
  >
    <Form.Item
      name="current_password"
      label="Password Sekarang"
      rules={[
        { required: true, message: 'Password sekarang dibutuhkan' },
        { min: 8, message: 'Password minimal 8 digit' }
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="new_password"
      label="Password Baru"
      rules={[
        { required: true, message: 'Password baru dibutuhkan' },
        { min: 8, message: 'Password baru minimal 8 digit' }
      ]}
      hasFeedback
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="new_password_confirmation"
      label="Konfirmasi Password Baru"
      dependencies={['new_password']}
      hasFeedback
      rules={[
        { required: true, message: 'Harap konfirmasi password baru' },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('new_password') === value) {
              return Promise.resolve();
            }

            return Promise.reject(new Error('Konfirmasi password baru tidak sesuai'));
          },
        })
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item style={{ width: 100 }}>
      <Button type="primary" htmlType="submit" className="login-form-button" loading={props.submitLoading}>
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default ChangePasswordProfileForm;
