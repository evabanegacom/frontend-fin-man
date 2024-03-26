import React from 'react'

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    selectedBudget: any;
    budgets: any;
  }

const BudgetOverview:React.FC<Props> = ({ isOpen, setIsOpen, selectedBudget, budgets}) => {
    if (!isOpen) {
        return null
    }
  return (
    <div className='modal-overlay'>
      <div className='modal-content-body'>
       <div>Budget overview</div>
      </div>
    </div>
  )
}

export default BudgetOverview