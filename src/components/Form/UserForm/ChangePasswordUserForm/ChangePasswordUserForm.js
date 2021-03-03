import React from 'react';
import { Form, Input, Modal } from 'antd';

const ChangePasswordUserForm = (props) => {
  // const [form] = Form.useForm();
  const { form } = props;

  return (
    <Modal
      visible={props.visible}
      title="Ubah Password User"
      okText="Change"
      cancelText="Cancel"
      onCancel={props.onCancel}
      confirmLoading={props.confirmLoading}
      onOk={() => {
        form.validateFields()
          .then(values => {
            form.resetFields();
            props.onCreate(values);
          })
          .catch(info => {
            console.log('Validate failed: ', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name={props.formName}
        initialValues={props.initialValues}
      >
        <Form.Item
          name="password"
          label="Password Baru"
          rules={[
            { required: true, message: 'Password baru dibutuhkan' },
            { min: 8, message: 'Password minimal 8 digit' }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="password_confirmation"
          label="Konfirmasi Password Baru"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Harap konfirmasi password baru' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('Konfirmasi password baru tidak sesuai'));
              },
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ChangePasswordUserForm;
