const TRANSACTION_STATUS = [
  {
    value: 'process',
    label: 'Sedang Proses'
  },
  {
    value: 'pickup',
    label: 'Menunggu Diambil'
  },
  {
    value: 'done',
    label: 'Selesai'
  },
];

const PAYMENT_STATUS = [
  {
    value: 'pending',
    label: 'Belum Dibayar'
  },
  {
    value: 'done',
    label: 'Sudah Dibayar'
  },
];

export {
  TRANSACTION_STATUS,
  PAYMENT_STATUS
};
