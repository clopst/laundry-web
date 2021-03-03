import React from 'react';
import { Form, Input, Modal } from 'antd';

const ChangePasswordUserForm = (props) => {
  // const [form] = Form.useForm();
  const { form } = props;

  return (
    <Modal
      visible={props.visible}
      title="Change Password"
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
          label="New Password"
          rules={[
            { required: true, message: 'Password is required' },
            { min: 8, message: 'Password is minimal 8 length' }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="password_confirmation"
          label="Confirm New Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Confirm the password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('The password confirmation does not match'));
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
