import React from 'react'
import { NavLink } from 'react-router-dom'
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
    <nav style={{width: '100%'}}>
      <ul className="">
        {routes.map(({ href, title, icon }) => (
          <li className='m-2' key={title} style={{ marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
            <NavLink to={href} onClick={toggleCollapse} className='sidebar-links'>
              {icon && <div className={`d-flex align-items-center ${isCollapsed ? 'icon-small' : 'icon'}`}>{icon}</div>}
              <div className='font-size-14 text-white desktop-text'>{title}</div>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Sidebar