import React from 'react';
import { formatAsCurrency, formatDateTime } from '../../../../constants';

interface Props {
    selectedDebt: any;
    debtMgts: any;
    debtPayment: any;
    }

const GeneralOverview:React.FC<Props> = ({ selectedDebt, debtMgts, debtPayment}) => {
  return (
    <div className='rider-information-container'>

    <div className='rider-information-details'>
      <div className='information-heading'><b className='ml-1'>Debt Information</b></div>
      <div className='flex flex-col gap-3'>
        <div>Amount owed: <b className='text-rose-500'> {formatAsCurrency(selectedDebt?.target_amount)}</b></div>
        <div>Proposed date of completion: <strong>{formatDateTime(selectedDebt?.target_date)}</strong></div>
        <div>Interest rate: <strong className='text-amber-500'>{selectedDebt?.interest_rate}%</strong></div>
      <div>Last payment date: <b>{debtMgts?.last_contribution_date ? formatDateTime(debtMgts?.last_contribution_date) : 'No payments made'}</b></div>
      </div>
    </div>

    <div>
      <div className='information-heading'><b className='ml-1'>Next Payment Schedule</b></div>
      <div className='mt-3 text-center'><b>{debtMgts?.next_contribution_date ? formatDateTime(debtMgts?.next_contribution_date) : 'No payments made'}</b></div>
    </div>

    <div>
      <div className='information-heading'><b className='ml-1'>Debt description</b></div>
      <div className='mt-3 text-violet-500'><strong>{selectedDebt?.purpose}</strong></div>
    </div>

    <div>
      <div className='information-heading'><b className='ml-1'>Payment type</b></div>
      <div className='mt-3'><b>{selectedDebt?.contribution_type}</b></div>
    </div>

    <div>
      <div className='information-heading'><b className='ml-1'>Number of payments</b></div>
      <div className='mt-3'><b>{debtPayment?.expenses_count}</b></div>
    </div>

  </div>  )
}

export default GeneralOverview