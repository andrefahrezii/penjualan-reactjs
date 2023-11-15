// import React, { useState, useEffect, useRef } from 'react';
// import { Bar } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';

// const SalesChart = () => {
//     const canvasRef = useRef();
//     const [salesData, setSalesData] = useState([]);
//     const [chartInstance, setChartInstance] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://localhost:3000/penjualan');
//                 const data = await response.json();
//                 setSalesData(data);
//                 console.log('Data penjualan:', data);
//             } catch (error) {
//                 console.error('Error mengambil data penjualan:', error);
//             }
//         };

//         fetchData();

//         // Membersihkan instance chart
//         if (chartInstance) {
//             if (chartInstance.destroy) {
//                 chartInstance.destroy();
//             } else {
//                 const canvas = canvasRef.current;
//                 const ctx = canvas.getContext('2d');
//                 ctx.clearRect(0, 0, canvas.width, canvas.height);
//             }
//         }

//         // Membuat chart baru
//         const ctx = canvasRef.current.getContext('2d');
//         const newChartInstance = new Chart(ctx, {
//             type: 'bar',
//             data: {
//                 labels: salesData.map(entry => entry.tanggalPenjualan),
//                 datasets: [
//                     {
//                         label: 'Jumlah Penjualan',
//                         backgroundColor: 'rgba(75,192,192,0.4)',
//                         borderColor: 'rgba(75,192,192,1)',
//                         borderWidth: 1,
//                         hoverBackgroundColor: 'rgba(75,192,192,0.8)',
//                         hoverBorderColor: 'rgba(75,192,192,1)',
//                         data: salesData.map(entry => entry.totalHarga),
//                     },
//                 ],
//             },
//         });

//         // Menyimpan instance chart ke state
//         setChartInstance(newChartInstance);

//         // Membersihkan chart sebelum komponen di-unmount
//         return () => {
//             if (newChartInstance && newChartInstance.destroy) {
//                 newChartInstance.destroy();
//             }
//         };

//     }, [salesData]);

//     return (
//         <div>
//             <h3>Grafik Penjualan</h3>
//             {salesData.length > 0 && <Bar data={{}} options={{}} ref={canvasRef} />}
//         </div>
//     );
// };

// export default SalesChart;
