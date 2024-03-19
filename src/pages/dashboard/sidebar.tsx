import React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import routes from './routes'

interface Props {
  isCollapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  toggleCollapseMobile: () => void;
}

const Sidebar = ({ isCollapsed, setCollapsed, toggleCollapseMobile }: Props) => {
  const toggleCollapse = () => {
    // setCollapsed(!isCollapsed);
    toggleCollapseMobile();
  }
  return (
    // <nav style={{width: '100%'}}>
    //   <ul className="">
    //     {routes.map(({ href, title, icon }) => (
    //       <li className='m-2' key={title} style={{ marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
    //         <NavLink to={href} onClick={toggleCollapse} className='sidebar-links'>
    //           {icon && <div className={`d-flex align-items-center ${isCollapsed ? 'icon-small' : 'icon'}`}>{icon}</div>}
    //           <div className='font-size-14 text-white desktop-text'>{title}</div>
    //         </NavLink>
    //       </li>
    //     ))}
    //   </ul>
    // </nav>
    <nav style={{width: '100%'}} className="bg-gray-900 text-white h-full overflow-y-auto">
  <ul className="py-6">
    {routes.map(({ href, title, icon }) => (
      <li key={title} className="mb-4">
        <NavLink
          to={href}
          onClick={toggleCollapse}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 rounded transition duration-300 hover:bg-gray-800 hover:text-white" 
        >
          {icon && <div className={`mr-3 ${isCollapsed ? 'icon-small' : 'icon'}`}>{icon}</div>}
          <span className="hidden md:block">{title}</span>
        </NavLink>
      </li>
    ))}
  </ul>
</nav>

  );
};
export default Sidebar