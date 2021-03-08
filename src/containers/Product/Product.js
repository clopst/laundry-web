import React, { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce/useDebounce';
import { Button, Form, Input, message, Modal, Popover, Space, Table } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, FormOutlined } from '@ant-design/icons';
import PageHeader from '../../components/PageHeader/PageHeader';
import ProductForm from '../../components/Form/ProductForm/ProductForm';
import { currencyFormatter } from '../../helpers/currency';
import PageBackground from '../../components/PageBackground/PageBackground';
import { destroyProduct, getDropdownsProduct, indexProduct, showProduct, storeProduct, updateProduct } from '../../services/products';
import handleError from '../../helpers/handleError';

const Product = (props) => {
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
  const [selectedId, setSelectedId] = useState(null);

  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();

  // const dataSource = [
  //   {
  //       id: 1,
  //       name: 'Paket Kiloan',
  //       unit: 'kg',
  //       price: 7000,
  //       outlet_id: null
  //   },
  //   {
  //       id: 2,
  //       name: 'Bed Cover',
  //       unit: 'pcs',
  //       price: 35000,
  //       outlet_id: null
  //   },
  // ];

  // const outlets = [
  //   {
  //       value: 1,
  //       label: 'Product Bandung'
  //   },
  //   {
  //       value: 2,
  //       label: 'Product Jakarta'
  //   }
  // ];

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const getData = () => {
    setLoading(true);
    indexProduct(query)
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
    getDropdownsProduct()
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
    storeProduct(values)
      .then(res => {
        setVisibleCreate(false);
        createForm.resetFields();
        message.success('Berhasil membuat produk');
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

    Promise.all([showProduct(id), getDropdownsProduct({ id })])
      .then(res => {
        editForm.setFieldsValue(res[0].data);
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
    updateProduct(selectedId, values)
      .then(res => {
        setVisibleEdit(false);
        setSelectedId(null);
        message.success('Berhasil edit produk');
        getData();
      })
      .catch(err => handleError(err))
      .finally(() => setConfirmLoading(false));
  }
  
  const handleClickDelete = (id) => () => {
    const data = dataSource.find(data => data.id === id);

    Modal.confirm({
      title: 'Hapus produk "' + data.name + '"?',
      icon: <ExclamationCircleOutlined />,
      content: 'Data produk ini akan dihapus secara permanen',
      onOk: () => (
        destroyProduct(id)
          .then(() => {
            message.success('Berhasil menghapus produk');
            getData();
          })
          .catch(err => handleError(err))
      )
    });
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
        title: 'Nama Produk',
        key: 'name',
        dataIndex: 'name',
        sorter: true
    },
    {
        title: 'Unit Produk',
        key: 'unit',
        dataIndex: 'unit',
        sorter: true
    },
    {
        title: 'Harga',
        key: 'price',
        render: (text, record) => currencyFormatter(record.price),
        sorter: true
    },
    {
        title: 'Outlet',
        key: 'outlet.name',
        render: (text, record) => (
          record.outlet_id ? record.outlet?.name : 'Semua Outlet'
        ),
        sorter: true
    },
    {
        title: 'Deskripsi',
        key: 'description',
        dataIndex: 'description'
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
          <Space size="middle">
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
          </Space>
        )
    }
  ];

  return (
    <PageBackground>
      <PageHeader title="Products">
        <Input placeholder="Search ..." onChange={handleSearch} />
        <Button type="primary" onClick={handleClickCreate}>Create</Button>
      </PageHeader>

      <Table 
        dataSource={dataSource} 
        columns={columns} 
        rowKey="id" 
        pagination={pagination}
        onChange={handleChangeTable}
        loading={loading} />
      
      <ProductForm
        form={createForm}
        formName="product-create-form"
        visible={visibleCreate}
        title="Create Product"
        onCreate={handleCreate}
        onCancel={() => setVisibleCreate(false)}
        confirmLoading={confirmLoading}
        formLoading={formLoading}
        outlets={dropdowns.outlets ?? []} />
      
      <ProductForm
        form={editForm}
        formName="product-edit-form"
        visible={visibleEdit}
        title="Edit Product"
        onCreate={handleEdit}
        onCancel={() => setVisibleEdit(false)}
        confirmLoading={confirmLoading}
        formLoading={formLoading}
        outlets={dropdowns.outlets ?? []} />
    </PageBackground>
  );
}

export default Product;
