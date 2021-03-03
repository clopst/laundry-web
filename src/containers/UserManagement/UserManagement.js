import React, { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce/useDebounce';
import { Button, Form, Input, Modal, Popover, Space, Table } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, FormOutlined, LockOutlined } from '@ant-design/icons';
import PageHeader from '../../components/PageHeader/PageHeader';
import UserForm from '../../components/Form/UserForm/UserForm';
import ChangePasswordUserForm from '../../components/Form/UserForm/ChangePasswordUserForm/ChangePasswordUserForm';

const UserManagement = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 800);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleChangePassword, setVisibleChangePassword] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [changePasswordForm] = Form.useForm();

  const dataSource = [
    {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        role: 'admin'
    },
    {
        id: 2,
        name: 'Jane Doe',
        username: 'janedoe',
        email: 'janedoe@example.com',
        role: 'admin'
    }
  ];

  useEffect(() => {
    console.log('searching ...')
  }, [debouncedSearchTerm])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleCreateUser = (values) => {
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
  
  const handleEditUser = (values) => {
    console.log(values);
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleEdit(false);
      setConfirmLoading(false);
    }, 2000);
  }
  
  const handleClickChangePassword = (id) => () => {
    setSelectedId(id);
    setVisibleChangePassword(true);
  }

  const handleChangePasswordUser = (values) => {
    console.log(values, selectedId);
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleChangePassword(false);
      setConfirmLoading(false);
      setSelectedId(null);
    }, 2000);
  }
  
  const handleClickDelete = (id) => () => {
    const data = dataSource.find(data => data.id === id);

    Modal.confirm({
      title: 'Delete user ' + data.name + '?',
      icon: <ExclamationCircleOutlined />,
      content: 'This user will be deleted permanently',
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
        title: 'Nama',
        key: 'name',
        dataIndex: 'name',
        sorter: true,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Username',
        key: 'username',
        dataIndex: 'username'
    },
    {
        title: 'Email',
        key: 'email',
        dataIndex: 'email'
    },
    {
        title: 'Role',
        key: 'role',
        dataIndex: 'role'
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
  
  const handleChangeTable = (pagination, filters, sorter, extra) => {
    console.log('table', pagination, filters, sorter, extra);
  }

  return (
    <React.Fragment>
      <PageHeader title="User Management">
        <Input placeholder="Search ..." onChange={handleSearch} />
        <Button type="primary" onClick={() => setVisibleCreate(true)}>Create</Button>
      </PageHeader>

      <Table dataSource={dataSource} columns={columns} rowKey="id" onChange={handleChangeTable} />
      
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
        confirmLoading={confirmLoading} />

      <ChangePasswordUserForm
        form={changePasswordForm}
        visible={visibleChangePassword}
        onCreate={handleChangePasswordUser}
        onCancel={() => setVisibleChangePassword(false)}
        confirmLoading={confirmLoading} />
    </React.Fragment>
  );
}

export default UserManagement;
