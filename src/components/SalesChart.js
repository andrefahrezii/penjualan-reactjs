import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const SalesChart = ({ data }) => {
    const canvasRef = useRef();
    const [chartInstance, setChartInstance] = useState(null);

    const namaBarangMap = {
        1: 'Kopi',
        2: 'Teh',
        3: 'Pasta Gigi',
        4: 'Sabun Mandi',
        5: 'Sampo',
    };

    useEffect(() => {
        if (!canvasRef.current || !data || data.length === 0) {
            return;
        }

        if (chartInstance && chartInstance.destroy) {
            chartInstance.destroy();
        }

        const groupedData = data.reduce((acc, entry) => {
            const barangId = entry.barangId;
            if (!acc[barangId]) {
                acc[barangId] = {
                    totalHarga: 0,
                    namaBarang: namaBarangMap[barangId] || `Barang ${barangId}`,
                };
            }
            acc[barangId].totalHarga += entry.totalHarga;
            return acc;
        }, {});

        const sortedData = Object.values(groupedData)
            .sort((a, b) => b.totalHarga - a.totalHarga)
            .slice(0, 5);

        const labels = sortedData.map(entry => entry.namaBarang);
        const dataValues = sortedData.map(entry => entry.totalHarga);
        const backgroundColors = Array.from({ length: sortedData.length }, (_, i) =>
            `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.4)`
        );

        const ctx = canvasRef.current.getContext('2d');
        const newChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Jumlah Penjualan',
                        data: dataValues,
                        backgroundColor: backgroundColors,
                        borderColor: 'rgba(75,192,192,1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const index = context.dataIndex;
                                const barangId = sortedData[index].namaBarang;
                                const transactions = data
                                    .filter(entry => entry.barangId === parseInt(barangId.replace('Barang ', '')))
                                    .map(entry => `Tanggal: ${entry.tanggalPenjualan}, Total Harga: ${entry.totalHarga}`)
                                    .join('\n');
                                return `${transactions}`;
                            },
                        },
                    },
                },
            },
        });

        setChartInstance(newChartInstance);
    }, [data]);

    useEffect(() => {
        return () => {
            if (chartInstance && chartInstance.destroy) {
                chartInstance.destroy();
            }
        };
    }, [chartInstance]);

    return (
        <div>
            <h3>Grafik Penjualan</h3>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default SalesChart;
