import { useState } from 'react';
import './App.css'
import Welcome from './pages/Welcome'
import { Navbar, Hero, Footer } from './pages/landing-page'
import styles from './pages/style'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard/dashboard';
import Overview from './pages/dashboard/overview';

const Combined = () => {
  return (<>
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

  return (
   <div className='bg-primary w-full overflow-hidden'>
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

  
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Combined />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='/dashboard:username' element={<Overview />} />
        </Route>
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
    <Footer />
   </div>
  )
}

export default App
