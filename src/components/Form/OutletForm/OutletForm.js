import React from 'react';
import { Form, Input, Select } from 'antd';
import ModalForm from '../../ModalForm/ModalForm';

const selectFilterOption =  (input, option) => (
  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
);

const OutletForm = (props) => (
  <ModalForm {...props}>
    <Form.Item 
      name="name" 
      label="Nama Outlet"
      rules={[
        { required: true, message: 'Nama outlet dibutuhkan' }
      ]}
    >
      <Input />
    </Form.Item>
    
    {/* <Form.Item 
      name="code" 
      label="Kode Outlet"
      rules={[
        { required: true, message: 'Kode outlet dibutuhkan' }
      ]}
    >
      <Input />
    </Form.Item> */}

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
    
    <Form.Item 
      name="owner_ids"
      label="Owner"
    >
      <Select
        mode="multiple"
        showSearch
        filterOption={selectFilterOption}
        placeholder="Pilih owner untuk outlet ini"
        allowClear
      >
        {props.owners.map(role => (
          <Select.Option key={role.value} value={role.value}>{role.label}</Select.Option>
        ))}
      </Select>
    </Form.Item>
    
    <Form.Item 
      name="cashier_ids"
      label="Kasir"
    >
      <Select
        mode="multiple"
        showSearch
        filterOption={selectFilterOption}
        placeholder="Pilih kasir untuk outlet ini"
        allowClear
      >
        {props.cashiers.map(role => (
          <Select.Option key={role.value} value={role.value}>{role.label}</Select.Option>
        ))}
      </Select>
    </Form.Item>
    
    {props.children}
  </ModalForm>
)

export default OutletForm;
