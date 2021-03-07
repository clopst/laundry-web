import React, { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce/useDebounce';
import { Button, Form, Input, message, Modal, Popover, Space, Table } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, FormOutlined } from '@ant-design/icons';
import PageHeader from '../../components/PageHeader/PageHeader';
import CustomerForm from '../../components/Form/CustomerForm/CustomerForm';
import PageBackground from '../../components/PageBackground/PageBackground';
import { destroyCustomer, indexCustomer, showCustomer, storeCustomer, updateCustomer } from '../../services/customers';

const Customer = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    page: 1,
    perPage: 10,
    sortKey: 'id',
    sortOrder: 'asc',
    paginate: true,
    search: ''
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 800);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();

  // const dataSource = [
  //   {
  //       id: 1,
  //       name: 'John Doe',
  //       email: 'johndoe@example.com',
  //       phone_number: '081244556677',
  //       address: 'Jl. Sukamiskin No.7'
  //   },
  //   {
  //       id: 2,
  //       name: 'Jane Doe',
  //       email: 'janedoe@example.com',
  //       phone_number: '081244556688',
  //       address: 'Jl. Sukamiskin No.9'
  //   }
  // ];

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const getData = () => {
    setLoading(true);
    indexCustomer(query)
      .then(res => {
        setDataSource(res.data.results);
        setPagination({
          current: res.data.pagination.page,
          pageSize: res.data.pagination.pageSize,
          total: res.data.pagination.total
        })
        setLoading(false);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    setQuery({
      ...query,
      search: debouncedSearchTerm
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleCreateCustomer = (values) => {
    setConfirmLoading(true);
    storeCustomer(values)
      .then(res => {
        setVisibleCreate(false);
        setConfirmLoading(false);
        createForm.resetFields();
        message.success('Berhasil membuat customer');
        getData();
      });
  }

  const handleClickEdit = (id) => () => {
    setSelectedId(id);
    editForm.resetFields();
    setFormLoading(true);
    showCustomer(id)
      .then(res => {
        editForm.setFieldsValue(res.data);
        setFormLoading(false);
      });
    setVisibleEdit(true);
  }
  
  const handleEditCustomer = (values) => {
    setConfirmLoading(true);
    updateCustomer(selectedId, values)
      .then(res => {
        setVisibleEdit(false);
        setConfirmLoading(false);
        setSelectedId(null);
        message.success('Berhasil edit customer');
      });
  }
  
  const handleClickDelete = (id) => () => {
    const data = dataSource.find(data => data.id === id);

    Modal.confirm({
      title: 'Hapus customer "' + data.name + '"?',
      icon: <ExclamationCircleOutlined />,
      content: 'Data customer ini akan dihapus secara permanen',
      onOk: () => (
        destroyCustomer(id).then(() => {
          message.success('Berhasil menghapus customer');
          getData();
        })
      )
    });
  }

  const handleChangeTable = (pagination, filters, sorter, extra) => {
    const sort = {
      sortKey: sorter.order ? sorter.columnKey : 'id',
      sortOrder: sorter.order === 'descend' ? 'desc' : 'asc'
    };

    setQuery({
      ...query,
      ...sort,
      page: pagination.current
    });
  }

  const columns = [
    {
        title: 'Nama Customer',
        key: 'name',
        dataIndex: 'name',
        sorter: true
    },
    {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
        sorter: true
    },
    {
        title: 'Nomor Telepon',
        key: 'phone_number',
        dataIndex: 'phone_number',
        sorter: true
    },
    {
        title: 'Alamat',
        key: 'address',
        dataIndex: 'address',
        sorter: true
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

  return (
    <PageBackground>
      <PageHeader title="Customers">
        <Input placeholder="Search ..." onChange={handleSearch} />
        <Button type="primary" onClick={() => setVisibleCreate(true)}>Create</Button>
      </PageHeader>

      <Table 
        dataSource={dataSource} 
        columns={columns} 
        rowKey="id" 
        pagination={pagination}
        onChange={handleChangeTable}
        loading={loading} />
      
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
        confirmLoading={confirmLoading}
        formLoading={formLoading} />
    </PageBackground>
  );
}

export default Customer;
