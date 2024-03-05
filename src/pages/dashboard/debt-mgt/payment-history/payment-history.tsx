import { useEffect, useState } from 'react'
import DebtMgtsService from '../../../../services/debt-mgt-service';

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

  const tableHeader = [ 'S/N', 'Name', 'Amount', 'Date']
  return (
    <div>
      <div>Payment History</div>
      <table className="table-auto w-full text-center debt-table">
        <thead>
          <tr>
            {/* <th className="px-4 py-2">ID</th> */}
            {tableHeader.map((header, index) => (
              <th key={index} className="border-b-2 border-sky-500 px-4 py-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {debtPayment.map((debt:any) => (
            <tr key={debt?.id}>
              <td className="border px-4 py-2">{debt?.id}</td>
              
              <td className="border-b-2 border-sky-500 px-4 py-2">{debt?.name}</td>
              <td className="border-b-2 border-sky-500 px-4 py-2">{debt?.amount}</td>
              <td className="border-b-2 border-sky-500 px-4 py-2">{debt?.created_at}</td>
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
  )
}

export default PaymentHistory