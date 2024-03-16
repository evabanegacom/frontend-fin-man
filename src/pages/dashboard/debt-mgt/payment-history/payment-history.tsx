import { useEffect, useState } from 'react'
import DebtMgtsService from '../../../../services/debt-mgt-service';
import { formatAsCurrency, formatDateTime } from '../../../../constants';

interface Props {
    selectedDebt: any;
    }
const PaymentHistory:React.FC<Props> = ({ selectedDebt }) => {
  const [ debtPayment, setDebtPayment ] = useState<any>([])
  const debtPayments = async() => {
    const response = await DebtMgtsService.debtPayments(selectedDebt?.id)
    console.log(response)
    setDebtPayment(response)
  }

  useEffect(() =>  {
    debtPayments()
  }, [])

  const tableHeader = [ 'Name', 'Amount', 'Date']
  return (
    <div>
      <h5 className="text-center font-bold text-1xl text-gray-900 mt-3">Payment History</h5>
      <div className='table-wrapper'>
      <table className="table-auto w-full text-center debt-table">
        <thead>
          <tr>
            {/* <th className="px-4 py-2">ID</th> */}
            {tableHeader.map((header, index) => (
              <th style={{textAlign: 'center'}} key={index} className="border-b-2 border-sky-500 px-4 py-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {debtPayment.map((debt:any) => (
            <tr key={debt?.id}>
              {/* <td className="border-b-2 border-sky-500 px-4 py-2">{debt?.id}</td> */}
              
              <td className="border-b-2 border-sky-500 px-4 py-2">{debt?.name}</td>
              <td className="border-b-2 border-sky-500 px-4 py-2">{formatAsCurrency(debt?.amount)}</td>
              <td className="border-b-2 border-sky-500 px-4 py-2">{formatDateTime(debt?.created_at)}</td>
              {/* <td
                style={{ position: 'relative' }}
                onClick={() => selectRider(debt)}
                className="border-b-1 px-4 py-2 cursor-pointer border-b-2 border-sky-500 px-4 py-2"
              >
                <PiDotsThreeVerticalBold />
                {isOpen && selectedDebt?.id === debt?.id ? (
                  <div><DebtMgtActions isOpen={true} selectedDebt={selectedDebt} setIsOpen={setIsOpen} /></div>
                ) : null}
              </td> */}

            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default PaymentHistory