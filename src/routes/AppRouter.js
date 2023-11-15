import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';
import Dashboard from '../views/Dashboard';
import SalesPage from '../views/SalesPage';
import Barang from '../views/BarangPage';
import Penjualan from '../views/PenjualanPage';
const { Content } = Layout;

const AppRouter = () => {
    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout className="site-layout">
                    <Content style={{ margin: '16px' }}>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/sales" element={<SalesPage />} />
                            <Route path="/barang" element={<Barang />} />
                            <Route path="/penjualan" element={<Penjualan />} />
                            {/* Tambahkan rute lainnya sesuai kebutuhan */}
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
};

export default AppRouter;
