import React, { useRef, useState, useEffect } from 'react'
import { HiOutlineEye } from 'react-icons/hi';
import { IoIosAddCircle } from 'react-icons/io';
import { TbTrash } from 'react-icons/tb';
import Loader from '../../../constants/Loader';
import BudgetExpenseForm from './budget-expense-form';
import BudgetOverview from './budget-overview';

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen:boolean) => void;
    selectedBudget: any;
    budgets: any;
    getUserBudgets: () => void;
  }
const BudgetMgtActions = ({isOpen, selectedBudget, setIsOpen, budgets, getUserBudgets}: Props) => {
    const ref:any = useRef(null);
    const [openbudgetExpense, setOpenBudgetExpense] = useState(false);
    const [ openBudgetOverview, setBudgetOverview ] = useState(false);

    const debtActions = [
        {
          id: 1,
          name: 'Budget overview',
          color: '#7975B6',
          icon: <HiOutlineEye color='#7975B6' />,
          onClick: () => {
            setBudgetOverview(true)
          }
        },
        {
          id: 3,
          name: 'Record budget expense',
          icon: <IoIosAddCircle color='#C8CC66' />,
          color: '#C8CC66',
          onClick: () => {
            console.log('Record budget expense')
            setOpenBudgetExpense(true)
          }
        },
        // {
        //   id: 4,
        //   name: deleting ? <Loader /> : 'Delete debt',
        //   icon: <TbTrash color='#F00' />,
        //   color: '#F00',
        //   onClick: deleteDebt
        // }
      ]

      useEffect(() => {
        function handleClickOutside(event:any) {
          // Check if the click is outside of FleetActions container
          if (
            ref.current &&
            !ref.current.contains(event.target) &&
            !event.target.closest('.modal-container') // Check if click is inside any modal
          ) {
            // Check if any modal is open, if yes, prevent closing
            // if (!openDebtPayment && !openDebtOverview && !openEditAccountNumber) {
            //   setIsOpen(false);
            // }
            if (!openbudgetExpense && !openBudgetOverview) {
              setIsOpen(false);
            }
          }
        }
      
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref, setIsOpen, openbudgetExpense]);  

      if (!isOpen) return null

  return (
    <>
    <div  className='debt-content-body'>
      <div className='debt-actions-container' ref={ref}>
        <div className='debt-action-div'>
          {debtActions.map((action) => (
            <button key={action.id} onClick={action?.onClick}>
              {action.icon}
              <span style={{ color: action?.color }}>{action.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
    <BudgetExpenseForm isOpen={openbudgetExpense} setIsOpen={setOpenBudgetExpense} selectedBudget={selectedBudget} />
    <BudgetOverview budgets={budgets} isOpen={openBudgetOverview} setIsOpen={setBudgetOverview} selectedBudget={selectedBudget} />
</>
  )
}

export default BudgetMgtActions