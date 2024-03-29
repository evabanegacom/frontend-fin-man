import React from 'react';
import { formatAsCurrency, formatDateTime } from '../../../constants';

interface Props {
    selectedBudget: any;
    budgets: any;
    }

const GeneralOverview:React.FC<Props> = ({ selectedBudget, budgets}) => {
  return (
    <div className='rider-information-container'>

    <div className='rider-information-details'>
      <div className='information-heading'><b className='ml-1'>Budget Information</b></div>
      <div className='flex flex-col gap-3'>
        <div>Amount owed: <b className='text-rose-500'> {formatAsCurrency(selectedBudget?.target_amount)}</b></div>
        <div>Proposed date of completion: <strong>{formatDateTime(selectedBudget?.target_date)}</strong></div>
        <div>Interest rate: <strong className='text-amber-500'>{selectedBudget?.interest_rate}%</strong></div>
      <div>Last payment date: <b>{budgets?.last_contribution_date ? formatDateTime(budgets?.last_contribution_date) : 'No payments made'}</b></div>
      </div>
    </div>

    <div>
      <div className='information-heading'><b className='ml-1'>Next Payment Schedule</b></div>
      <div className='mt-3 text-center'><b>{budgets?.next_contribution_date ? formatDateTime(budgets?.next_contribution_date) : 'No payments made'}</b></div>
    </div>

    <div>
      <div className='information-heading'><b className='ml-1'>Debt description</b></div>
      <div className='mt-3 text-violet-500'><strong>{selectedBudget?.purpose}</strong></div>
    </div>

    <div>
      <div className='information-heading'><b className='ml-1'>Payment type</b></div>
      <div className='mt-3'><b>{selectedBudget?.contribution_type}</b></div>
    </div>

    <div>
      <div className='information-heading'><b className='ml-1'>Number of payments</b></div>
      <div className='mt-3'><b>{selectedBudget?.wallet?.transactions.filter((transaction: any) => transaction?.status === 'completed').length}</b></div>
    </div>

  </div>  )
}

export default GeneralOverview