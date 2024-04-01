import React from 'react';
import { formatAsCurrency, formatDateTime } from '../../../constants';

interface Props {
    selectedBudget: any;
    usedBudget: any;
    }

const GeneralOverview:React.FC<Props> = ({ selectedBudget, usedBudget}) => {
  return (
    <div className='rider-information-container'>

    <div className='rider-information-details'>
      <div className='information-heading'><b className='ml-1'>Budget Information</b></div>
      <div className='flex flex-col gap-3'>
        <div>Budget amount: <b className='text-rose-500'> {formatAsCurrency(selectedBudget?.target_amount)}</b></div>
        <div>Proposed date of utilisation: <strong>{formatDateTime(selectedBudget?.target_date)}</strong></div>
      <div>Last expense date: <b>{usedBudget?.last_contribution_date ? formatDateTime(usedBudget?.last_contribution_date) : 'No payments made'}</b></div>
      </div>
    </div>

    <div>
      <div className='information-heading'><b className='ml-1'>Budget description</b></div>
      <div className='mt-3 text-violet-500'><strong>{selectedBudget?.purpose}</strong></div>
    </div>

    <div>
      <div className='information-heading'><b className='ml-1'>Usage Frequency</b></div>
      <div className='mt-3'><b>{selectedBudget?.contribution_type}</b></div>
    </div>

    <div>
      <div className='information-heading'><b className='ml-1'>Number of expenses</b></div>
      <div className='mt-3'><b>{usedBudget?.expenses_count}</b></div>
    </div>
  </div>  )
}

export default GeneralOverview