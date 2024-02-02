import { api, submitFormData } from '../utils/api';

const createSaving = async (formData:any) => {
    const response = await submitFormData(formData, '/savings')
    return response.data;
    }

const getUserSavings = async () => {
    const response = await api.get('/savings')
    return response.data;
    }

const SavingsService = {
    createSaving,
    getUserSavings
}

export default SavingsService;