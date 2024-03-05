import React from 'react';
import './general-overview.css';

interface Props {
    selectedDebt: any;
    }

const GeneralOverview:React.FC<Props> = ({ selectedDebt}) => {
  return (
    <div className='rider-information-container'>

    <div className='rider-information-details'>
      <div className='information-heading'><b className='ml-1'>Debt Information</b></div>
      <div className='rider-data ml-1'>
        <div>Full Name: <b>{selectedDebt?.first_name} {" "} {selectedDebt?.last_name}</b></div>
        <div>Mobile number: <strong>{selectedDebt?.mobile}</strong></div>
      </div>
      <div className='ml-1'>email: <b>{selectedDebt?.email}</b></div>
    </div>

    <div>
      <div className='information-heading'><b className='ml-1'>Delivery axis</b></div>
      {/* <div className='rider-data ml-1'><b>{findEstate(selectedDebt?.estateID)}</b></div> */}
    </div>

    <div>
      <div className='information-heading'><b className='ml-1'>Account information</b></div>
      <div className='ml-1 mt-2'><strong>{selectedDebt?.rider_details?.bank_accounts[0]?.bank_name || 'No data'}</strong></div>
      <div className='ml-1'><strong>{selectedDebt?.rider_details?.bank_accounts[0]?.account_number || 'No data'}</strong></div>
      <div className='ml-1'><strong>{selectedDebt?.rider_details?.bank_accounts[0]?.account_name || 'No data'}</strong></div>
    </div>

    <div>
      <div className='information-heading'><b className='ml-1'>Vehicle type</b></div>
      <div className='mt-2 ml-1'><b>{selectedDebt?.rider_details?.vehicle_type}</b></div>
    </div>

    <div>
      <div className='information-heading'><b className='ml-1'>Number of deliveries</b></div>
      <div className='mt-2 ml-1'><b>{selectedDebt?.wallet?.transactions.filter((transaction: any) => transaction?.status === 'completed').length}</b></div>
    </div>

  </div>  )
}

export default GeneralOverview