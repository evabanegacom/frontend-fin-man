import React, { useState, useEffect } from 'react';
import DebtMgtForm from '../../form-modals/debt-mgt-form';
import DebtPaymentForm from '../../item-forms/debt-payment-form';
import DebtMgtsService from '../../../services/debt-mgt-service';
import { useSelector } from 'react-redux';
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import DebtMgtActions from './debt-mgt-actions';
import './debt-mgt.css';
import { formatAsCurrency, formatDateTime } from '../../../constants';
import Loader from '../../../constants/Loader';

const DebtMgts = () => {
  const [debtMgts, setDebtMgts] = useState([])
  const [userDebts, setUserDebts] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const user_id = useSelector((state: any) => state?.reducer?.auth?.user?.id);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState<any>({});
  const [loading, setLoading] = useState(false)

  const getUserDebts = async () => {
    setLoading(true)
    try {
      const response = await DebtMgtsService.getDebtByUser(user_id, pageNumber)
      setUserDebts(response)
    } catch (error: any) {
      // Handle error
      console.error('Error fetching debts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUpcomingDebtMgts = async () => {
    const response = await DebtMgtsService.upcomingDebts(selectedDebt?.id)
    setDebtMgts(response)
  }

  const selectRider = (debt: any) => {
    setIsOpen(true);
    setSelectedDebt(debt);
  };

  useEffect(() => {
    getUpcomingDebtMgts()
    getUserDebts()
  }, [selectedDebt?.id])

  const tableHeader = ['Avatar', 'Name', 'Target Amount', 'Contribution Type', 'Contribution Amount', 'Completion Date', 'Completed', 'Action']
  return (
    <div className=''>
      <h1 className="text-center font-bold text-3xl text-gray-900 mt-3">DebtMgts</h1>
      <h5 className="text-center font-bold text-1xl text-gray-900 mt-3">Record the debt(s) you're owing and intend to pay here</h5>

      <DebtMgtForm userDebt={getUserDebts} />
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
            </tr> : userDebts.length > 0 ? userDebts.map((debt: any) => (
              <tr key={debt?.id}>
                {/* <td className="border px-4 py-2">{debt.id}</td> */}
                <td className="border-b-2 border-sky-500 px-4 py-2">
                  <img src={debt?.avatar?.url} alt="Avatar" className="h-12 w-12 object-cover rounded-full" />
                </td>
                <td className="border-b-2 border-sky-500 px-4 py-2">{debt?.name}</td>
                {/* <td className="border-b-2 border-sky-500 px-4 py-2">{debt?.purpose}</td> */}
                <td className="border-b-2 border-sky-500 px-4 py-2">{formatAsCurrency(debt?.target_amount)}</td>
                <td className="border-b-2 border-sky-500 px-4 py-2">{debt?.contribution_type}</td>
                <td className="border-b-2 border-sky-500 px-4 py-2">{formatAsCurrency(debt?.contribution_amount)}</td>
                <td className="border-b-2 border-sky-500 px-4 py-2">{formatDateTime(debt?.target_date)}</td>
                <td className="border-b-2 border-sky-500 px-4 py-2">{debt.completed ? 'Yes' : 'No'}</td>
                <td
                  style={{ position: 'relative' }}
                  onClick={() => selectRider(debt)}
                  className="border-b-1 px-4 py-2 cursor-pointer border-b-2 border-sky-500 px-4 py-2"
                >
                  <PiDotsThreeVerticalBold />
                  {isOpen && selectedDebt?.id === debt?.id ? (
                    <div><DebtMgtActions isOpen={true} selectedDebt={selectedDebt} setIsOpen={setIsOpen} debtMgts={debtMgts} /></div>
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
    </div>
  )
}

export default DebtMgts