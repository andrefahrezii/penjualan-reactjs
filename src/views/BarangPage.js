// salespage.js
import React, { useEffect, useState } from 'react';
import SalesTable from '../components/SalesTable';
import BarangTable from '../components/BarangTable';
import { message } from 'antd';

const BarangPage = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTerm, setFilterTerm] = useState('');
    const [limit, setLimit] = useState(10);
    const [order, setOrder] = useState('ASC');
    const [barangId, setBarangId] = useState(null);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        // Fetch data from the endpoint
        const fetchData = async () => {
            try {
                let url = 'http://localhost:3000/barang';
                // ... (build URL based on other parameters)

                const response = await fetch(url);
                if (response.ok) {
                    const newData = await response.json();
                    setData(newData);
                } else {
                    const errorData = await response.json();
                    console.error('Error fetching data:', errorData.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [searchTerm, filterTerm, barangId, limit, order, refreshData]);

    const onAdd = async (formData) => {
        try {
            const response = await fetch('http://localhost:3000/barang', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                message.success(`Data Berhasil Ditambahkan`);
                setRefreshData((prev) => !prev);
            } else {
                const errorData = await response.json();
                message.error(`Gagal Menambahkan Data: ${errorData.message}`);
            }
        } catch (error) {
            message.error(`Error Menambahkan Data: ${error.message}`);
        }
    };


    const onEdit = async (editedRecord) => {
        try {
            const response = await fetch(`http://localhost:3000/barang/${editedRecord.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedRecord),
            });

            if (response.ok) {
                const data = await response.json();
                message.success(`berhasil Edit Data: ${data.message}`);
                setRefreshData((prev) => !prev);
            } else {
                const errorData = await response.json();
                message.error(`Gagal Edit Data: ${errorData.message}`);
            }
        } catch (error) {
            message.error(`Error Edit Data`);
        }
    };



    const onDelete = async (recordId) => {
        try {
            const response = await fetch(`http://localhost:3000/barang/${recordId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                message.success(`berhasil Delete Data: ${data.message}`);
                setRefreshData((prev) => !prev);
            } else {
                const errorData = await response.json();
                message.error('Gagal Delete Data:', errorData.message);
            }
        } catch (error) {
            message.error(`Error Delete Data`);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Search Term"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="text"
                    placeholder="Filter Term"
                    value={filterTerm}
                    onChange={(e) => setFilterTerm(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="number"
                    placeholder="Barang ID"
                    value={barangId}
                    onChange={(e) => setBarangId(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="number"
                    placeholder="Limit"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <select
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                >
                    <option value="ASC">Terbanyak</option>
                    <option value="DESC">Terdikit</option>
                </select>
            </div>

            <BarangTable
                data={data}
                onAdd={onAdd}
                onEdit={onEdit}
                onDelete={onDelete} />
        </div>
    );
};

export default BarangPage;
