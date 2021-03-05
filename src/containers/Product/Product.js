import React, { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce/useDebounce';
import { Button, Form, Input, Modal, Popover, Space, Table } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, FormOutlined } from '@ant-design/icons';
import PageHeader from '../../components/PageHeader/PageHeader';
import ProductForm from '../../components/Form/ProductForm/ProductForm';
import { currencyFormatter } from '../../helpers/Currency';
import PageBackground from '../../components/PageBackground/PageBackground';

const Product = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 800);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const dataSource = [
    {
        id: 1,
        name: 'Paket Kiloan',
        unit: 'kg',
        price: 7000,
        outlet_id: null
    },
    {
        id: 1,
        name: 'Bed Cover',
        unit: 'pcs',
        price: 35000,
        outlet_id: null
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

  useEffect(() => {
    console.log('searching ...')
  }, [debouncedSearchTerm])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleCreateProduct = (values) => {
    console.log(values);
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleCreate(false);
      setConfirmLoading(false);
    }, 2000);
  }

  const handleClickEdit = (id) => () => {
    editForm.setFieldsValue(dataSource.find(data => data.id === id));
    setVisibleEdit(true);
  }
  
  const handleEditProduct = (values) => {
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
      title: 'Hapus produk "' + data.name + '"?',
      icon: <ExclamationCircleOutlined />,
      content: 'Produk ini akan dihapus secara permanen',
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
        title: 'Nama Produk',
        key: 'name',
        dataIndex: 'name',
        sorter: true,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Unit Produk',
        key: 'unit',
        dataIndex: 'unit'
    },
    {
        title: 'Harga',
        key: 'price',
        render: (text, record) => currencyFormatter(record.price)
    },
    {
        title: 'Outlet',
        key: 'outlet',
        render: (text, record) => (
          record.outlet_id ? record.outlet_id : 'Semua Outlet'
        )
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
    <PageBackground>
      <PageHeader title="Products">
        <Input placeholder="Search ..." onChange={handleSearch} />
        <Button type="primary" onClick={() => setVisibleCreate(true)}>Create</Button>
      </PageHeader>

      <Table dataSource={dataSource} columns={columns} rowKey="id" onChange={handleChangeTable} />
      
      <ProductForm
        form={createForm}
        formName="product-create-form"
        visible={visibleCreate}
        title="Create Product"
        onCreate={handleCreateProduct}
        onCancel={() => setVisibleCreate(false)}
        confirmLoading={confirmLoading}
        outlets={outlets} />
      
      <ProductForm
        form={editForm}
        formName="product-edit-form"
        visible={visibleEdit}
        title="Edit Product"
        onCreate={handleEditProduct}
        onCancel={() => setVisibleEdit(false)}
        confirmLoading={confirmLoading}
        outlets={outlets} />
    </PageBackground>
  );
}

export default Product;
