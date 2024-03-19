import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdKeyboardArrowLeft, MdMenu } from 'react-icons/md';
import Sidebar from "./sidebar";
import './dashboard.css';
import { useSelector } from "react-redux";
import AuthService from "../../services/auth-service";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../constants/Loader";

function Dashboard() {
  const [isCollapsed, setCollapsed] = useState(false);
  const user = useSelector((state: any) => state?.reducer?.auth?.user);
  const [ sending, setSending ] = useState(false)

  const generateActivationLink = async (e: any) => {
    setSending(true)
    try {
      const response = await AuthService?.generateActivationLink(user?.email);
      // Handle success, redirect, or perform additional actions
      toast.success(response?.message)
    } catch (error:any) {
      // Handle error
      const errorMessages = error?.response?.data?.message
      toast.error(errorMessages)
      console.error('Error creating user:', error);
    } finally {
      setSending(false); // Set loading state to false regardless of success or failure
    }
  };

  const toggleCollapseMobile = () => {
    if (isCollapsed && window.innerWidth < 768) {
      setCollapsed(false);
    } else {
      setCollapsed(!isCollapsed);
    }

    const sidebar = document.querySelector('.asidebar');
    sidebar?.classList.toggle('isactive');
  };

  return (
    <div className={`min-h-screen flex`}>
      <aside className={`asidebar text-white overflow-hidden bg-gray-900`}>
        <div className="p-4">
          <div className={`${isCollapsed ? 'text-sm' : 'text-xl'} font-bold mb-4`}>FICJS ON</div>
          <div className="toggle-btn cursor-pointer" onClick={toggleCollapseMobile}>
            <MdKeyboardArrowLeft className="text-secondary" size={20}/>
          </div>
        </div>
        <Sidebar isCollapsed={isCollapsed} setCollapsed={setCollapsed} toggleCollapseMobile={toggleCollapseMobile}/>
      </aside>
      <main className={`flex-1 p-2 bg-gray-100`}>
      <div className="flex flex-col items-center mb-3">
  {user?.activated === false ? (
    <div className="text-center">
      <span className="text-red-500 font-bold text-sm mb-2">Your account is not activated</span>
      <button onClick={generateActivationLink} className="text-green-500 hover:text-green-700 ml-2">
        {sending ? <Loader /> : 'Click here'}
      </button>
      <span className="text-red-500 font-bold text-sm ml-2">to activate your account</span>
    </div>
  ) : null}
</div>

        <div className="md:hidden">
          <button className="text-white p-2" onClick={toggleCollapseMobile}>
            <MdMenu size={24} className="font-bold text-1xl text-gray-900"/>
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard
