import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, Typography } from 'antd';
import ModalForm from '../../ModalForm/ModalForm';
import { currencyFormatter, currencyParser } from '../../../helpers/currency';

const selectFilterOption =  (input, option) => (
  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
);

const TransactionForm = (props) => {
  const { selectedProduct, disabled } = props;
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState(0);
  const [cashiers, setCashiers] = useState([]);

  useEffect(() => {
    const product = props.products.find(product => product.value === selectedProduct);
    if (product) {
      setUnit(product.unit);
      setPrice(product.price);
    } else {
      setUnit(0);
      setPrice(0);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct])

  const handleChangeProduct = value => {
    const product = props.products.find(product => product.value === value);
    if (product) {
      setUnit(product.unit);
      setPrice(product.price);
      setTotalPrice(props.form.getFieldValue('qty') ?? 0, product.price);
    } else {
      setUnit(0);
      setPrice(0);
      setTotalPrice(props.form.getFieldValue('qty') ?? 0, 0);
    }
  }

  const handleChangeQty = e => {
    setTotalPrice(e.target.value, price);
  }

  const setTotalPrice = (qty, price) => {
    const totalPrice = qty * price;
    props.form.setFieldsValue({ total_price: totalPrice });
  }

  const handleChangeOutlet = value => {
    setCashiers(props.cashiers.filter(cashier => cashier.depends === value));
    props.form.setFieldsValue({ cashier_id: null });
  }

  return (
    <ModalForm {...props}>
      <Typography.Text style={{ 
        display: disabled ? 'block' : 'none',
        marginBottom: 16
      }}>
        Transaksi yang sudah melewati status "Sedang Proses" tidak dapat di-edit.
      </Typography.Text>
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
          onChange={handleChangeOutlet}
          disabled={disabled}
        >
          {props.outlets.map(outlet => (
            <Select.Option key={outlet.value} value={outlet.value}>{outlet.label}</Select.Option>
          ))}
        </Select>
      </Form.Item>

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
          disabled={disabled}
        >
          {cashiers.map(cashier => (
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
          disabled={disabled}
        >
          {props.customers.map(cust => (
            <Select.Option key={cust.value} value={cust.value}>{cust.label}</Select.Option>
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
        <Input disabled={disabled} />
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
          disabled={disabled}
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
        onChange={handleChangeQty}
      >
        <Input 
          type="number" 
          min={0} 
          addonAfter={unit}
          disabled={disabled} />
      </Form.Item>

      <Form.Item 
        name="total_price"
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
