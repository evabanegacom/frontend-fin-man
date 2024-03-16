import { useEffect, useRef, useState } from 'react';
import { TbTrash } from "react-icons/tb";
import { CiEdit } from 'react-icons/ci';
import { HiOutlineEye } from 'react-icons/hi';
import DebtMgtsService from '../../../services/debt-mgt-service';
import { IoIosAddCircle } from "react-icons/io";
import DebtPaymentForm from '../../item-forms/debt-payment-form';
import DebtOverview from './debt-overview';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen:boolean) => void;
  selectedDebt: any;
  debtMgts: any;
}
const DebtMgtActions = ({isOpen, selectedDebt, setIsOpen, debtMgts}: Props) => {
    const ref:any = useRef(null);
    const [openDebtPayment, setOpenDebtPayment] = useState(false);
    const [openDebtOverview, setDebtOverview] = useState(false);
    const [openEditAccountNumber, setEditAccountNumber] = useState(false);
    
    const deleteDebt = async() => {
      const response = await DebtMgtsService.deleteDebt(selectedDebt?.id)
      console.log(response)
    }
    const debtActions = [
        {
          id: 1,
          name: 'Debt overview',
          color: '#7975B6',
          icon: <HiOutlineEye color='#7975B6' />,
          onClick: () => {
            setDebtOverview(true)
          }
        },
        {
          id: 3,

          name: 'Record debt payment',
          icon: <IoIosAddCircle color='#C8CC66' />,
          color: '#C8CC66',
          onClick: () => {
            setOpenDebtPayment(true)
          }
        },
        {
          id: 4,
          name: 'Delete',
          icon: <TbTrash color='#F00' />,
          color: '#F00',
          onClick: deleteDebt
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
            if (!openDebtPayment && !openDebtOverview && !openEditAccountNumber) {
              setIsOpen(false);
            }
          }
        }
      
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref, setIsOpen, openDebtPayment, openDebtOverview, openEditAccountNumber]);  

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
        <DebtOverview debtMgts={debtMgts} isOpen={openDebtOverview} setIsOpen={setDebtOverview} selectedDebt={selectedDebt} />
    </>
  )
}

export default DebtMgtActions