import { submitFormData } from '../utils/api';

const createIncome = async (formData:any) => {
    const response = await submitFormData(formData, '/incomes')
    return response.data;
    }

const IncomeService = {
    createIncome,
}

export default IncomeService;