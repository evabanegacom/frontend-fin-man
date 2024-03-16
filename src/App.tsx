import { useState, lazy, Suspense } from 'react';
import './App.css'
import Welcome from './pages/Welcome'
import { Navbar, Hero, Footer } from './pages/landing-page'
import styles from './pages/style'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import ErrorBoundary from './components/error-boundary';

const Overview = lazy(() => import('./pages/dashboard/overview'));
const Budgets = lazy(() => import('./pages/dashboard/budgets'));
const Savings = lazy(() => import('./pages/dashboard/savings'));
const DebtMgts = lazy(() => import('./pages/dashboard/debt-mgt/debt-mgts'));
const Incomes = lazy(() => import('./pages/dashboard/incomes'));
const Expenses = lazy(() => import('./pages/dashboard/expenses'));
const ActivateAccount = lazy(() => import('./auth/activate-account'));
const SignUp = lazy(() => import('./auth/sign-up'));
const Login = lazy(() => import('./auth/login'));
const ForgotPassword = lazy(() => import('./auth/forgot-password'));
const ResetPassword = lazy(() => import('./auth/reset-password'));

const Combined = () => {
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
  const Dashboard = lazy(() => import('./pages/dashboard/dashboard'));

  const isLoginOrSignUpPage = window.location.pathname === '/login' || window.location.pathname === '/signup';

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className='bg-primary w-full overflow-hidden'>
        <ToastContainer />
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>

        <BrowserRouter>
          <Suspense fallback={<div style={{ color:'red'}}>Loading...</div>}>
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
          </Suspense>

        </BrowserRouter>
        {/* <Footer /> */}
        {!isLoginOrSignUpPage ? <Footer /> : null}
      </div>
    </ErrorBoundary>
  )
}

export default App;
