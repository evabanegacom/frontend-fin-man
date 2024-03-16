import React from 'react';
import './general-overview.css';
import { formatAsCurrency, formatDateTime } from '../../../../constants';

interface Props {
    selectedDebt: any;
    debtMgts: any;
    }

const GeneralOverview:React.FC<Props> = ({ selectedDebt, debtMgts}) => {
  return (
    <div className='rider-information-container'>

    <div className='rider-information-details'>
      <div className='information-heading'><b className='ml-1'>Debt Information</b></div>
      <div className='flex flex-col gap-3'>
        <div>Amount owed: <b> {formatAsCurrency(selectedDebt?.target_amount)}</b></div>
        <div>Proposed date of completion: <strong>{formatDateTime(selectedDebt?.target_date)}</strong></div>
      <div>Last payment date: <b>{debtMgts?.last_contribution_date ? formatDateTime(debtMgts?.last_contribution_date) : 'No payments made'}</b></div>
      </div>
    </div>

    <div>
      <div className='information-heading'><b className='ml-1'>Next Payment Schedule</b></div>
      <div className='mt-3 text-center'><b>{debtMgts?.next_contribution_date ? formatDateTime(debtMgts?.next_contribution_date) : 'No payments made'}</b></div>
    </div>

    <div>
      <div className='information-heading'><b className='ml-1'>Purpose of debt</b></div>
      <div className='mt-3'><strong>{selectedDebt?.purpose}</strong></div>
    </div>

    <div>
      <div className='information-heading'><b className='ml-1'>Payment type</b></div>
      <div className='mt-3'><b>{selectedDebt?.contribution_type}</b></div>
    </div>

    <div>
      <div className='information-heading'><b className='ml-1'>Number of payments</b></div>
      <div className='mt-3'><b>{selectedDebt?.wallet?.transactions.filter((transaction: any) => transaction?.status === 'completed').length}</b></div>
    </div>

  </div>  )
}

export default GeneralOverview