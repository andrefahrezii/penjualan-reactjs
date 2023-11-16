import React from 'react';
import { Table, Typography } from 'antd';
const { Title } = Typography;

const SalesTable = ({ data }) => {
    const namaBarangMap = {
        1: 'Kopi',
        2: 'Teh',
        3: 'Pasta Gigi',
        4: 'Sabun Mandi',
        5: 'Sampo',
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Quantity', dataIndex: 'jumlah', key: 'jumlah' },
        { title: 'Amount', dataIndex: 'totalHarga', key: 'totalHarga' },
        {
            title: 'Barang',
            dataIndex: 'barangId',
            key: 'barangId',
            render: (barangId) => namaBarangMap[barangId] || `Barang ${barangId}`,
        },
        { title: 'Tanggal Penjualan', dataIndex: 'tanggalPenjualan', key: 'tanggalPenjualan' },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (text, record) => (
        //         <Space size="middle">
        //             <Button type="primary" key={`edit-${record.id}`} onClick={() => handleEdit(record)}>Edit</Button>
        //             <Button type="danger" key={`delete-${record.id}`} onClick={() => handleDelete(record.id)}>Delete</Button>
        //         </Space>
        //     ),
        // },
    ];

    // const handleEdit = (record) => {
    //     console.log('Edit:', record);
    // };

    // const handleDelete = (id) => {
    //     console.log('Delete:', id);
    // };

    return (
        <div>
            <Title level={2}>Sales Table</Title>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default SalesTable;
