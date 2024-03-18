import React from 'react';
import Plot from 'react-plotly.js';
import BudgetForm from '../form-modals/budget-form';

const Overview = () => {
  // Dummy data for example
  const aggregatedStats = [
    { label: 'Total Users', value: 1000 },
    { label: 'Active Users', value: 800 },
    { label: 'Revenue', value: '$50,000' },
    { label: 'New Orders', value: 50 },
  ];

  const chartData = [
    {
      x: [1, 2, 3, 4, 5],
      y: [10, 11, 12, 13, 14],
      type: 'scatter',
      mode: 'lines+markers',
    },
  ];

  const layout: any = {
    xaxis: {
      title: "Months",
      tickangle: 90,
      fixedrange: true,
      ticklen: 10,
    },
    yaxis: {
      title: "Responses",
      tickvals: [0, 25, 50, 75, 100],
      range: [0, 100],
      fixedrange: true,
    },
    showlegend: false,
    autosize: true,
    responsive: true,
    useResizeHandler: true,

    margin: {
      l: 50,
      r: 10,
      t: 10
    },

    staticPlot: true,

    annotations: [
      {
        xref: "paper",
        yref: "paper",
        x: 0.5,
        y: 0.5,
        // text: projects?.length === 0 ? 'No Data' : '',
        // text: loadingSurveyStats ? "Loading" : dashboardInfo?.graphData?.length === 0 ? "No Data" : "",
        showarrow: false,
        font: {
          size: 16,
          // color: 'red',
          // color: loading ? "black" : "red",
        },
      },
    ],

  };

  const tableData = [
    { id: 1, name: 'John Doe', orders: 20, revenue: '$200' },
    { id: 2, name: 'Jane Smith', orders: 15, revenue: '$150' },
    // Add more data as needed
  ];

  return (
    <div>
      {/* Aggregated Stats Boxes */}
      <div className="flex justify-around mb-4">
        {aggregatedStats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow-md">
            <div className="font-bold text-lg">{stat.label}</div>
            <div className="text-xl">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Plotly Chart */}
      <div className="w-full flex justify-center mt-5 mb-5">
  <div className="w-full flex justify-center lg:w-3/4 xl:w-2/3">
    <Plot data={chartData} layout={layout} style={{ minWidth: '100%'}} />
  </div>
</div>


      {/* Table */}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Orders</th>
            <th className="border border-gray-300 px-4 py-2">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td className="border border-gray-300 px-4 py-2">{row.id}</td>
              <td className="border border-gray-300 px-4 py-2">{row.name}</td>
              <td className="border border-gray-300 px-4 py-2">{row.orders}</td>
              <td className="border border-gray-300 px-4 py-2">{row.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Overview;
