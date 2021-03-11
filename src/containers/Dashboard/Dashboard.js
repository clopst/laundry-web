import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Spin, Table, Typography } from 'antd';
import { ShopOutlined, ShoppingOutlined, SkinOutlined, TeamOutlined } from '@ant-design/icons';
import { currencyFormatter } from '../../helpers/currency';
import { indexDashboard } from '../../services/dashboard';
import handleError from '../../helpers/handleError';
import { PAYMENT_STATUS, TRANSACTION_STATUS } from '../../helpers/const';
import dayjs from 'dayjs';
import { useAuthContext } from '../../context/AuthContext';

const { Title } = Typography;

const Dashboard = (props) => {
  const { user } = useAuthContext();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    setLoading(true);
    indexDashboard()
      .then(res => {
        setData(res.data);
      })
      .catch(err => handleError(err))
      .finally(() => setLoading(false));
  }

  const iconStyle = {
    fontSize: 32
  };

  const cardList = [
    {
      key: 'today_transactions_count',
      title: 'Transaksi Hari Ini',
      amount: data.today_transactions_count ?? 0,
      icon: <ShoppingOutlined style={iconStyle} />
    },
    {
      key: 'customers_count',
      title: 'Jumlah Customer',
      amount: data.customers_count ?? 0,
      icon: <TeamOutlined style={iconStyle} />
    },
    {
      key: 'outlets_count',
      title: 'Jumlah Outlet',
      amount: data.outlets_count ?? 0,
      icon: <ShopOutlined style={iconStyle} />
    },
    {
      key: 'products_count',
      title: 'Jumlah Produk',
      amount: data.products_count ?? 0,
      icon: <SkinOutlined style={iconStyle} />
    }
  ];

  const renderCards = () => {
    if (!user) {
      return null;
    }

    const { role } = user;
    
    let keys = [];
    let span = 6;
    if (role === 'admin') {
      keys = ['today_transactions_count', 'customers_count', 'outlets_count', 'products_count'];
    } else if (role === 'owner') {
      keys = ['today_transactions_count'];
    } else if (role === 'cashier') {
      keys = ['today_transactions_count', 'customers_count'];
      span = 12;
    }

    return cardList.filter(card => keys.includes(card.key)).map(card => (
      <Col key={card.key} className="gutter-row" span={span}>
        <Card title={card.title}>
          <Row>
            <Col flex="auto">
              <Title level={3}>{card.amount}</Title>
            </Col>
            <Col flex="none">
              {card.icon}
            </Col>
          </Row>
        </Card>
      </Col>
    ));
  }

  // const dataSource = [
  //   {
  //       id: 1,
  //       cashier_id: 3,
  //       outlet_id: 1,
  //       customer_id: 1,
  //       invoice: 'LDB0001',
  //       date: '2021-03-01',
  //       product_id: 1,
  //       qty: 4,
  //       totalPrice: 28000,
  //       status: 'done',
  //       payment: 'done'
        
  //   },
  //   {
  //       id: 2,
  //       cashier_id: 4,
  //       outlet_id: 2,
  //       customer_id: 2,
  //       invoice: 'LDB0002',
  //       date: '2021-03-01',
  //       product_id: 2,
  //       qty: 1,
  //       totalPrice: 35000,
  //       status: 'process',
  //       payment: 'waiting'
  //   },
  // ];
  
  const columns = [
    {
        title: 'Tanggal Transaksi',
        key: 'date',
        render: (text, record) => dayjs(record.date).locale('id').format('DD MMMM YYYY')
    },
    {
        title: 'Kode Invoice',
        key: 'invoice',
        dataIndex: 'invoice'
    },
    {
        title: 'Customer',
        key: 'customer',
        render: (text, record) => record.customer.name
    },
    {
        title: 'Outlet',
        key: 'outlet',
        render: (text, record) => record.outlet.name
    },
    {
        title: 'Produk',
        key: 'product',
        render: (text, record) => `${record.product?.name} (${record.qty} ${record.product?.unit})`
    },
    {
        title: 'Harga',
        key: 'total_price',
        render: (text, record) => currencyFormatter(record.total_price)
    },
    {
        title: 'Kasir',
        key: 'cashier',
        render: (text, record) => record.cashier.name
    },
    {
        title: 'Status',
        key: 'status',
        render: (text, record) => TRANSACTION_STATUS.find(status => status.value === record.status)?.label
    },
    {
        title: 'Pembayaran',
        key: 'payment',
        render: (text, record) => PAYMENT_STATUS.find(status => status.value === record.payment)?.label
    }
  ];

  return (
    // <PageBackground noBg>
    <Spin spinning={loading}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {renderCards()}
        <Col span={24} style={{ marginTop: 16, minHeight: '200px' }}>
          <Card title="Transaksi Terbaru">
            <Card.Meta description="Daftar 10 Transaksi Terakhir" />
            <Table 
              dataSource={data.latest_transactions} 
              columns={columns} 
              rowKey="id" 
              pagination={false} 
              style={{ marginTop: 16 }} />
          </Card>
        </Col>
      </Row>
    </Spin>
    // </PageBackground>
  );
}

export default Dashboard;
