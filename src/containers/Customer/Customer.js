import React, { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce/useDebounce';
import { Button, Form, Input, Modal, Popover, Space, Table } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, FormOutlined } from '@ant-design/icons';
import PageHeader from '../../components/PageHeader/PageHeader';
import CustomerForm from '../../components/Form/CustomerForm/CustomerForm';
import PageBackground from '../../components/PageBackground/PageBackground';

const Customer = (props) => {
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
        name: 'John Doe',
        email: 'johndoe@example.com',
        phoneNumber: '081244556677',
        address: 'Jl. Sukamiskin No.7'
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        phoneNumber: '081244556688',
        address: 'Jl. Sukamiskin No.9'
    }
  ];

  useEffect(() => {
    console.log('searching ...')
  }, [debouncedSearchTerm])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleCreateCustomer = (values) => {
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
  
  const handleEditCustomer = (values) => {
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
      title: 'Hapus pelanggan "' + data.name + '"?',
      icon: <ExclamationCircleOutlined />,
      content: 'Data pelanggan ini akan dihapus secara permanen',
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
        title: 'Nama Customer',
        key: 'name',
        dataIndex: 'name',
        sorter: true,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Email',
        key: 'email',
        dataIndex: 'email'
    },
    {
        title: 'Nomor Telepon',
        key: 'phoneNumber',
        dataIndex: 'phoneNumber'
    },
    {
        title: 'Alamat',
        key: 'address',
        dataIndex: 'address'
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
      <PageHeader title="Customers">
        <Input placeholder="Search ..." onChange={handleSearch} />
        <Button type="primary" onClick={() => setVisibleCreate(true)}>Create</Button>
      </PageHeader>

      <Table dataSource={dataSource} columns={columns} rowKey="id" onChange={handleChangeTable} />
      
      <CustomerForm
        form={createForm}
        formName="customer-create-form"
        visible={visibleCreate}
        title="Create Customer"
        onCreate={handleCreateCustomer}
        onCancel={() => setVisibleCreate(false)}
        confirmLoading={confirmLoading} />
      
      <CustomerForm
        form={editForm}
        formName="customer-edit-form"
        visible={visibleEdit}
        title="Edit Customer"
        onCreate={handleEditCustomer}
        onCancel={() => setVisibleEdit(false)}
        confirmLoading={confirmLoading} />
    </PageBackground>
  );
}

export default Customer;
