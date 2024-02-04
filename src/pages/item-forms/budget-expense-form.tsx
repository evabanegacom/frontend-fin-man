import React, {useState} from 'react'
import BudgetService from '../../services/budget-service'

const BudgetExpenseForm = () => {
    const [expense, setExpense] = useState({
        name: '',
        amount: 0,
        purpose: '',
        budget_id: 1
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(expense)
        const response = BudgetService.createBudgetExpense(expense)
        console.log(response)
    }

  return (
    <div>
        <h1>Expense Form</h1>
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            name="name" 
            value={expense.name} 
            placeholder="Name" 
            onChange={(e) => setExpense({...expense, name: e.target.value})} 
            />
            <input 
            type="number" 
            name="amount" 
            value={expense.amount} 
            placeholder="Amount" 
            onChange={(e) => setExpense({...expense, amount: parseInt(e.target.value)})} 
            />
            <input 
            type="text" 
            name="purpose" 
            value={expense.purpose} 
            placeholder="Purpose" 
            onChange={(e) => setExpense({...expense, purpose: e.target.value})} 
            />
            <button type="submit">Add Expense</button>
        </form>
    </div>
  )
}

export default BudgetExpenseForm