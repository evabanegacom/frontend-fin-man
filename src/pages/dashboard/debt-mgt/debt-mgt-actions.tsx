import { useEffect, useRef, useState } from 'react';
import { TbTrash } from "react-icons/tb";
import { CiEdit } from 'react-icons/ci';
import DebtPaymentForm from '../../item-forms/debt-payment-form';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen:boolean) => void;
  selectedDebt: any;
}
const DebtMgtActions = ({isOpen, selectedDebt, setIsOpen}: Props) => {
    const ref:any = useRef(null);
    const [openDebtPayment, setOpenDebtPayment] = useState(false);
    const [openReassignAxis, setReassignAxis] = useState(false);
    const [openEditAccountNumber, setEditAccountNumber] = useState(false);
    
    const deactivateRider = () => {
      console.log('deactivate rider')
    }
    const debtActions = [
        {
          id: 1,
          name: 'Rider overview',
          action: () => console.log('Rider overview'),
          color: '#7975B6',
          icon: <TbTrash        color='#7975B6' />,
          // modal: <RiderOverview isOpen={openRiderOverView} setIsOpen={setRiderOverView}/>,
          onClick: () => {
            console.log('Rider overview')
          }
        },
        // {
        //   id: 2,
        //   name: 'Re assign axis',
        //   action: () => console.log('Re assign axis'),
        //   icon: <BiCheckCircle color='#5A9A8F'/>,
        //   color: '#5A9A8F',
        //   onClick: () => {
        //     setReassignAxis(true)
        //   }
    
        // },
        {
          id: 3,
          name: 'Record debt payment',
          action: () => console.log('edit account number'),
          icon: <CiEdit color='#C8CC66' />,
          color: '#C8CC66',
          // modal: <EditAccountNumber isOpen={openEditAccountNumber} setIsOpen={setEditAccountNumber} />,
          onClick: () => {
            setOpenDebtPayment(true)
          }
        },
        {
          id: 4,
          name: 'Delete',
          action: () => console.log('deactivate account number'),
          icon: <TbTrash color='#F00' />,
          color: '#F00',
          onClick: deactivateRider
        }
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
            if (!openDebtPayment && !openReassignAxis && !openEditAccountNumber) {
              setIsOpen(false);
            }
          }
        }
      
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref, setIsOpen, openDebtPayment, openReassignAxis, openEditAccountNumber]);  

      if (!isOpen) return null

  return (
    <>
        <div  className='debt-content-body'>
          <div className='debt-actions-container' ref={ref}>
            <div className='debt-action-div'>
              {debtActions.map((action) => (
                <button key={action.id} onClick={action.onClick}>
                  {action.icon}
                  <span style={{ color: action?.color }}>{action.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <DebtPaymentForm isOpen={openDebtPayment} setIsOpen={setOpenDebtPayment} selectedDebt={selectedDebt} />
      {/* <RiderOverview isOpen={openRiderOverView} setIsOpen={setRiderOverView} selectedRider={selectedRider} /> */}
      {/* <ReassignAxis isOpen={openReassignAxis} setIsOpen={setReassignAxis} selectedRider={selectedRider} /> */}
      {/* <EditAccountNumber isOpen={openEditAccountNumber} setIsOpen={setEditAccountNumber} selectedRider={selectedRider} /> */}
    </>
  )
}

export default DebtMgtActions