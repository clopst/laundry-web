import React, { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce/useDebounce';
import { Button, Form, Input, message, Modal, Popover, Space, Table } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, FormOutlined, LockOutlined } from '@ant-design/icons';
import PageHeader from '../../components/PageHeader/PageHeader';
import UserForm from '../../components/Form/UserForm/UserForm';
import ChangePasswordUserForm from '../../components/Form/UserForm/ChangePasswordUserForm/ChangePasswordUserForm';
import PageBackground from '../../components/PageBackground/PageBackground';
import { changePasswordUser, destroyUser, indexUser, showUser, storeUser, updateUser } from '../../services/users';

const UserManagement = (props) => {
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
  const [visibleChangePassword, setVisibleChangePassword] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [changePasswordForm] = Form.useForm();

  // const dataSource = [
  //   {
  //       id: 1,
  //       name: 'John Doe',
  //       username: 'johndoe',
  //       email: 'johndoe@example.com',
  //       role: 'admin'
  //   },
  //   {
  //       id: 2,
  //       name: 'Jane Doe',
  //       username: 'janedoe',
  //       email: 'janedoe@example.com',
  //       role: 'admin'
  //   }
  // ];
  
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const getData = () => {
    setLoading(true);
    indexUser(query)
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

  const handleCreateUser = (values) => {
    console.log(values);
    setConfirmLoading(true);
    storeUser(values)
      .then(res => {
        setVisibleCreate(false);
        setConfirmLoading(false);
        message.success('Berhasil membuat user');
      });
  }

  const handleClickEdit = (id) => () => {
    setSelectedId(id);
    editForm.resetFields();
    setFormLoading(true);
    showUser(id)
      .then(res => {
        editForm.setFieldsValue(res.data);
        setFormLoading(false);
      });
    setVisibleEdit(true);
  }
  
  const handleEditUser = (values) => {
    setConfirmLoading(true);
    updateUser(selectedId, values)
      .then(res => {
        setVisibleEdit(false);
        setConfirmLoading(false);
        setSelectedId(null);
        message.success('Berhasil edit user');
      });
  }
  
  const handleClickChangePassword = (id) => () => {
    setSelectedId(id);
    setVisibleChangePassword(true);
  }

  const handleChangePasswordUser = (values) => {
    setConfirmLoading(true);
    changePasswordUser(selectedId, values)
      .then(res => {
        setVisibleChangePassword(false);
        setConfirmLoading(false);
        setSelectedId(null);
        message.success('Berhasil mengubah password user');
      });
  }
  
  const handleClickDelete = (id) => () => {
    const data = dataSource.find(data => data.id === id);

    Modal.confirm({
      title: 'Delete user "' + data.name + '"?',
      icon: <ExclamationCircleOutlined />,
      content: 'This user will be deleted permanently',
      onOk: () => (
        destroyUser(id).then(() => {
          message.success('Berhasil menghapus user');
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
        title: 'Nama',
        key: 'name',
        dataIndex: 'name',
        sorter: true
    },
    {
        title: 'Username',
        key: 'username',
        dataIndex: 'username',
        sorter: true
    },
    {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
        sorter: true
    },
    {
        title: 'Role',
        key: 'role',
        dataIndex: 'role',
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
            <Popover content="Ubah Password">
              <Button 
                type="default" 
                icon={<LockOutlined />}
                onClick={handleClickChangePassword(record.id)} />
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
      <PageHeader title="User Management">
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
      
      <UserForm
        form={createForm}
        formName="user-create-form"
        visible={visibleCreate}
        title="Create User"
        onCreate={handleCreateUser}
        onCancel={() => setVisibleCreate(false)}
        confirmLoading={confirmLoading}
      >
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Password dibutuhkan' },
            { min: 8, message: 'Password minimal 8 digit' }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="password_confirmation"
          label="Konfirmasi Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Harap konfirmasi password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('Konfirmasi password tidak sesuai'));
              },
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
      </UserForm>
      
      <UserForm
        form={editForm}
        formName="user-edit-form"
        visible={visibleEdit}
        title="Edit User"
        onCreate={handleEditUser}
        onCancel={() => setVisibleEdit(false)}
        confirmLoading={confirmLoading}
        formLoading={formLoading} />

      <ChangePasswordUserForm
        form={changePasswordForm}
        visible={visibleChangePassword}
        onCreate={handleChangePasswordUser}
        onCancel={() => setVisibleChangePassword(false)}
        confirmLoading={confirmLoading} />
    </PageBackground>
  );
}

export default UserManagement;
