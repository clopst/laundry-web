import React from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import ModalForm from '../../ModalForm/ModalForm';
import { currencyFormatter, currencyParser } from '../../../helpers/currency';

const selectFilterOption =  (input, option) => (
  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
);

const ProductForm = (props) => (
  <ModalForm {...props}>
    <Form.Item 
      name="name" 
      label="Nama Produk"
      rules={[
        { required: true, message: 'Nama produk dibutuhkan' }
      ]}
    >
      <Input />
    </Form.Item>
    
    <Form.Item 
      name="unit" 
      label="Unit Produk"
      rules={[
        { required: true, message: 'Unit produk dibutuhkan' }
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item 
      name="price"
      label="Harga"
      rules={[
        { required: true, message: 'Harga produk dibutuhkan' }
      ]}
    >
      <InputNumber
        style={{ width: '100%' }}
        min={0}
        formatter={currencyFormatter}
        parser={currencyParser}
      />
    </Form.Item>

    <Form.Item 
      name="description"
      label="Deskripsi"
    >
      <Input.TextArea />
    </Form.Item>
    
    <Form.Item 
      name="outlet_id"
      label="Outlet"
    >
      <Select
        showSearch
        filterOption={selectFilterOption}
        placeholder="Pilih outlet untuk produk ini"
        allowClear
      >
        <Select.Option key={0} value={null}>Semua Outlet</Select.Option>
        {props.outlets.map(role => (
          <Select.Option key={role.value} value={role.value}>{role.label}</Select.Option>
        ))}
      </Select>
    </Form.Item>
    
    {props.children}
  </ModalForm>
)

export default ProductForm;
