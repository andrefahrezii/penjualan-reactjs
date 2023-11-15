// salestable.js
import React from 'react';
import { Table, Space, Button, Typography } from 'antd';
const { Title } = Typography;

const SalesTable = ({ data }) => {
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Quantity', dataIndex: 'jumlah', key: 'jumlah' },
        { title: 'Amount', dataIndex: 'totalHarga', key: 'totalHarga' },
        { title: 'barangId', dataIndex: 'barangId', key: 'barangId' },
        { title: 'tanggalPenjualan', dataIndex: 'tanggalPenjualan', key: 'tanggalPenjualan' },
        // Add other columns as needed
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

    const handleEdit = (record) => {
        // Add edit logic here
        console.log('Edit:', record);
    };

    const handleDelete = (id) => {
        // Add delete logic here
        console.log('Delete:', id);
    };

    return <div>
        <Title level={2}>Sales Table</Title>
        <Table columns={columns} dataSource={data} />
    </div>;
};

export default SalesTable;
