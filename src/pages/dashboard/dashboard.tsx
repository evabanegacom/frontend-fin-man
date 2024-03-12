import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdKeyboardArrowLeft, MdMenu } from 'react-icons/md';
import Sidebar from "./sidebar";
import './dashboard.css';

function Dashboard() {
  const [isCollapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
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
      <aside className={`asidebar bg-primary text-white overflow-hidden`}>
        <div className="p-4">
          <div className={`${isCollapsed ? 'text-sm' : 'text-xl'} font-bold mb-4`}>FICJS ON</div>
          <div className="toggle-btn cursor-pointer" onClick={toggleCollapseMobile}>
            <MdKeyboardArrowLeft className="text-secondary" size={20}/>
          </div>
        </div>
        <Sidebar isCollapsed={isCollapsed} setCollapsed={setCollapsed} toggleCollapseMobile={toggleCollapseMobile}/>
      </aside>
      <main className={`flex-1 p-2 bg-gray-100`}>
        <div className="md:hidden">
          <button className="text-white p-2" onClick={toggleCollapseMobile}>
            <MdMenu size={24} />
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard
