import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import ModalForm from '../../ModalForm/ModalForm';
import { currencyFormatter, currencyParser } from '../../../helpers/Currency';

const selectFilterOption =  (input, option) => (
  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
);

const TransactionForm = (props) => {
  const { selectedProduct } = props;
  const [unit, setUnit] = useState('');

  useEffect(() => {
    const unit = props.products.find(product => product.value === selectedProduct)?.unit ?? '';
    setUnit(unit);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct])

  const handleChangeProduct = (value) => {
      const unit = props.products.find(product => product.value === value)?.unit ?? '';
      setUnit(unit);
  }

  return (
    <ModalForm {...props}>
      <Form.Item 
        name="cashier_id"
        label="Kasir"
        rules={[
          { required: true, message: 'Kasir dibutuhkan' }
        ]}
      >
        <Select
          showSearch
          filterOption={selectFilterOption}
          placeholder="Pilih kasir untuk transaksi ini"
          allowClear
        >
          {props.cashiers.map(cashier => (
            <Select.Option key={cashier.value} value={cashier.value}>{cashier.label}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item 
        name="customer_id"
        label="Customer"
        rules={[
          { required: true, message: 'Customer dibutuhkan' }
        ]}
      >
        <Select
          showSearch
          filterOption={selectFilterOption}
          placeholder="Pilih customer untuk transaksi ini"
          allowClear
        >
          {props.customers.map(cust => (
            <Select.Option key={cust.value} value={cust.value}>{cust.label}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      
      <Form.Item 
        name="outlet_id"
        label="Outlet"
        rules={[
          { required: true, message: 'Produk laundry dibutuhkan' }
        ]}
      >
        <Select
          showSearch
          filterOption={selectFilterOption}
          placeholder="Pilih outlet untuk transaksi ini"
          allowClear
        >
          {props.outlets.map(outlet => (
            <Select.Option key={outlet.value} value={outlet.value}>{outlet.label}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item 
        name="invoice" 
        label="Kode Invoice"
        rules={[
          { required: true, message: 'Kode invoice dibutuhkan' }
        ]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item 
        name="product_id" 
        label="Produk Laundry"
        rules={[
          { required: true, message: 'Produk laundry dibutuhkan' }
        ]}
      >
        <Select
          showSearch
          filterOption={selectFilterOption}
          placeholder="Pilih produk untuk transaksi ini"
          allowClear
          onChange={handleChangeProduct}
        >
          {props.products.map(product => (
            <Select.Option key={product.value} value={product.value}>{product.label}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      
      <Form.Item 
        name="qty"
        label="Jumlah"
        rules={[
          { required: true, message: 'Jumlah dibutuhkan' }
        ]}
      >
        <Input 
          type="number" addonAfter={unit} />
      </Form.Item>

      <Form.Item 
        name="totalPrice"
        label="Harga Total"
        rules={[
          { required: true, message: 'Harga total dibutuhkan' }
        ]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          formatter={currencyFormatter}
          parser={currencyParser}
          disabled
        />
      </Form.Item>
      
      {props.children}
    </ModalForm>
  );
}

export default TransactionForm;