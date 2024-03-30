import { useEffect, useState } from 'react'
import { formatAsCurrency, formatDateTime } from '../../../constants';
import BudgetService from '../../../services/budget-service';

interface Props {
    selectedBudget: any;
    }
const BudgetExpenses:React.FC<Props> = ({ selectedBudget }) => {
  const [ budgetExpenses, setBudgetExpenses ] = useState<any>([])
  const budgetUsage = async() => {
    const response = await BudgetService.budget_expenses(selectedBudget?.id)
    setBudgetExpenses(response)
  }

  useEffect(() =>  {
    budgetUsage()
  }, [])

  const tableHeader = [ 'Name', 'Amount', 'Date']
  return (
    <div>
      <h5 className="text-center font-bold text-1xl text-gray-900 mt-3">Usage History</h5>
      <div className='table-wrapper'>
      <table className="table-auto w-full text-center debt-table">
        <thead>
          <tr>
            {/* <th className="px-4 py-2">ID</th> */}
            {tableHeader.map((header, index) => (
              <th style={{textAlign: 'center'}} key={index} className="border-b-2 border-sky-500 px-4 py-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {budgetExpenses.map((debt:any) => (
            <tr key={debt?.id}>
              {/* <td className="border-b-2 border-sky-500 px-4 py-2">{debt?.id}</td> */}
              
              <td className="border-b-2 border-sky-500 px-4 py-2">{debt?.name}</td>
              <td className="border-b-2 border-sky-500 px-4 py-2">{formatAsCurrency(debt?.amount)}</td>
              <td className="border-b-2 border-sky-500 px-4 py-2">{formatDateTime(debt?.created_at)}</td>
              {/* <td
                style={{ position: 'relative' }}
                onClick={() => selectRider(debt)}
                className="border-b-1 px-4 py-2 cursor-pointer border-b-2 border-sky-500 px-4 py-2"
              >
                <PiDotsThreeVerticalBold />
                {isOpen && selectedBudget?.id === debt?.id ? (
                  <div><DebtMgtActions isOpen={true} selectedBudget={selectedBudget} setIsOpen={setIsOpen} /></div>
                ) : null}
              </td> */}

            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default BudgetExpenses