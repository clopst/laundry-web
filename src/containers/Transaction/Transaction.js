import React, { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce/useDebounce';
import { Button, Form, Input, Modal, Popover, Space, Table } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, FormOutlined } from '@ant-design/icons';
import PageHeader from '../../components/PageHeader/PageHeader';
import TransactionForm from '../../components/Form/TransactionForm/TransactionForm';
import { currencyFormatter } from '../../helpers/Currency';

const Transaction = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 800);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const dataSource = [
    {
        id: 1,
        cashier_id: 3,
        outlet_id: 1,
        customer_id: 1,
        invoice: 'LDB0001',
        date: '2021-03-01',
        product_id: 1,
        qty: 4,
        totalPrice: 28000
        
    },
    {
        id: 2,
        cashier_id: 4,
        outlet_id: 2,
        customer_id: 2,
        invoice: 'LDB0002',
        date: '2021-03-01',
        product_id: 2,
        qty: 1,
        totalPrice: 35000
    },
  ];

  const outlets = [
    {
        value: 1,
        label: 'Outlet Bandung'
    },
    {
        value: 2,
        label: 'Outlet Jakarta'
    }
  ];
  
  const customers = [
    {
        value: 1,
        label: 'John Doe'
    },
    {
        value: 2,
        label: 'Jane Doe'
    }
  ];

  const cashiers = [
    {
        value: 3,
        label: 'Bobby Doe'
    },
    {
        value: 4,
        label: 'Albert Doe'
    }
  ];

  const products = [
    {
        value: 1,
        label: 'Paket Kiloan',
        unit: 'kg'
    },
    {
        value: 2,
        label: 'Bed Cover',
        unit: 'pcs'
    }
  ]

  useEffect(() => {
    console.log('searching ...')
  }, [debouncedSearchTerm])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleCreateTransaction = (values) => {
    console.log(values);
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleCreate(false);
      setConfirmLoading(false);
    }, 2000);
  }

  const handleClickEdit = (id) => () => {
    const data = dataSource.find(data => data.id === id);
    editForm.setFieldsValue(data);
    setSelectedProduct(data.product_id);
    setVisibleEdit(true);
  }
  
  const handleEditTransaction = (values) => {
    console.log(values);
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleEdit(false);
      setConfirmLoading(false);
    }, 2000);
  }
  
  const handleClickDelete = (id) => () => {
    const data = dataSource.find(data => data.id === id);

    Modal.confirm({
      title: 'Hapus transaksi "' + data.name + '"?',
      icon: <ExclamationCircleOutlined />,
      content: 'Transaksi ini akan dihapus secara permanen',
      onOk: () => (
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
      ),
      onCancel: () => {
        console.log('canceled');
      }
    });
  }

  const columns = [
    {
        title: 'Kode Invoice',
        key: 'invoice',
        dataIndex: 'invoice',
        sorter: true,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Customer',
        key: 'customer',
        dataIndex: 'customer_id'
    },
    {
        title: 'Outlet',
        key: 'outlet_id',
        dataIndex: 'outlet_id'
    },
    {
        title: 'Produk',
        key: 'product',
        render: (text, record) => `${record.product_id}  (${record.qty})`
    },
    {
        title: 'Harga',
        key: 'totalPrice',
        render: (text, record) => currencyFormatter(record.totalPrice)
    },
    {
        title: 'Kasir',
        key: 'cashier',
        dataIndex: 'cashier_id'
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
          <Space size="middle">
            <Popover content="Edit">
              <Button 
                type="default" 
                icon={<FormOutlined />} 
                onClick={handleClickEdit(record.id)} />
            </Popover>
            <Popover content="Delete">
              <Button 
                type="default" 
                danger
                icon={<DeleteOutlined />}
                onClick={handleClickDelete(record.id)} />
            </Popover>
          </Space>
        )
    }
  ];
  
  const handleChangeTable = (pagination, filters, sorter, extra) => {
    console.log('table', pagination, filters, sorter, extra);
  }

  return (
    <React.Fragment>
      <PageHeader title="Transactions">
        <Input placeholder="Search ..." onChange={handleSearch} />
        <Button type="primary" onClick={() => setVisibleCreate(true)}>Create</Button>
      </PageHeader>

      <Table dataSource={dataSource} columns={columns} rowKey="id" onChange={handleChangeTable} />
      
      <TransactionForm
        form={createForm}
        formName="transaction-create-form"
        visible={visibleCreate}
        title="Create Transaksi"
        onCreate={handleCreateTransaction}
        onCancel={() => setVisibleCreate(false)}
        confirmLoading={confirmLoading}
        outlets={outlets}
        customers={customers}
        cashiers={cashiers}
        products={products}
        selectedProduct={selectedProduct} />
      
      <TransactionForm
        form={editForm}
        formName="transaction-edit-form"
        visible={visibleEdit}
        title="Edit Transaksi"
        onCreate={handleEditTransaction}
        onCancel={() => setVisibleEdit(false)}
        confirmLoading={confirmLoading}
        outlets={outlets}
        customers={customers}
        cashiers={cashiers}
        products={products}
        selectedProduct={selectedProduct} />
    </React.Fragment>
  );
}

export default Transaction;
