import React, { useState } from 'react'
import SavingsService from '../../services/saving-services'

const SavingsFinanceForm = () => {
  const [savingsFinance, setSavingsFinance] = useState({
    name: '',
    amount: 0,
    saving_id: 1
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setSavingsFinance({ ...savingsFinance, [name]: value })
  }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        console.log(savingsFinance)
        const response = await SavingsService.createFinancialSaving(savingsFinance?.saving_id, savingsFinance)
        console.log(response)
    }

  return (
    <div>
      <form>
        <input 
        type="text" 
        name="name" 
        value={savingsFinance.name} 
        placeholder="Name" 
        onChange={handleChange} 
        />
        <input 
        type="number" 
        name="amount" 
        value={savingsFinance.amount} 
        placeholder="Amount" 
        onChange={handleChange} 
        />
        <button type="submit" onClick={handleSubmit}>Add Finance</button>
      </form>
    </div>
  )
}

export default SavingsFinanceForm