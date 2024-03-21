import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import BudgetService from '../../services/budget-service';
import { useSelector } from 'react-redux';

const Overview = () => {
  const user_id = useSelector((state: any) => state?.reducer?.auth?.user?.id);
  const [aggregateData, setAggregateData] = useState<any>({})
  const [toggleTime, setToggleTime] = useState('monthly');

  const chartData = [
    { name: 'January', value: 10 },
    { name: 'February', value: 15 },
    { name: 'March', value: 20 },
    { name: 'April', value: 25 },
    { name: 'May', value: 30 },
  ];

  const getAggregates = async () => {
    const response = await BudgetService.getAggregates(user_id)
    console.log(response)
    setAggregateData(response)
  }

  useEffect(() => {
    getAggregates()
  }, [])

  return (
    <div>
      <div className="bg-gray-900 flex flex-wrap justify-around items-center mb-4">

        <div className="p-4 rounded-md shadow-md mb-4 md:mb-0 md:w-auto md:flex md:flex-col md:items-center">
          <div className="text-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block mb-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5zm-1 4a2 2 0 1 1 4 0v6a2 2 0 1 1-4 0V9zM5 9a4 4 0 0 1 8 0v6a4 4 0 0 1-8 0V9z" clipRule="evenodd" />
            </svg>
            <div className="font-bold text-sm text-blue-500">Number of Savings</div>
            <div className="text-base text-white">{toggleTime === 'monthly' ? aggregateData?.monthly_savings : aggregateData?.yearly_savings || 0}</div>
          </div>
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block mb-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a8 8 0 0 1 5.657 13.657l-5.657-5.657-5.657 5.657A8 8 0 0 1 10 2zM4 10a6 6 0 0 1 6-6v12a6 6 0 0 1-6-6z" clipRule="evenodd" />
            </svg>
            <div className="font-bold text-sm text-green-500">Amount saved</div>
            <div className="text-base text-white">{aggregateData?.monthly_saving_budget}</div>
          </div>
        </div>

        <div className="p-4 rounded-md shadow-md mb-4 md:mb-0 md:w-auto md:flex md:flex-col md:items-center">
          <div className="text-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block mb-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5zm-1 4a2 2 0 1 1 4 0v6a2 2 0 1 1-4 0V9zM5 9a4 4 0 0 1 8 0v6a4 4 0 0 1-8 0V9z" clipRule="evenodd" />
            </svg>
            <div className="font-bold text-sm text-blue-500">Number of Debts</div>
            <div className="text-base text-white">{aggregateData?.monthly_savings || 0}</div>
          </div>
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block mb-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a8 8 0 0 1 5.657 13.657l-5.657-5.657-5.657 5.657A8 8 0 0 1 10 2zM4 10a6 6 0 0 1 6-6v12a6 6 0 0 1-6-6z" clipRule="evenodd" />
            </svg>
            <div className="font-bold text-sm text-green-500">Amount paid</div>
            <div className="text-base text-white">{aggregateData?.monthly_saving_budget}</div>
          </div>
        </div>

        <div className="p-4 rounded-md shadow-md mb-4 md:mb-0 md:w-auto md:flex md:flex-col md:items-center">
          <div className="text-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block mb-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5zm-1 4a2 2 0 1 1 4 0v6a2 2 0 1 1-4 0V9zM5 9a4 4 0 0 1 8 0v6a4 4 0 0 1-8 0V9z" clipRule="evenodd" />
            </svg>
            <div className="font-bold text-sm text-blue-500">Number of Budgets</div>
            <div className="text-base text-white">{Number(aggregateData?.monthly_savings) || 0}</div>
          </div>
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block mb-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a8 8 0 0 1 5.657 13.657l-5.657-5.657-5.657 5.657A8 8 0 0 1 10 2zM4 10a6 6 0 0 1 6-6v12a6 6 0 0 1-6-6z" clipRule="evenodd" />
            </svg>
            <div className="font-bold text-sm text-green-500">Amount used</div>
            <div className="text-base text-white">{aggregateData?.monthly_saving_budget}</div>
          </div>
        </div>

        <div className="p-4 rounded-md shadow-md mb-4 md:mb-0 md:w-auto md:flex md:flex-col md:items-center">
          <div className="text-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block mb-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5zm-1 4a2 2 0 1 1 4 0v6a2 2 0 1 1-4 0V9zM5 9a4 4 0 0 1 8 0v6a4 4 0 0 1-8 0V9z" clipRule="evenodd" />
            </svg>
            <div className="font-bold text-sm text-blue-500">Number of Expenses</div>
            <div className="text-base text-white">{Number(aggregateData?.monthly_savings) || 0}</div>
          </div>
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block mb-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a8 8 0 0 1 5.657 13.657l-5.657-5.657-5.657 5.657A8 8 0 0 1 10 2zM4 10a6 6 0 0 1 6-6v12a6 6 0 0 1-6-6z" clipRule="evenodd" />
            </svg>
            <div className="font-bold text-sm text-green-500">Amount spent</div>
            <div className="text-base text-white">{aggregateData?.monthly_saving_budget}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="text-lg font-semibold text-gray-800 mr-4 sm:text-base text-sm">This is {toggleTime} click to see {toggleTime==='monthly'? 'Yearly' : 'monthly'} data</div>
        <div className="flex items-center">
          <button onClick={() => setToggleTime('monthly')} className={`bg-${toggleTime === 'monthly' ? 'blue-500 text-white' : 'gray-200 text-gray-500'} font-semibold py-2 px-4 rounded-l-md hover:bg-blue-600 transition duration-300`}
          >Monthly</button>
          <button onClick={() => setToggleTime('yearly')} className={`bg-${toggleTime === 'yearly' ? 'blue-500 text-white' : 'gray-200 text-gray-500'} font-semibold py-2 px-4 rounded-l-md hover:bg-blue-600 transition duration-300`}
          >Yearly</button>
        </div>
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

    </div>
  );
};

export default Overview;
