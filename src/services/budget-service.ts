import { submitFormData, api } from '../utils/api';

const createBudget = async (formData:any) => {
    const response = await submitFormData(formData, '/budgets')
    return response.data;
    }

const createBudgetExpense = async (data:any) => {
  const response = await api.post('/budgets/budget_expenses', data)
  return response.data;
}

//http://localhost:3001/api/v1/budgets/1/upcoming_budget_expense

const upcomingBudgets = async (id:number) => {
    const response = await api.get(`/budgets/${id}/upcoming_budget_expense`)
    return response.data;
    }

const BudgetService = {
    createBudget,
    createBudgetExpense,
    upcomingBudgets
}

export default BudgetService;