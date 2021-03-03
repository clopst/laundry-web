import React, { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce/useDebounce';
import { Button, Form, Input, Modal, Popover, Space, Table } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, FormOutlined } from '@ant-design/icons';
import PageHeader from '../../components/PageHeader/PageHeader';
import OutletForm from '../../components/Form/OutletForm/OutletForm';

const Outlet = (props) => {
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
        name: 'Outlet Bandung',
        phoneNumber: '081244556677',
        address: 'Jl. Bandung Negara'
    },
    {
        id: 2,
        name: 'Outlet Jakarta',
        phoneNumber: '081244556688',
        address: 'Jl. Jakarta Negara'
    }
  ];

  const owners = [
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

  useEffect(() => {
    console.log('searching ...')
  }, [debouncedSearchTerm])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleCreateOutlet = (values) => {
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
  
  const handleEditOutlet = (values) => {
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
      title: 'Hapus outlet "' + data.name + '"?',
      icon: <ExclamationCircleOutlined />,
      content: 'Outlet ini akan dihapus secara permanen',
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
        title: 'Nama Outlet',
        key: 'name',
        dataIndex: 'name',
        sorter: true,
        sortDirections: ['descend', 'ascend'],
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
    <React.Fragment>
      <PageHeader title="Outlets">
        <Input placeholder="Search ..." onChange={handleSearch} />
        <Button type="primary" onClick={() => setVisibleCreate(true)}>Create</Button>
      </PageHeader>

      <Table dataSource={dataSource} columns={columns} rowKey="id" onChange={handleChangeTable} />
      
      <OutletForm
        form={createForm}
        formName="outlet-create-form"
        visible={visibleCreate}
        title="Create Outlet"
        onCreate={handleCreateOutlet}
        onCancel={() => setVisibleCreate(false)}
        confirmLoading={confirmLoading}
        owners={owners}
        cashiers={cashiers} />
      
      <OutletForm
        form={editForm}
        formName="outlet-edit-form"
        visible={visibleEdit}
        title="Edit Outlet"
        onCreate={handleEditOutlet}
        onCancel={() => setVisibleEdit(false)}
        confirmLoading={confirmLoading}
        owners={owners}
        cashiers={cashiers} />
    </React.Fragment>
  );
}

export default Outlet;
