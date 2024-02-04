import { api, submitFormData } from '../utils/api';

const createDebtMgt = async (formData:any) => {
    const response = await submitFormData(formData, 'debt_mgts')
    return response.data;
    }

const getUserDebts = async () => {
    const response = await api.get('/debt_mgts')
    return response.data;
    }

const createDebtPayment = async (id: number, data:any) => {
    const response = await api.post(`/debt_mgts/${id}/create_debt_payment`, data)
    return response.data;
}

const upcomingDebts = async (id:number) => {
    const response = await api.get(`/debt_mgts/${id}/upcoming_debt_payment`)
    return response.data;
    }

const DebtMgtsService = {
    createDebtMgt,
    getUserDebts,
    createDebtPayment,
    upcomingDebts
}

export default DebtMgtsService;