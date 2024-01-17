import { submitFormData } from '../utils/api';
// params.permit(:name, :purpose, :target_amount, :category, :target_date, :contribution_type, :contribution_amount, :user_id, :avatar)

const createBudget = async (formData:any) => {
    const response = await submitFormData(formData, '/budgets')
    return response.data;
    }

const BudgetService = {
    createBudget,
}

export default BudgetService;