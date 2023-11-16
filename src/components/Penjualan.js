import React, { useState } from 'react';
import { Table, Space, Button, Typography, Modal, Form, Input, Select } from 'antd';
const { Title } = Typography;

const Penjualan = ({ data, onEdit, onDelete, onAdd }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editedRecord, setEditedRecord] = useState(null);
    const [form] = Form.useForm();
    const [tempData, setTempData] = useState([]);

    const namaBarangMap = {
        1: 'Kopi',
        2: 'Teh',
        3: 'Pasta Gigi',
        4: 'Sabun Mandi',
        5: 'Sampo',
    };

    const showModal = (record) => {
        form.resetFields();
        setEditedRecord(record);
        setIsModalVisible(true);
    };

    const showAddModal = () => {
        form.resetFields();
        setEditedRecord(null);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditedRecord(null);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            if (editedRecord) {
                const updatedRecord = { ...editedRecord, ...values };
                onEdit(updatedRecord);
            } else {
                setTempData([...tempData, { id: Date.now(), ...values }]);
            }

            form.resetFields();
            setIsModalVisible(false);
            setEditedRecord(null);
        } catch (errorInfo) {
            console.log('Validation Failed:', errorInfo);
        }
    };

    const handleSend = async () => {
        try {
            if (typeof onAdd === 'function') {
                await onAdd(tempData);
                setTempData([]);
                setIsModalVisible(false);
            } else {
                console.error('Error sending data: onAdd is not a function');
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const columns = [
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        key={`edit-${record.id}`}
                        onClick={() => showModal(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="danger"
                        key={`delete-${record.id}`}
                        onClick={() => onDelete(record.id)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    columns.unshift(
        {
            title: 'Temporary Barang ID',
            dataIndex: 'barangId',
            key: 'barangId',
            render: (barangId) => namaBarangMap[barangId] || `Barang ${barangId}`,
        },
        {
            title: 'Temporary Jumlah',
            dataIndex: 'jumlah',
            key: 'jumlah',
        },
        {
            title: 'Temporary Total Harga',
            dataIndex: 'totalHarga',
            key: 'totalHarga',
        },
        {
            title: 'Temporary Tanggal Penjualan',
            dataIndex: 'tanggalPenjualan',
            key: 'tanggalPenjualan',
        }
    );

    return (
        <div>
            <Title level={2}>Penjualan</Title>
            <Space>
                <Button type="primary" onClick={showAddModal}>
                    Add
                </Button>
                {tempData.length > 0 && (
                    <Button type="primary" onClick={handleSend}>
                        Send
                    </Button>
                )}
            </Space>
            <Table
                dataSource={tempData}
                columns={columns}
            />

            <Modal
                title={editedRecord ? 'Edit Penjualan' : 'Add Penjualan'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => {
                    handleCancel();
                    form.resetFields();
                }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Nama Barang"
                        name="barangId"
                        rules={[{ required: true, message: 'Please select a product!' }]}
                    >
                        <Select>
                            <Select.Option value="1">Kopi</Select.Option>
                            <Select.Option value="2">Teh</Select.Option>
                            <Select.Option value="3">Pasta Gigi</Select.Option>
                            <Select.Option value="4">Sabun Mandi</Select.Option>
                            <Select.Option value="5">Sampo</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Jumlah"
                        name="jumlah"
                        rules={[{ required: true, message: 'Please input the quantity!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Total Harga"
                        name="totalHarga"
                        rules={[{ required: true, message: 'Please input the total price!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Tanggal Penjualan"
                        name="tanggalPenjualan"
                        rules={[{ required: true, message: 'Please input the sale date!' }]}
                    >
                        <Input type="date" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Penjualan;
