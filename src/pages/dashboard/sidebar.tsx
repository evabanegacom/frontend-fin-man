import React from 'react'
import { NavLink } from 'react-router-dom'
import routes from './routes'

interface Props {
    isCollapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    }

const Sidebar = ({isCollapsed, setCollapsed}:Props) => {
  return (
<nav className="">
            <ul className="">
              {routes.map(({ href, title, icon }) => (
                <li className='m-2' key={title}>
                  <NavLink to={href} onClick={() => setCollapsed(false)} className='d-flex align-items-center gap-2'>
                    {icon && <div className={`d-flex align-items-center ${isCollapsed ? 'icon-small' : 'icon'}`} >{icon}</div>}
                    <div className={`font-size-14 ${isCollapsed ? 'hidden' : 'text-black'}`}>{title}</div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>  )
}

export default Sidebar