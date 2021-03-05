import React from 'react';
import { Form, Input } from 'antd';
import AvatarUpload from './AvatarUpload/AvatarUpload';

const ProfileForm = (props) => (
  <Form
    layout="vertical"
    form={props.form}
    initialValues={props.initialValues}
    onFinish={props.onFinish}
    {...props}
  >
    <Form.Item 
      name="avatar"
      label="Foto Profil"
    >
      <AvatarUpload name="avatar" />
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
    
    <Form.Item 
      name="role"
      label="Role"
    >
      <Input disabled />
    </Form.Item>
  </Form>
);

export default ProfileForm;
