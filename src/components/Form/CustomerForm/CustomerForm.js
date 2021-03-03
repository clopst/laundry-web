import React from 'react';
import { Form, Input, Select } from 'antd';
import ModalForm from '../../ModalForm/ModalForm';

const CustomerForm = (props) => (
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
      name="phoneNumber"
      label="Phone Number"
      rules={[
        { required: true, message: 'Phone number is required' }
      ]}
    >
      <Input />
    </Form.Item>
    
    <Form.Item 
      name="address"
      label="Address"
      rules={[
        { required: true, message: 'Address is required' }
      ]}
    >
      <Input.TextArea />
    </Form.Item>
    
    {props.children}
  </ModalForm>
)

export default CustomerForm;
