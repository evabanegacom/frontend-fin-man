import React, { useState, useEffect } from 'react';
import DebtMgtForm from '../form-modals/debt-mgt-form';
import DebtPaymentForm from '../item-forms/debt-payment-form';
import DebtMgtsService from '../../services/debt-mgt-service';

const DebtMgts = () => {
  const [debtMgts, setDebtMgts] = useState([])
  const getUpcomingDebtMgts = async () => {
    const response = await DebtMgtsService.upcomingDebts(1)
    setDebtMgts(response.data)
  }
  console.log(debtMgts)
  useEffect(() => {
    getUpcomingDebtMgts()
  }, [])
  return (
    <div>
      <h1>DebtMgts</h1>
      <DebtMgtForm />
      <br />
      <DebtPaymentForm />
    </div>
  )
}

export default DebtMgts