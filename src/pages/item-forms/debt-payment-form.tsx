import React, { useState } from 'react';
import DebtMgtsService from '../../services/debt-mgt-service';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../constants/Loader';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedDebt: any;
}

const DebtPaymentForm = ({ isOpen, setIsOpen, selectedDebt }: Props) => {
  const [loading, setLoading] = useState(false)

  const [debtPayment, setDebtPayment] = useState({
    name: '',
    amount: 0,
    debt_mgt_id: selectedDebt?.id
  })

  console.log({ selectedDebt })

  const handleSubmit = async (e: any) => {
    setLoading(true)
    e.preventDefault()
    try {
      const response = await DebtMgtsService.createDebtPayment(debtPayment?.debt_mgt_id, debtPayment)
      console.log(response)
      toast.success('Successfully added payment')
    } catch (error) {
      console.error('Error creating debt payment:', error);
      toast.error('Error creating debt payment')
    } finally {
      // setIsOpen(false)
      setLoading(false)
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setDebtPayment({ ...debtPayment, [name]: value })
  }

  const isValid = debtPayment?.name === '' || debtPayment?.amount === 0 || debtPayment?.debt_mgt_id === ''

  if (!isOpen) {
    return null
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-content-body'>
        <button onClick={() => setIsOpen(false)} className='close-modal'><FaTimes className='float-right border mb-4' /></button>
        <h5 className='font-bold mb-4'>Record debt payment</h5>

        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full sm:w-auto">
          <input
            type="text"
            name="name"
            value={debtPayment.name}
            placeholder="Payment name"
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="amount"
            value={debtPayment.amount}
            placeholder="Amount to pay"
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
          />
          <button disabled={loading || isValid} type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">{loading ? <Loader /> : 'Add Debt Payment'}</button>
        </form>

      </div>
    </div>
  )
}

export default DebtPaymentForm