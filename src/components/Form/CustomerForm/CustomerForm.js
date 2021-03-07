import React from 'react';
import { Form, Input } from 'antd';
import ModalForm from '../../ModalForm/ModalForm';

const CustomerForm = (props) => (
  <ModalForm {...props}>
    <Form.Item 
      name="name" 
      label="Nama Customer"
      rules={[
        { required: true, message: 'Nama customer dibutuhkan' }
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item 
      name="email"
      label="Email"
      rules={[
        { type: 'email', message: 'Masukkan email yang valid' },
        { required: true, message: 'Email dibutuhkan' }
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item 
      name="phone_number"
      label="Nomor Telepon"
      rules={[
        { required: true, message: 'Nomor telepon dibutuhkan' }
      ]}
    >
      <Input />
    </Form.Item>
    
    <Form.Item 
      name="address"
      label="Alamat"
      rules={[
        { required: true, message: 'Alamat dibutuhkan' }
      ]}
    >
      <Input.TextArea />
    </Form.Item>
    
    {props.children}
  </ModalForm>
)

export default CustomerForm;
