import React from 'react';
import { Button, Form, Input, Spin } from 'antd';
import AvatarUpload from './AvatarUpload/AvatarUpload';
import { useAuthContext } from '../../../context/AuthContext';
import { getStorageUrl } from '../../../helpers/backendUrl';

const ProfileForm = (props) => {
  const { user } = useAuthContext();

  const handleAvatar = (image) => {
    props.form.setFieldsValue({ avatar_path: image });
  }

  return (
    <Spin spinning={props.loading}>
      <Form
        layout="vertical"
        form={props.form}
        initialValues={props.initialValues}
        onFinish={props.onFinish}
        wrapperCol={props.wrapperCol}
      >
        <Form.Item 
          name="avatar_path"
          label="Foto Profil"
        >
          <AvatarUpload 
            imageUrl={user?.avatar_path ? getStorageUrl(user.avatar_path) : null} 
            handleImage={handleAvatar} />
        </Form.Item>

        <Form.Item 
          name="name"
          label="Nama"
        >
          <Input />
        </Form.Item>
        
        <Form.Item 
          name="username"
          label="Username"
        >
          <Input />
        </Form.Item>
        
        <Form.Item 
          name="email"
          label="Email"
        >
          <Input />
        </Form.Item>
        
        {/* <Form.Item 
          name="role"
          label="Role"
        >
          <Input disabled />
        </Form.Item> */}

        <Form.Item style={{ width: 100 }}>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={props.submitLoading}>
            Simpan
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default ProfileForm;
