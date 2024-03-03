import React, { useState, useEffect } from 'react';
import DebtMgtForm from '../../form-modals/debt-mgt-form';
import DebtPaymentForm from '../../item-forms/debt-payment-form';
import DebtMgtsService from '../../../services/debt-mgt-service';
import { useSelector } from 'react-redux';
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import DebtMgtActions from './debt-mgt-actions';
import './debt-mgt.css';

const DebtMgts = () => {
  const [debtMgts, setDebtMgts] = useState([])
  const [ userDebts, setUserDebts ] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const user_id = useSelector((state: any) => state?.reducer?.auth?.user?.id);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState<any>({});

  const getUserDebts = async () => {
    const response = await DebtMgtsService.getDebtByUser(user_id, pageNumber)
    setUserDebts(response)
  }

  const getUpcomingDebtMgts = async () => {
    const response = await DebtMgtsService.upcomingDebts(1)
    setDebtMgts(response.data)
  }

  const selectRider = (debt: any) => {
    setIsOpen(true);
    setSelectedDebt(debt);
  };

  useEffect(() => {
    getUpcomingDebtMgts()
    getUserDebts()
  }, [])

  return (
    <div>
      <h1>DebtMgts</h1>
      <DebtMgtForm />
      <br />
      <table className="table-auto w-full text-center debt-table">
        <thead>
          <tr>
            {/* <th className="px-4 py-2">ID</th> */}
            <th className="px-4 py-2">Avatar</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Purpose</th>
            <th className="px-4 py-2">Target Amount</th>
            <th className="px-4 py-2">Contribution Type</th>
            <th className="px-4 py-2">Contribution Amount</th>
            <th className="px-4 py-2">Target Date</th>
            <th className="px-4 py-2">Completed</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {userDebts.map((debt:any) => (
            <tr key={debt?.id}>
              {/* <td className="border px-4 py-2">{debt.id}</td> */}
              <td className="border-b-2 border-sky-500 px-4 py-2">
                <img src={debt?.avatar?.url} alt="Avatar" className="h-12 w-12 object-cover" />
              </td>
              <td className="border-b-2 border-sky-500 px-4 py-2">{debt?.name}</td>
              <td className="border-b-2 border-sky-500 px-4 py-2">{debt?.purpose}</td>
              <td className="border-b-2 border-sky-500 px-4 py-2">{debt?.target_amount}</td>
              <td className="border-b-2 border-sky-500 px-4 py-2">{debt?.contribution_type}</td>
              <td className="border-b-2 border-sky-500 px-4 py-2">{debt?.contribution_amount}</td>
              <td className="border-b-2 border-sky-500 px-4 py-2">{debt?.target_date}</td>
              <td className="border-b-2 border-sky-500 px-4 py-2">{debt.completed ? 'Yes' : 'No'}</td>
              <td
                style={{ position: 'relative' }}
                onClick={() => selectRider(debt)}
                className="border-b-1 px-4 py-2 cursor-pointer border-b-2 border-sky-500 px-4 py-2"
              >
                <PiDotsThreeVerticalBold />
                {isOpen && selectedDebt?.id === debt?.id ? (
                  <div><DebtMgtActions isOpen={true} selectedDebt={selectedDebt} setIsOpen={setIsOpen} /></div>
                ) : null}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  )
}

export default DebtMgts