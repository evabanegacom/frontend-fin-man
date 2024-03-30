import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa';
import { PiProhibitBold } from 'react-icons/pi';
import budgetsService from '../../../services/debt-mgt-service';
import { formatAsCurrency } from '../../../constants';
import GeneralOverview from './general-overview';
import BudgetExpenses from './budget-expenses';
import BudgetService from '../../../services/budget-service';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedBudget: any;
  budgets: any;
}

const BudgetOverview = ({ isOpen, setIsOpen, selectedBudget, budgets }: Props) => {
  const [ usedBudget, setUsedBudget ] = useState<any>({})
  const [ toggleButton, setToggleButton] = useState('General information')

  const upcomingBudgetUsage = async () => {
    const response = await BudgetService.upcomingBudgets(selectedBudget?.id)
    setUsedBudget(response)
  }

  const colorStatus = (status: any) => {
    switch (status) {
      case 'false':
        return { backgroundColor: "#E6FFE6", color: "#549186" };
      case 'true':
        return { backgroundColor: "#FFE8B0", color: "#D95069" };
      default:
        return { backgroundColor: "black", color: "white" };
    }
  }

  useEffect(() => {
    upcomingBudgetUsage()
  }, [])

  const deleteDebt = async() => {
    const response = await budgetsService.deleteDebt(selectedBudget?.id)
    console.log(response)
  }

  if (!isOpen) return null

  const trueOrFalse = selectedBudget?.completed ? 'true' : 'false'

  console.log(usedBudget)

  return (
    <div className='modal-overlay'>
      <div className='modal-content-body'>
        <div className='fleet-overview-container'>
          <div className='rider-detail-header' style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ flex: 1, textAlign: 'center' }}>Budget Details</span>
            <FaTimes onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }} />
          </div>
          <div className='user-name'>
            <div className='rider-image'><img src={selectedBudget?.avatar?.url || 'https://via.placeholder.com/150?text=Avatar'} alt='userimg' /></div>
            <div>
              <div className='rider-name'>{selectedBudget?.first_name} {" "} {selectedBudget?.last_name}</div>
              <div className='rider-number'>
                <span className='rider-number'>{selectedBudget?.mobile}</span>
                <span style={colorStatus(trueOrFalse)} className='rider-status'>{trueOrFalse === 'true' ? 'Exhausted' : 'Not Exhausted'}</span>
              </div>
            </div>
          </div>
          <div>
            <div className='rider-earning'><span className='rider-earning-text'>Amount Used:</span>
              <span className='rider-earned-amount text-rose-500'>{trueOrFalse === 'false' ? formatAsCurrency(usedBudget?.amount_used) :formatAsCurrency(usedBudget?.total_payment)}</span>
            </div>

            <div className='rider-earning'><span className='rider-earning-text'>Amount Left:</span>
              <span className='rider-earned-amount text-lime-700'>{formatAsCurrency(usedBudget?.upcoming_expense) || 0}</span>
            </div>
            
              <div className='suspend'>
                <button onClick={deleteDebt}><PiProhibitBold color='#D95069' /><span style={{ color: '#D95069' }}>Delete</span></button>
                {/* <button onClick={deactivateRider}><FaTimes /> <span style={{ color: '#050505'}}>Deactivate</span></button> */}
              </div>
              

<div className='rider-information'>
           <button onClick={() => setToggleButton('General information')} style={{ borderBottom: toggleButton==='General information' ? '2px solid #444266' : ''}}>General information</button>
           <button onClick={() => setToggleButton('expenses')} style={{ borderBottom: toggleButton==='expenses' ? '2px solid #444266' : ''}}>Payment history ({selectedBudget?.length})</button>
          </div>
          {toggleButton === 'General information' ? <GeneralOverview selectedBudget={selectedBudget} usedBudget={usedBudget}/> : <BudgetExpenses selectedBudget={selectedBudget} />}

           
          </div>
        </div>
      </div>
    </div>
  )
}

export default BudgetOverview
