import {useEffect} from 'react'
import SavingsForm from '../form-modals/savings-form'
import SavingsService from '../../services/saving-services'
import SavingsFinanceForm from '../item-forms/savings-finance-form'

const Savings = () => {
  useEffect(() => {
    SavingsService.getUserSavings()
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  , [])
  
  return (
    <div>Savings
      <SavingsForm />
      <br />
      <SavingsFinanceForm />
    </div>
  )
}

export default Savings