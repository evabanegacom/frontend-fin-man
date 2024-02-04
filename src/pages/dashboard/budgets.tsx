import React, { useState, useEffect} from 'react'
import BudgetForm from '../form-modals/budget-form'
import BudgetExpenseForm from '../item-forms/budget-expense-form'
import BudgetService from '../../services/budget-service';

const Budgets = () => {
  const [budgets, setBudgets] = useState([])
  const getUpcomingBudgets = async () => {
    const response = await BudgetService.upcomingBudgets(1)
    setBudgets(response.data)
  }

  useEffect(() => {
    getUpcomingBudgets()
  }, [])
  return (
    <div>Budgets
            <BudgetForm />
            <br />
            <BudgetExpenseForm />

    </div>
  )
}

export default Budgets