import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import BudgetForm from '../form-modals/budget-form';

const Overview = () => {
  // Dummy data for example
  const aggregatedStats = [
    { label: 'Number of debts', value: 2,   title: 'Amount paid', total: 1000},
    { label: 'Number of savings', value: 3,  title: 'Amount saved', total: 2000},
    { label: 'Number of budgets', value: 1,   title: 'Amount used', total: 4000},
    { label: 'Number of expenses', value: 5,   title: 'Amount spent', total: 8000},
  ];

  const chartData = [
    { name: 'January', value: 10 },
    { name: 'February', value: 15 },
    { name: 'March', value: 20 },
    { name: 'April', value: 25 },
    { name: 'May', value: 30 },
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

<div className="bg-gray-900 flex flex-wrap justify-around items-center mb-4">
  {aggregatedStats.map((stat, index) => (
    <div key={index} className="p-4 rounded-md shadow-md mb-4 md:mb-0 md:w-auto md:flex md:flex-col md:items-center">
      <div className="text-center mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block mb-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5zm-1 4a2 2 0 1 1 4 0v6a2 2 0 1 1-4 0V9zM5 9a4 4 0 0 1 8 0v6a4 4 0 0 1-8 0V9z" clipRule="evenodd" />
        </svg>
        <div className="font-bold text-sm text-blue-500">{stat.label}</div>
        <div className="text-base text-white">{stat.value}</div>
      </div>
      <div className="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block mb-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a8 8 0 0 1 5.657 13.657l-5.657-5.657-5.657 5.657A8 8 0 0 1 10 2zM4 10a6 6 0 0 1 6-6v12a6 6 0 0 1-6-6z" clipRule="evenodd" />
        </svg>
        <div className="font-bold text-sm text-green-500">{stat.title}</div>
        <div className="text-base text-white">{stat.total}</div>
      </div>
    </div>
  ))}
</div>



  <div className="w-full flex justify-center mt-5 mb-5">
  <div className="w-full lg:w-3/4 xl:w-2/3">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
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
