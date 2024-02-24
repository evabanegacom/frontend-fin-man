import { useState } from 'react';
import './App.css'
import Welcome from './pages/Welcome'
import { Navbar, Hero, Footer } from './pages/landing-page'
import styles from './pages/style'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard/dashboard';
import Overview from './pages/dashboard/overview';
import Budgets from './pages/dashboard/budgets';
import Savings from './pages/dashboard/savings';
import DebtMgts from './pages/dashboard/debt-mgts';
import Incomes from './pages/dashboard/incomes';
import Expenses from './pages/dashboard/expenses';
import ActivateAccount from './auth/activate-account';
import SignUp from './auth/sign-up';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './auth/login';
import ForgotPassword from './auth/forgot-password';
import ResetPassword from './auth/reset-password';
import { useSelector } from 'react-redux';

const Combined = () => {
  const isLoggedin = useSelector((state: any) => state?.reducer?.auth?.isAuth);
  return (
    <>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>
      <Welcome />
    </>
  )
}

function App() {
  const isLoggedin = useSelector((state: any) => state?.reducer?.auth?.isAuth);

  return (
    <div className='bg-primary w-full overflow-hidden'>
      <ToastContainer />
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Combined />} />
          {!isLoggedin && (
            <>
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
            </>
          )}
          {isLoggedin && (
            <>
              <Route path='/dashboard' element={<Dashboard />}>
                <Route path='/dashboard/budgets' element={<Budgets />} />
                <Route path='/dashboard/savings' element={<Savings />} />
                <Route path='/dashboard/debt-mgts' element={<DebtMgts />} />
                <Route path='/dashboard/incomes' element={<Incomes />} />
                <Route path='/dashboard/expenses' element={<Expenses />} />
                <Route path='/dashboard/overview' element={<Overview />} />
              </Route>
              <Route path='/activate' element={<ActivateAccount />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/reset-password' element={<ResetPassword />} />
            </>
          )}
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App;
