import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BudgetService from '../../../services/budget-service';
import Loader from '../../../constants/Loader';
import { FaTimes } from 'react-icons/fa';

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    selectedBudget: any;
}

const BudgetExpenseForm: React.FC<Props> = ({ isOpen, setIsOpen, selectedBudget }) => {
    const [loading, setLoading] = useState(false)
    const [budgetExpense, setBudgetExpense] = useState({
        name: '',
        amount: 0,
        budget_id: selectedBudget?.id
    })
    console.log({ selectedBudget })
    const handleSubmit = async (e: any) => {
        setLoading(true)
        e.preventDefault()
        try {
            const response = await BudgetService.createBudgetExpense(budgetExpense)
            console.log(response)
            toast.success('Successfully added expense')
        } catch (error) {
            console.error('Error creating budget expense:', error);
            toast.error('Error creating budget expense')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setBudgetExpense({ ...budgetExpense, [name]: value })
    }

    const isValid = budgetExpense?.name === '' || budgetExpense?.amount === 0 || budgetExpense?.budget_id === ''


    if (!isOpen) {
        return null
    }
    return (
        <div className='modal-overlay'>
            <div className='modal-content-body'>
            <button onClick={() => setIsOpen(false)} className='close-modal'><FaTimes className='float-right border mb-4' /></button>

                <h5 className='font-bold mb-4'>Record budget expense</h5>
                <form onSubmit={handleSubmit} className="flex flex-col items-center w-full sm:w-90">
                    <input
                        type="text"
                        name="name"
                        value={budgetExpense.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="input-field"
                    />
                    <input
                        type="number"
                        name="amount"
                        value={budgetExpense.amount}
                        onChange={handleChange}
                        placeholder="Amount"
                        className="input-field"
                    />
                    <button type="submit" className="btn-primary" disabled={isValid}>
                        {loading ? <Loader /> : 'Submit'}
                    </button>
                </form>

            </div>
        </div>
    )
}

export default BudgetExpenseForm