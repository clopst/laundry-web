import React from 'react';
import { DatePicker, Form, Modal, Select, Spin } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const ExportTransactionForm = (props) => {
  const { form, outlets } = props;

  const rangePresets = {
    'Hari Ini': [moment(), moment()],
    'Minggu Ini': [moment().startOf('week'), moment().endOf('week')],
    'Bulan Ini': [moment().startOf('month'), moment().endOf('month')],
    'Tahun Ini': [moment().startOf('year'), moment().endOf('year')]
  };
  
  const handleChange = (dates, dateStrings) => {
    // form.setFieldsValue({ date: dateStrings });
  }

  return (
    <Modal
      visible={props.visible}
      title="Generate Laporan Transaksi"
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
          layout="horizontal"
          name={props.formName}
          initialValues={props.initialValues}
          labelCol={{ span: 4 }}
        >
          <Form.Item
            name="date"
            label="Tanggal"
          >
            <RangePicker
              ranges={rangePresets}
              onChange={handleChange} />
          </Form.Item>
          
          <Form.Item
            name="outletIds"
            label="Outlet"
          >
            <Select
              mode="multiple"
              showSearch
              filterOption={(input, option) => (
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              )}
              placeholder="Pilih outlet (kosongkan jika ingin semua outlet)"
              allowClear
            >
              {outlets.map(outlet => (
                <Select.Option key={outlet.value} value={outlet.value}>{outlet.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}

export default ExportTransactionForm;
