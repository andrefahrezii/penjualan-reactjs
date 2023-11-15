// salespage.js
import React, { useEffect, useState } from 'react';
import SalesTable from '../components/SalesTable';

const SalesPage = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTerm, setFilterTerm] = useState('');
    const [limit, setLimit] = useState(10);
    const [order, setOrder] = useState('ASC');
    const [barangId, setBarangId] = useState(null);

    useEffect(() => {
        // Buat URL berdasarkan parameter pencarian, filter, barangId, limit, dan order
        let url = 'http://localhost:3000/penjualan';

        // Tambahkan parameter pencarian ke URL jika ada
        if (searchTerm) {
            url += `?search=${searchTerm}`;
        }

        // Tambahkan parameter filter ke URL jika ada
        if (filterTerm) {
            url += `${searchTerm ? '&' : '?'}filter=${filterTerm}`;
        }

        // Tambahkan parameter barangId ke URL jika ada
        if (barangId) {
            url += `${searchTerm || filterTerm ? '&' : '?'}barangId=${barangId}`;
        }

        // Tambahkan parameter limit dan order ke URL jika ada
        url += `${searchTerm || filterTerm || barangId ? '&' : '?'}limit=${limit}&order=${order}`;

        // Fetch data from the endpoint
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [searchTerm, filterTerm, barangId, limit, order]);

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

            <SalesTable data={data} />
        </div>
    );
};

export default SalesPage;
