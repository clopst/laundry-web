import React, { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce/useDebounce';
import { Button, Form, Input, message, Modal, Popover, Space, Table } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, FormOutlined } from '@ant-design/icons';
import PageHeader from '../../components/PageHeader/PageHeader';
import OutletForm from '../../components/Form/OutletForm/OutletForm';
import PageBackground from '../../components/PageBackground/PageBackground';
import { destroyOutlet, getDropdownsOutlet, indexOutlet, showOutlet, storeOutlet, updateOutlet } from '../../services/outlets';

const Outlet = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [dropdowns, setDropdowns] = useState({});
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
  //       name: 'Outlet Bandung',
  //       phoneNumber: '081244556677',
  //       address: 'Jl. Bandung Negara'
  //   },
  //   {
  //       id: 2,
  //       name: 'Outlet Jakarta',
  //       phoneNumber: '081244556688',
  //       address: 'Jl. Jakarta Negara'
  //   }
  // ];

  // const owners = [
  //   {
  //       value: 1,
  //       label: 'John Doe'
  //   },
  //   {
  //       value: 2,
  //       label: 'Jane Doe'
  //   }
  // ];

  // const cashiers = [
  //   {
  //       value: 3,
  //       label: 'Bobby Doe'
  //   },
  //   {
  //       value: 4,
  //       label: 'Albert Doe'
  //   }
  // ];

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const getData = () => {
    setLoading(true);
    indexOutlet(query)
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

  const handleClickCreate = () => {
    setVisibleCreate(true);
    setFormLoading(true);
    getDropdownsOutlet()
      .then(res => {
        setDropdowns(res.data);
        setFormLoading(false);
      })
  }

  const handleCreate = (values) => {
    setConfirmLoading(true);
    storeOutlet(values)
      .then(res => {
        setVisibleCreate(false);
        setConfirmLoading(false);
        createForm.resetFields();
        message.success('Berhasil membuat outlet');
        getData();
      });
  }

  const handleClickEdit = (id) => () => {
    setSelectedId(id);
    editForm.resetFields();
    setFormLoading(true);
    Promise.all([showOutlet(id), getDropdownsOutlet({ id })])
      .then(res => {
        editForm.setFieldsValue(res[0].data);
        setDropdowns(res[1].data);
        setFormLoading(false);
      })
    setVisibleEdit(true);
  }
  
  const handleEdit = (values) => {
    console.log(values)
    setConfirmLoading(true);
    updateOutlet(selectedId, values)
      .then(res => {
        setVisibleEdit(false);
        setConfirmLoading(false);
        setSelectedId(null);
        message.success('Berhasil edit outlet');
      });
  }
  
  const handleClickDelete = (id) => () => {
    const data = dataSource.find(data => data.id === id);

    Modal.confirm({
      title: 'Hapus outlet "' + data.name + '"?',
      icon: <ExclamationCircleOutlined />,
      content: 'Data outlet ini akan dihapus secara permanen',
      onOk: () => (
        destroyOutlet(id).then(() => {
          message.success('Berhasil menghapus outlet');
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
        title: 'Nama Outlet',
        key: 'name',
        dataIndex: 'name',
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
      <PageHeader title="Outlets">
        <Input placeholder="Search ..." onChange={handleSearch} />
        <Button type="primary" onClick={handleClickCreate}>Create</Button>
      </PageHeader>

      <Table 
        dataSource={dataSource} 
        columns={columns} 
        rowKey="id" 
        pagination={pagination}
        onChange={handleChangeTable}
        loading={loading} />
      
      <OutletForm
        form={createForm}
        formName="outlet-create-form"
        visible={visibleCreate}
        title="Create Outlet"
        onCreate={handleCreate}
        onCancel={() => setVisibleCreate(false)}
        confirmLoading={confirmLoading}
        formLoading={formLoading}
        owners={dropdowns.owners ?? []}
        cashiers={dropdowns.cashiers ?? []} />
      
      <OutletForm
        form={editForm}
        formName="outlet-edit-form"
        visible={visibleEdit}
        title="Edit Outlet"
        onCreate={handleEdit}
        onCancel={() => setVisibleEdit(false)}
        confirmLoading={confirmLoading}
        formLoading={formLoading}
        owners={dropdowns.owners ?? []}
        cashiers={dropdowns.cashiers ?? []} />
    </PageBackground>
  );
}

export default Outlet;
