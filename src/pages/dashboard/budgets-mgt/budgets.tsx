import { useState, useEffect } from 'react'
import BudgetForm from '../../form-modals/budget-form'
import BudgetExpenseForm from '../../item-forms/budget-expense-form'
import BudgetService from '../../../services/budget-service';
import { useSelector } from 'react-redux';
import { formatAsCurrency, formatDateTime } from '../../../constants';
import Loader from '../../../constants/Loader';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import DebtMgtActions from '../debt-mgt/debt-mgt-actions';
import BudgetMgtActions from './budget-mgt-actions';
import './budget-mgt.css';
import Pagination from '../../../components/pagination';

const Budgets = () => {
  const [budgets, setBudgets] = useState<any>([])
  const user_id = useSelector((state: any) => state?.reducer?.auth?.user?.id);
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getUpcomingBudgets = async () => {
    const response = await BudgetService.upcomingBudgets(1)
    setBudgets(response.data)
  }

  console.log({selectedBudget})

  const getUserBudgets = async () => {
    setLoading(true)
    try {
      const response = await BudgetService.getUserBudgets(user_id, currentPage)
      console.log(response)
      setBudgets(response)
    } catch (error: any) {
      // Handle error
      console.error('Error fetching debts:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectBudget = (budget: any) => {
    setIsOpen(true);
    setSelectedBudget(budget);
  };

  const tableHeader = ['Avatar', 'Name', 'Target Amount', 'Contribution Type', 'Contribution Amount', 'Completion Date', 'Completed', 'Action']

  useEffect(() => {
    getUserBudgets()
  }, [])

   // Function to handle page change
   const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // You can fetch data for the new page from the backend here
  };

  const totalData = budgets?.total || 0;
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalData / itemsPerPage);

  return (
    <div>
      <h1 className="text-center font-bold text-3xl text-gray-900 mt-3">Budgets</h1>
      <h5 className="text-center font-bold text-1xl text-gray-900 mt-3">Record your planned budgets</h5>
      <BudgetForm getBudgets={getUserBudgets}/>
      <br />
      <div className='table-wrapper'>
        <table className="table-auto w-full text-center debt-table">
          <thead>
            <tr>
              {/* <th className="px-4 py-2">ID</th> */}
              {tableHeader.map((header, index) => (
                <th key={index} className="border-b-2 border-sky-500 px-4 py-2">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? <tr>
              <td colSpan={8} className="text-center">
                <div className="mx-auto"><Loader /></div>
              </td>
            </tr> : budgets?.budgets?.length > 0 ? budgets?.budgets.map((budget: any) => (
              <tr key={budget?.id}>
                {/* <td className="border px-4 py-2">{budget.id}</td> */}
                <td className="border-b-2 border-sky-500 px-4 py-2">
                  <img src={budget?.avatar?.url} alt="Avatar" className="h-12 w-12 object-cover rounded-full" />
                </td>
                <td className="border-b-2 border-sky-500 px-4 py-2">{budget?.name}</td>
                {/* <td className="border-b-2 border-sky-500 px-4 py-2">{budget?.purpose}</td> */}
                <td className="border-b-2 border-sky-500 px-4 py-2">{formatAsCurrency(budget?.target_amount)}</td>
                <td className="border-b-2 border-sky-500 px-4 py-2">{budget?.contribution_type}</td>
                <td className="border-b-2 border-sky-500 px-4 py-2">{formatAsCurrency(budget?.contribution_amount)}</td>
                <td className="border-b-2 border-sky-500 px-4 py-2">{formatDateTime(budget?.target_date)}</td>
                <td className="border-b-2 border-sky-500 px-4 py-2">{budget?.completed ? 'Yes' : 'No'}</td>

                <td
                  style={{ position: 'relative' }}
                  onClick={() => selectBudget(budget)}
                  className="border-b-1 px-4 py-2 cursor-pointer border-b-2 border-sky-500 px-4 py-2"
                >
                  <PiDotsThreeVerticalBold />
                  {isOpen && selectedBudget?.id === budget?.id ? (
                    <div><BudgetMgtActions getUserBudgets={getUserBudgets} isOpen={isOpen} selectedBudget={selectedBudget} setIsOpen={setIsOpen} budgets={budgets} /></div>
                  ) : null}
                </td>

              </tr>
            )) : <tr>
              <td colSpan={8} className="text-center font-bold text-2xl">
                No data available. Fill the form above to record a debt.
              </td>
            </tr>}
          </tbody>
        </table>
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />

    </div>
  )
}

export default Budgets