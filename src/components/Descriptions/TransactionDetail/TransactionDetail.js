import React from 'react';
import { Descriptions, Modal, Skeleton } from 'antd';
import { PAYMENT_STATUS, TRANSACTION_STATUS } from '../../../helpers/const';
import { currencyFormatter } from '../../../helpers/currency';

const { Item } = Descriptions;

const TransactionDetail = (props) => {
  const { data } = props;

  return (
    <Modal
      visible={props.visible}
      title="Detail Transaksi"
      okText="Ok"
      onOk={props.onOk}
      onCancel={props.onCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <Skeleton loading={props.loading}>
        <Descriptions 
          bordered
          size="middle"
          column={1}
        >
          <Item label="Tanggal Transaksi">
            {data?.date}
          </Item>
          <Item label="Kode Invoice">
            {data?.invoice}
          </Item>
          <Item label="Outlet">
            {data?.outlet.name}
          </Item>
          <Item label="Customer">
            {data?.customer.name}
          </Item>
          <Item label="Alamat">
            {data?.customer.address}
          </Item>
          <Item label="Produk">
            {data?.product.name}
          </Item>
          <Item label="Qty">
            {data?.qty + ' ' + data?.product.unit}
          </Item>
          <Item label="Harga">
            {currencyFormatter(data?.total_price)}
          </Item>
          <Item label="Kasir">
            {data?.cashier.name}
          </Item>
          <Item label="Status Transaksi">
            {TRANSACTION_STATUS.find(status => status.value === data?.status)?.label}
          </Item>
          <Item label="Status Pembayaran">
            {PAYMENT_STATUS.find(status => status.value === data?.payment)?.label}
          </Item>
        </Descriptions>
      </Skeleton>
    </Modal>
  );
}

export default TransactionDetail;
