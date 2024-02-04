import React, { useState } from 'react';
import DebtMgtsService from '../../services/debt-mgt-service';

const DebtPaymentForm = () => {
    const [debtPayment, setDebtPayment] = useState({
        name: '',
        amount: 0,
        debt_mgt_id: 1
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(debtPayment)
        const response = DebtMgtsService.createDebtPayment(debtPayment?.debt_mgt_id, debtPayment)
        console.log(response)
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setDebtPayment({ ...debtPayment, [name]: value })
    }

  return (
    <div>
     <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            name="name" 
            value={debtPayment.name} 
            placeholder="Name" 
            onChange={handleChange} 
            />
            <input 
            type="number" 
            name="amount" 
            value={debtPayment.amount} 
            placeholder="Amount" 
            onChange={handleChange} 
            />
            <button type="submit">Add Payment</button>
     </form>
    </div>
  )
}

export default DebtPaymentForm