import React from 'react';
import { Form, Input, Select } from 'antd';
import ModalForm from '../../ModalForm/ModalForm';

const ROLES = [
  {
    value: 'admin',
    label: 'Admin'
  },
  {
    value: 'cashier',
    label: 'Cashier'
  },
  {
    value: 'owner',
    label: 'Owner'
  }
];

const UserForm = (props) => (
  <ModalForm {...props}>
    <Form.Item 
      name="name" 
      label="Name"
      rules={[
        { required: true, message: 'Name is required' }
      ]}
    >
      <Input />
    </Form.Item>
    
    <Form.Item 
      name="username" 
      label="Username"
      rules={[
        { required: true, message: 'Username is required' }
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item 
      name="email"
      label="Email"
      rules={[
        { type: 'email', message: 'Input a valid email' },
        { required: true, message: 'Email is required' }
      ]}
    >
      <Input />
    </Form.Item>
    
    <Form.Item 
      name="role"
      label="Role"
      rules={[
        { required: true, message: 'Role is required' }
      ]}
    >
      <Select
        placeholder="Select role"
        allowClear
      >
        {ROLES.map(role => (
          <Select.Option key={role.value} value={role.value}>{role.label}</Select.Option>
        ))}
      </Select>
    </Form.Item>
    
    {props.children}
  </ModalForm>
)

export default UserForm;
