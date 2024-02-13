import React, { useEffect, useState } from 'react';
import IncomeService from '../../services/income-service';

const AddIncome = () => {
  const [ incomeValue, setIncomeValue ] = useState({
    name: '',
    amount: 0,
    income_id: 1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncomeValue({
      ...incomeValue,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(incomeValue)
    // const response = await IncomeService.addIncome(incomeValue)
    try {
      const response = await IncomeService.addIncome(incomeValue)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Add Income</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input type="number" name="amount" id="amount" onChange={handleChange} />
        </div>
        <button type="submit">Add Income</button>
      </form>
    </div>
  )
}

export default AddIncome