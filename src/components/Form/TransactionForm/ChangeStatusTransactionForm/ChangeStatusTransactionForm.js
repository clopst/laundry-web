import React, { useEffect, useState } from 'react';
import { Form, Modal, Select, Spin } from 'antd';
import { TRANSACTION_STATUS, PAYMENT_STATUS } from '../../../../helpers/const';

const ChangeStatusTransactionForm = (props) => {
  const { form, status, payment } = props;

  const [disabledStatus, setDisabledStatus] = useState([]);
  const [disabledPayment, setDisabledPayment] = useState([]);

  useEffect(() => {
    switch (status) {
      case 'done':
        setDisabledStatus(['process', 'pickup']);
        break;

      case 'pickup':
        setDisabledStatus(['process']);
        break;
    
      default:
        setDisabledStatus([]);
        break;
    }

    switch (payment) {
      case 'done':
        setDisabledPayment(['pending']);
        break;
    
      default:
        setDisabledPayment([]);
        break;
    }
  }, [status, payment])

  return (
    <Modal
      visible={props.visible}
      title="Ubah Status Transaksi"
      okText="Submit"
      cancelText="Cancel"
      onCancel={props.onCancel}
      confirmLoading={props.confirmLoading}
      onOk={() => {
        form.validateFields()
          .then(values => {
            props.onCreate(values);
          })
          .catch(info => {
            console.log('Validate failed: ', info);
          });
      }}
    >
      <Spin spinning={props.formLoading ?? false}>
        <Form
          form={form}
          layout="vertical"
          name={props.formName}
          initialValues={props.initialValues}
        >
          <Form.Item
            name="status"
            label="Status Transaksi"
            dependencies={['payment']}
            rules={[
              { required: true, message: 'Status transaksi dibutuhkan' },
              ({ getFieldValue }) => ({
              validator(_, value) {
                if (value === 'done' && getFieldValue('payment') === 'pending') {
                  return Promise.reject(new Error('Status pembayaran belum dibayar. Mohon konfirmasi status pembayaran.'));
                }
                return Promise.resolve();
              },
            }),
            ]}
          >
            <Select
              showSearch
              filterOption={(input, option) => (
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              )}
              placeholder="Pilih status transaksi untuk transaksi ini"
            >
              {TRANSACTION_STATUS.map(status => (
                <Select.Option 
                  key={status.value} 
                  value={status.value}
                  disabled={disabledStatus.includes(status.value)}
                >
                  {status.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="payment"
            label="Status Pembayaran"
            rules={[
              { required: true, message: 'Status pembayaran dibutuhkan' }
            ]}
          >
            <Select
              showSearch
              filterOption={(input, option) => (
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              )}
              placeholder="Pilih status pembayaran untuk transaksi ini"
            >
              {PAYMENT_STATUS.map(status => (
                <Select.Option 
                  key={status.value} 
                  value={status.value}
                  disabled={disabledPayment.includes(status.value)}
                >
                  {status.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}

export default ChangeStatusTransactionForm;
