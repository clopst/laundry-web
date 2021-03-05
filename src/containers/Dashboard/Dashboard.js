import React from 'react';
import { Card, Col, Row, Table, Typography } from 'antd';
import { ShopOutlined, ShoppingOutlined, SkinOutlined, TeamOutlined } from '@ant-design/icons';
import { currencyFormatter } from '../../helpers/Currency';

const { Title } = Typography;

const Dashboard = (props) => {
  const iconStyle = {
    fontSize: 32
  };

  const cards = [
    {
      title: 'Transaksi Hari Ini',
      amount: 10,
      icon: <ShoppingOutlined style={iconStyle} />
    },
    {
      title: 'Jumlah Customer',
      amount: 14,
      icon: <TeamOutlined style={iconStyle} />
    },
    {
      title: 'Jumlah Outlet',
      amount: 3,
      icon: <ShopOutlined style={iconStyle} />
    },
    {
      title: 'Jumlah Produk',
      amount: 4,
      icon: <SkinOutlined style={iconStyle} />
    }
  ];

  const renderCards = cards.map(card => (
    <Col className="gutter-row" span={6}>
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

  const dataSource = [
    {
        id: 1,
        cashier_id: 3,
        outlet_id: 1,
        customer_id: 1,
        invoice: 'LDB0001',
        date: '2021-03-01',
        product_id: 1,
        qty: 4,
        totalPrice: 28000,
        status: 'done',
        payment: 'done'
        
    },
    {
        id: 2,
        cashier_id: 4,
        outlet_id: 2,
        customer_id: 2,
        invoice: 'LDB0002',
        date: '2021-03-01',
        product_id: 2,
        qty: 1,
        totalPrice: 35000,
        status: 'process',
        payment: 'waiting'
    },
  ];
  
  const columns = [
    {
        title: 'Kode Invoice',
        key: 'invoice',
        dataIndex: 'invoice',
        sorter: true,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Customer',
        key: 'customer',
        dataIndex: 'customer_id'
    },
    {
        title: 'Outlet',
        key: 'outlet_id',
        dataIndex: 'outlet_id'
    },
    {
        title: 'Produk',
        key: 'product',
        render: (text, record) => `${record.product_id}  (${record.qty})`
    },
    {
        title: 'Harga',
        key: 'totalPrice',
        render: (text, record) => currencyFormatter(record.totalPrice)
    },
    {
        title: 'Kasir',
        key: 'cashier',
        dataIndex: 'cashier_id'
    }
  ];

  return (
    // <PageBackground noBg>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {renderCards}
        <Col span={24} style={{ marginTop: 16, minHeight: '200px' }}>
          <Card>
            <Card.Meta title="Daftar Transaksi Terbaru" description="10 Transaksi Terakhir" />
            <Table 
              dataSource={dataSource} 
              columns={columns} 
              rowKey="id" 
              pagination={false} 
              style={{ marginTop: 16 }} />
          </Card>
        </Col>
      </Row>
    // </PageBackground>
  );
}

export default Dashboard;
