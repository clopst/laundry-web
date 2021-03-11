import React, { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce/useDebounce';
import { Button, Form, Input, message, Modal, Popover, Space, Table } from 'antd';
import { DeleteOutlined, EyeOutlined, ExclamationCircleOutlined, FormOutlined, HighlightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import fileDownload from 'js-file-download';
import PageHeader from '../../components/PageHeader/PageHeader';
import TransactionForm from '../../components/Form/TransactionForm/TransactionForm';
import { currencyFormatter } from '../../helpers/currency';
import PageBackground from '../../components/PageBackground/PageBackground';
import { 
  changeStatusTransaction, 
  destroyTransaction,
  exportTransaction,
  getDropdownsTransaction, 
  indexTransaction, 
  showTransaction, 
  storeTransaction, 
  updateTransaction 
} from '../../services/transactions'
import handleError from '../../helpers/handleError';
import { TRANSACTION_STATUS, PAYMENT_STATUS } from '../../helpers/const';
import ChangeStatusTransactionForm from '../../components/Form/TransactionForm/ChangeStatusTransactionForm/ChangeStatusTransactionForm';
import { useAuthContext } from '../../context/AuthContext';
import ExportTransactionForm from '../../components/Form/TransactionForm/ExportTransactionForm/ExportTransactionForm';
import TransactionDetail from '../../components/Descriptions/TransactionDetail/TransactionDetail';

const Transaction = (props) => {
  const { user } = useAuthContext();

  const [dataSource, setDataSource] = useState([]);
  const [dropdowns, setDropdowns] = useState({});
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    // page: 1,
    perPage: 10,
    sortKey: 'id',
    sortOrder: 'asc',
    paginate: true,
    search: ''
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 800);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleChangeStatus, setVisibleChangeStatus] = useState(false);
  const [visibleExport, setVisibleExport] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState(null);
  const [payment, setPayment] = useState(null);
  const [transaction, setTransaction] = useState(null);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [disabledEditForm, setDisabledEditForm] = useState(false);

  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [changeStatusForm] = Form.useForm();
  const [exportForm] = Form.useForm();

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

  // const outlets = [
  //   {
  //       value: 1,
  //       label: 'Outlet Bandung'
  //   },
  //   {
  //       value: 2,
  //       label: 'Outlet Jakarta'
  //   }
  // ];
  
  // const customers = [
  //   {
  //       value: 1,
  //       label: 'John Doe'
  //   },
  //   {
  //       value: 2,
  //       label: 'Jane Doe'
  //   }
  // ];

  // const cashiers = [
  //   {
  //       value: 3,
  //       label: 'Bobby Doe'
  //   },
  //   {
  //       value: 4,
  //       label: 'Albert Doe'
  //   }
  // ];

  // const products = [
  //   {
  //       value: 1,
  //       label: 'Paket Kiloan',
  //       unit: 'kg',
  //       price: 7000
  //   },
  //   {
  //       value: 2,
  //       label: 'Bed Cover',
  //       unit: 'pcs',
  //       price: 35000
  //   }
  // ]

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const getData = () => {
    setLoading(true);
    indexTransaction(query)
      .then(res => {
        setDataSource(res.data.results);
        setPagination({
          current: res.data.pagination.page,
          pageSize: res.data.pagination.pageSize,
          total: res.data.pagination.total
        });
      })
      .catch(err => handleError(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setQuery({
      ...query,
      search: debouncedSearchTerm
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleClickCreate = () => {
    setVisibleCreate(true);
    setFormLoading(true);
    getDropdownsTransaction()
      .then(res => {
        setDropdowns(res.data);
      })
      .catch(err => {
        handleError(err);
        setVisibleCreate(false);
      })
      .finally(() => setFormLoading(false));
  }

  const handleCreate = (values) => {
    setConfirmLoading(true);
    storeTransaction(values)
      .then(res => {
        setVisibleCreate(false);
        createForm.resetFields();
        message.success('Berhasil membuat transaksi');
        getData();
      })
      .catch(err => handleError(err))
      .finally(() => setConfirmLoading(false));
  }

  const handleClickEdit = (id) => () => {
    setSelectedId(id);
    editForm.resetFields();
    setVisibleEdit(true);
    setFormLoading(true);

    Promise.all([showTransaction(id), getDropdownsTransaction({ id })])
      .then(res => {
        editForm.setFieldsValue(res[0].data);
        setSelectedProduct(res[0].data.product_id);
        setDisabledEditForm(res[0].data.status === 'done');
        setDropdowns(res[1].data);
      })
      .catch(err => {
        handleError(err);
        setVisibleEdit(false);
      })
      .finally(() => setFormLoading(false));
  }
  
  const handleEdit = (values) => {
    setConfirmLoading(true);
    updateTransaction(selectedId, values)
      .then(res => {
        setVisibleEdit(false);
        setSelectedId(null);
        message.success('Berhasil edit transaksi');
        getData();
      })
      .catch(err => handleError(err))
      .finally(() => setConfirmLoading(false));
  }
  
  const handleClickDelete = (id) => () => {
    const data = dataSource.find(data => data.id === id);

    Modal.confirm({
      title: 'Hapus transaksi "' + data.invoice + '"?',
      icon: <ExclamationCircleOutlined />,
      content: 'Data transaksi ini akan dihapus secara permanen',
      onOk: () => (
        destroyTransaction(id)
          .then(() => {
            message.success('Berhasil menghapus transaksi');
            getData();
          })
          .catch(err => handleError(err))
      )
    });
  }

  const handleClickChangeStatus = (id) => () => {
    setSelectedId(id);
    setVisibleChangeStatus(true);
    setFormLoading(true);
    showTransaction(id)
      .then(res => {
        changeStatusForm.setFieldsValue({
          status: res.data.status,
          payment: res.data.payment
        });
        setStatus(res.data.status);
        setPayment(res.data.payment);
      })
      .catch(err => {
        handleError(err);
        setVisibleChangeStatus(false);
      })
      .finally(() => setFormLoading(false));
  }

  const handleChangeStatus = (values) => {
    setConfirmLoading(true);
    changeStatusTransaction(selectedId, values)
      .then(res => {
        setVisibleChangeStatus(false);
        setSelectedId(null);
        message.success('Berhasil ubah status transaksi');
        getData();
      })
      .catch(err => handleError(err))
      .finally(() => setConfirmLoading(false));
  }

  const handleClickExport = () => {
    setVisibleExport(true);
    setFormLoading(true);
    getDropdownsTransaction()
      .then(res => {
        setDropdowns(res.data);
        if (res.data.outlets && user.role === 'cashier') {
          exportForm.setFieldsValue({ outletIds: [res.data.outlets[0].value] });
        }
      })
      .catch(err => {
        handleError(err);
        setVisibleExport(false);
      })
      .finally(() => setFormLoading(false));
  }

  const handleExport = (values) => {
    const date = values.date ? [values.date[0].format('YYYY-MM-DD'), values.date[1].format('YYYY-MM-DD')] : [];
    const params = {
      ...values,
      date
    };

    setConfirmLoading(true);
    exportTransaction(params)
      .then(res => {
        fileDownload(res.data, 'transactions_report_' + dayjs().unix() + '.xlsx');
        setConfirmLoading(false);
        setVisibleExport(false);
      })
      .catch(err => handleError(err))
      .finally(() => setConfirmLoading(false));
  }

  const handleClickDetail = (id) => () => {
    setVisibleDetail(true);
    setFormLoading(true);
    showTransaction(id)
      .then(res => setTransaction(res.data))
      .catch(err => {
        handleError(err);
        setVisibleDetail(false);
      })
      .finally(() => setFormLoading(false));
  }

  const handleChangeTable = (pagination, filters, sorter, extra) => {
    const sort = {
      sortKey: sorter.order ? sorter.columnKey : 'id',
      sortOrder: sorter.order === 'descend' ? 'desc' : 'asc'
    };

    setQuery({
      ...query,
      ...sort,
      page: pagination.current
    });
  }

  const columns = [
    {
        title: 'Tanggal Transaksi',
        key: 'date',
        render: (text, record) => dayjs(record.date).locale('id').format('DD MMMM YYYY'),
        sorter: true
    },
    {
        title: 'Kode Invoice',
        key: 'invoice',
        dataIndex: 'invoice',
        sorter: true
    },
    {
        title: 'Customer',
        key: 'customer',
        render: (text, record) => record.customer.name,
        sorter: true
    },
    {
        title: 'Outlet',
        key: 'outlet',
        render: (text, record) => record.outlet.name,
        sorter: true
    },
    {
        title: 'Produk',
        key: 'product',
        render: (text, record) => `${record.product?.name} (${record.qty} ${record.product?.unit})`,
        sorter: true
    },
    {
        title: 'Harga',
        key: 'total_price',
        render: (text, record) => currencyFormatter(record.total_price),
        sorter: true
    },
    {
        title: 'Kasir',
        key: 'cashier',
        render: (text, record) => record.cashier.name,
        sorter: true
    },
    {
        title: 'Status',
        key: 'status',
        render: (text, record) => TRANSACTION_STATUS.find(status => status.value === record.status)?.label,
        sorter: true
    },
    {
        title: 'Pembayaran',
        key: 'payment',
        render: (text, record) => PAYMENT_STATUS.find(status => status.value === record.payment)?.label,
        sorter: true
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
          <Space size="middle">
            <Popover content="Lihat Detail">
              <Button 
                type="default" 
                icon={<EyeOutlined />} 
                onClick={handleClickDetail(record.id)} />
            </Popover>
            {user?.role !== 'owner' &&
              <React.Fragment>
                <Popover content="Ubah Status Transaksi">
                  <Button 
                    type="default" 
                    icon={<HighlightOutlined />} 
                    onClick={handleClickChangeStatus(record.id)} />
                </Popover>
                <Popover content="Edit">
                  <Button 
                    type="default" 
                    icon={<FormOutlined />} 
                    onClick={handleClickEdit(record.id)} />
                </Popover>
                <Popover content="Delete">
                  <Button 
                    type="default" 
                    danger
                    icon={<DeleteOutlined />}
                    onClick={handleClickDelete(record.id)} />
                </Popover>
              </React.Fragment>
            }
          </Space>
        )
    }
  ];

  // const [columns, setColumns] = useState(columnList);

  // useEffect(() => {
  //   if (user?.role === 'owner') {
  //     setColumns(columnList.filter(col => col.key !== 'actions'));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user])

  return (
    <PageBackground>
      <PageHeader title="Transactions">
        <Input placeholder="Search ..." onChange={handleSearch} />
        { user?.role !== 'owner' && 
          <Button type="primary" onClick={handleClickCreate}>Create</Button>
        }
        <Button type="primary" onClick={handleClickExport}>Generate Laporan</Button>
      </PageHeader>

      <Table 
        dataSource={dataSource} 
        columns={columns} 
        rowKey="id" 
        pagination={pagination}
        onChange={handleChangeTable}
        loading={loading} />
      
      <TransactionForm
        form={createForm}
        formName="transaction-create-form"
        visible={visibleCreate}
        title="Create Transaksi"
        onCreate={handleCreate}
        onCancel={() => setVisibleCreate(false)}
        confirmLoading={confirmLoading}
        formLoading={formLoading}
        outlets={dropdowns.outlets ?? []}
        customers={dropdowns.customers ?? []}
        cashiers={dropdowns.cashiers ?? []}
        products={dropdowns.products ?? []}
        selectedProduct={selectedProduct} />
      
      <TransactionForm
        form={editForm}
        formName="transaction-edit-form"
        visible={visibleEdit}
        title="Edit Transaksi"
        onCreate={handleEdit}
        onCancel={() => setVisibleEdit(false)}
        confirmLoading={confirmLoading}
        formLoading={formLoading}
        outlets={dropdowns.outlets ?? []}
        customers={dropdowns.customers ?? []}
        cashiers={dropdowns.cashiers ?? []}
        products={dropdowns.products ?? []}
        selectedProduct={selectedProduct}
        disabled={disabledEditForm} />

      <ChangeStatusTransactionForm 
        form={changeStatusForm}
        formName="transaction-change-status-form"
        visible={visibleChangeStatus}
        title="Ubah Status Transaksi"
        onCreate={handleChangeStatus}
        onCancel={() => setVisibleChangeStatus(false)}
        confirmLoading={confirmLoading}
        formLoading={formLoading}
        status={status}
        payment={payment} />

      <ExportTransactionForm
        form={exportForm}
        formName="transaction-export-form"
        visible={visibleExport}
        onCreate={handleExport}
        onCancel={() => setVisibleExport(false)}
        confirmLoading={confirmLoading}
        formLoading={formLoading}
        outlets={dropdowns.outlets ?? []} />

      <TransactionDetail 
        visible={visibleDetail}
        data={transaction}
        loading={formLoading}
        onOk={() => {
          setVisibleDetail(false);
          setTransaction(null);
        }}
        onCancel={() => {
          setVisibleDetail(false);
          setTransaction(null);
        }} />
    </PageBackground>
  );
}

export default Transaction;
