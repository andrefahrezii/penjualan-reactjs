import React, { useState } from 'react';
import { Table, Space, Button, Typography, Modal, Form, Input } from 'antd';
const { Title } = Typography;

const BarangTable = ({ data, onEdit, onDelete, onAdd }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editedRecord, setEditedRecord] = useState(null);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [form] = Form.useForm();
    const showModal = (record) => {
        form.resetFields();
        // setEditedRecord(null);
        setEditedRecord(record);

        if (record) {
            form.setFieldsValue({
                nama: record.nama,
                stok: record.stok,
                jumlahTerjual: record.jumlahTerjual,
            });
        } else {
            form.resetFields();
        }

        setIsModalVisible(true);
    };

    const showAddModal = () => {
        form.resetFields();
        setEditedRecord(null);
        setIsAddModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsAddModalVisible(false);
        setEditedRecord(null);
    };
    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            if (editedRecord) {
                // If editing, update editedRecord with the latest form values
                const updatedRecord = { ...editedRecord, ...values };
                onEdit(updatedRecord);
            } else {
                // If adding, pass the form values to onAdd
                onAdd(values);
            }

            // Reset the form fields and close the modal
            form.resetFields();
            setIsModalVisible(false);
            setIsAddModalVisible(false);
        } catch (errorInfo) {
            console.log('Validation Failed:', errorInfo);
        }
    };



    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Nama', dataIndex: 'nama', key: 'nama' },
        { title: 'stok', dataIndex: 'stok', key: 'stok' },
        { title: 'jumlahTerjual', dataIndex: 'jumlahTerjual', key: 'jumlahTerjual' },
        { title: 'tanggalTransaksi', dataIndex: 'tanggalTransaksi', key: 'tanggalTransaksi' },
        { title: 'createdAt', dataIndex: 'createdAt', key: 'createdAt' },
        { title: 'updatedAt', dataIndex: 'updatedAt', key: 'updatedAt' },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" key={`edit-${record.id}`} onClick={() => showModal(record)}>Edit</Button>
                    <Button type="danger" key={`delete-${record.id}`} onClick={() => onDelete(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Title level={2}>Barang Table</Title>
            <Space>
                <Button type="primary" onClick={showAddModal}>Add</Button>
            </Space>
            <Table columns={columns} dataSource={data} />

            <Modal
                title={editedRecord ? 'Edit Barang' : 'Add Barang'}
                visible={isModalVisible || isAddModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    onFinish={handleOk}
                >
                    <Form.Item
                        label="Nama"
                        name="nama"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Stok"
                        name="stok"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item
                        label="Tanggal Transaksi"
                        name="tanggalTransaksi"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                    >
                        <Input />
                    </Form.Item> */}
                    <Form.Item
                        label="Jumlah Terjual"
                        name="jumlahTerjual"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editedRecord ? 'Simpan Perubahan' : 'Tambah Barang'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BarangTable;
