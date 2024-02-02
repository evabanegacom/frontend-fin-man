import { api, submitFormData } from '../utils/api';

const createDebtMgt = async (formData:any) => {
    const response = await submitFormData(formData, 'debt_mgts')
    return response.data;
    }

const getUserDebts = async () => {
    const response = await api.get('debt_mgts')
    return response.data;
    }

const DebtMgtsService = {
    createDebtMgt,
    getUserDebts
}

export default DebtMgtsService;