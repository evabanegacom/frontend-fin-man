import React, { useState } from 'react';
import DebtMgtsService from '../../services/debt-mgt-service';
import { FaTimes } from 'react-icons/fa';

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen:boolean) => void;
    selectedDebt: any;
}

const DebtPaymentForm = ({ isOpen, setIsOpen, selectedDebt}: Props) => {
    const [debtPayment, setDebtPayment] = useState({
        name: '',
        amount: 0,
        debt_mgt_id: selectedDebt?.id
    })

    console.log({selectedDebt})

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        console.log(debtPayment)
        const response = await DebtMgtsService.createDebtPayment(debtPayment?.debt_mgt_id, debtPayment)
        console.log(response)
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setDebtPayment({ ...debtPayment, [name]: value })
    }

    if (!isOpen) {
        return null
    }

  return (
    <div className='modal-overlay'>
      <div className='modal-content-body'>
      <button onClick={() => setIsOpen(false)} className='close-modal'><FaTimes className='float-right border mb-4'/></button>
        <h5 className='font-bold mb-4'>Record debt payment</h5>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
  <input 
    type="text" 
    name="name" 
    value={debtPayment.name} 
    placeholder="Name" 
    onChange={handleChange} 
    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
  />
  <input 
    type="number" 
    name="amount" 
    value={debtPayment.amount} 
    placeholder="Amount" 
    onChange={handleChange} 
    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
  />
  <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Add Debt Payment</button>
</form>

    </div>
    </div>
  )
}

export default DebtPaymentForm