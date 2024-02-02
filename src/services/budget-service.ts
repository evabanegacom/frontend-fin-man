import { submitFormData } from '../utils/api';

const createBudget = async (formData:any) => {
    const response = await submitFormData(formData, '/budgets')
    return response.data;
    }

const BudgetService = {
    createBudget,
}

export default BudgetService;