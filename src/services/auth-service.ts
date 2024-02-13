import { submitFormData, api } from '../utils/api';

const createAccount = async (formData:any) => {
    const response = await submitFormData(formData, 'users')
    return response?.data;
    }

const login = async (data:any) => {
    const response = await api.post('/sign_in', data)
    return response?.data;
    }

const AuthService = {
    createAccount,
    login,
}

export default AuthService;