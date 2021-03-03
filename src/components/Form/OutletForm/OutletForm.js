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
      label="Outlet Name"
      rules={[
        { required: true, message: 'Outlet name is required' }
      ]}
    >
      <Input />
    </Form.Item>
    
    <Form.Item 
      name="code" 
      label="Outlet Code"
      rules={[
        { required: true, message: 'Outlet code is required' }
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
    
    <Form.Item 
      name="owners"
      label="Owner"
      rules={[
        { required: true, message: 'Owner is required' }
      ]}
    >
      <Select
        mode="multiple"
        showSearch
        filterOption={selectFilterOption}
        placeholder="Select owner for this outlet"
        allowClear
      >
        {props.owners.map(role => (
          <Select.Option key={role.value} value={role.value}>{role.label}</Select.Option>
        ))}
      </Select>
    </Form.Item>
    
    <Form.Item 
      name="cashiers"
      label="Cashier"
      rules={[
        { required: true, message: 'Cashier is required' }
      ]}
    >
      <Select
        mode="multiple"
        showSearch
        filterOption={selectFilterOption}
        placeholder="Select cashier for this outlet"
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
