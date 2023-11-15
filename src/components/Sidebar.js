import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';
import {
    DesktopOutlined,
    PieChartOutlined,
    // FileOutlined,
    // TeamOutlined,
    // UserOutlined,
} from '@ant-design/icons';
const { Title } = Typography;
const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
    const menuItems = [
        { key: '1', icon: <PieChartOutlined />, text: 'Dashboard', link: '/' },
        { key: '2', icon: <DesktopOutlined />, text: 'Sales', link: '/sales' },
        { key: '3', icon: <DesktopOutlined />, text: 'Barang', link: '/barang' },
        { key: '4', icon: <DesktopOutlined />, text: 'Penjualan', link: '/penjualan' },
        // Tambahkan menu dan submenu lainnya sesuai kebutuhan
    ];

    return (
        <Sider
            collapsible
            theme="dark"
            style={{
                minHeight: '100vh',
                background: '#001529',
                color: 'white',
                paddingTop: '1%',
            }}
        >
            <Title
                style={{ color: "white" }}
                level={2}>
                Admin
            </Title>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                {menuItems.map(item => (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.link}>{item.text}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
    );
};

export default Sidebar;
