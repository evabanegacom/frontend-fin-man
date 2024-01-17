import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdKeyboardArrowLeft } from 'react-icons/md';
import routes from './routes';
import Sidebar from "./sidebar";

export default function Dashboard() {
  const [isCollapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <div className={`min-h-screen flex`}>
      <aside className={`sidebar bg-primary text-white w-${isCollapsed ? '16' : '1/3'} transition-all duration-300 ease-in-out overflow-hidden`}>
        <div className="p-4">
          <div className={`${isCollapsed ? 'text-sm' : 'text-xl'} font-bold mb-4`}>FICJS ON</div>
          <div className="toggle-btn cursor-pointer" onClick={toggleCollapse}>
            <MdKeyboardArrowLeft className="text-secondary" size={20}/>
          </div>
        </div>
        <Sidebar isCollapsed={isCollapsed} setCollapsed={setCollapsed}/>
      </aside>
      <main className={`flex-1 p-2 ${isCollapsed ? 'main-collapsed' : ''} bg-gray-100`}>
        <Outlet />
      </main>
    </div>
  );
}
