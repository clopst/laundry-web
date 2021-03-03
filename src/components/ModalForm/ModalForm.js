import React from 'react'
import { Form, Modal } from 'antd';

const ModalForm = (props) => {
  // const [form] = Form.useForm();
  const { form } = props;

  return (
    <Modal
      visible={props.visible}
      title={props.title}
      okText={props.okText ?? 'Submit'}
      cancelText={props.cancelText ?? 'Cancel'}
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
      >
        {props.children}
      </Form>
    </Modal>
  );
}

export default ModalForm;
