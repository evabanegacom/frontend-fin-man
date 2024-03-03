import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa';
import { PiProhibitBold } from 'react-icons/pi';
import DebtMgtsService from '../../../services/debt-mgt-service';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedDebt: any;
}

const DebtOverview = ({ isOpen, setIsOpen, selectedDebt }: Props) => {
  const [ debtPayment, setDebtPayment ] = useState()
  const upcomingDebtPayment = async () => {
    const response = await DebtMgtsService.upcomingDebts(selectedDebt?.id)
    console.log(response)
    setDebtPayment(response)
  }

  const colorStatus = (status: any) => {
    switch (status) {
      case 'true':
        return { backgroundColor: "#E6FFE6", color: "#549186" };
      case 'false':
        return { backgroundColor: "#FFE8B0", color: "#FFB400" };
      default:
        return { backgroundColor: "black", color: "white" };
    }
  }

  useEffect(() => {
    upcomingDebtPayment()
  }, [])

  function formatAmountAsNaira(totalAmount: number) {
    const amountInNaira = totalAmount;
    const formattedAmount = amountInNaira.toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN'
    });

    return formattedAmount;
  }

  const deactivateRider = () => {
    console.log('Rider has been suspended', 'success')
  }

  console.log(selectedDebt)

  if (!isOpen) return null

  const trueOrFalse = selectedDebt?.completed ? 'true' : 'false'

  return (
    <div className='modal-overlay'>
      <div className='modal-content-body'>
        <div className='fleet-overview-container'>
          <div className='rider-detail-header' style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ flex: 1, textAlign: 'center' }}>Rider details</span>
            <FaTimes onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }} />
          </div>
          <div className='user-name'>
            <div className='rider-image'><img src={selectedDebt?.avatar?.url || 'https://via.placeholder.com/150?text=Avatar'} alt='userimg' /></div>
            <div>
              <div className='rider-name'>{selectedDebt?.first_name} {" "} {selectedDebt?.last_name}</div>
              <div className='rider-number'>
                <span className='rider-number'>{selectedDebt?.mobile}</span>
                <span style={colorStatus(trueOrFalse)} className='rider-status'>{trueOrFalse === 'true' ? 'Completed' : 'Not completed'}</span>
              </div>
            </div>
          </div>
          <div>
            <div className='rider-earning'><span className='rider-earning-text'>Payment made:</span>
              <span className='rider-earned-amount'>{formatAmountAsNaira(debtPayment?.total_payment)}</span>
            </div>
            {selectedDebt?.is_active ?
              <div className='suspend'>
                <button onClick={deactivateRider}><PiProhibitBold color='#D95069' /><span style={{ color: '#D95069' }}>Suspend</span></button>
                {/* <button onClick={deactivateRider}><FaTimes /> <span style={{ color: '#050505'}}>Deactivate</span></button> */}
              </div>
              : null}

            <div className='rider-information-container'>

              <div className='rider-information-details'>
                <div className='information-heading'><b className='ml-1'>Rider Information</b></div>
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

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default DebtOverview