import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import Penjualan from '../components/Penjualan';

const PenjualanPage = () => {
    const [data, setData] = useState([]);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        fetchData();
    }, [refreshData]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/penjualan');
            if (response.ok) {
                const data = await response.json();
                setData(data);
            } else {
                message.error('Failed to fetch data');
            }
        } catch (error) {
            message.error(`Error fetching data: ${error.message}`);
        }
    };

    const onAdd = async (formData) => {
        console.log(formData)
        try {
            const response = await fetch('http://localhost:3000/penjualan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                message.success('Data berhasil dikirim');
                setRefreshData((prev) => !prev);
            } else {
                const errorData = await response.json();
                message.error(`Gagal Mengirim Data: ${errorData.message}`);
            }
        } catch (error) {
            message.error(`Error Menambahkan Data: ${error.message}`);
        }
    };

    const onEdit = (editedRecord) => {
    };

    const onDelete = async (recordId) => {
    };

    return (


        < Penjualan
            data={data}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
        />


    );
};

export default PenjualanPage;
