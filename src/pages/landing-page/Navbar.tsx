import { useState } from "react";
import { signedInLinks, signedOutLinks, logout } from "../../constants";
import { close, logo, menu } from "../../assets";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const isLoggedin = useSelector((state: any) => state?.reducer?.auth?.isAuth);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logo} alt="hoobank" className="w-[124px] h-[32px]" />

      {isLoggedin ? <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {signedInLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === signedInLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
          {nav?.title === 'Logout' ? <button onClick={logout}>logout</button> : <a href={`${nav.id}`}>{nav.title}</a>}
          </li>
        ))}
      </ul>
         :
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {signedOutLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === signedInLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <a href={`${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>
      }

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          {isLoggedin ? 
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {signedInLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === signedInLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                {/* <a href={`#${nav.id}`}>{nav.title}</a> */}
                {nav?.title === 'Logout' ? <button onClick={logout}>logout</button> : <a href={`${nav.id}`}>{nav.title}</a>}
              </li>
            ))}
          </ul>
          :
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
          {signedOutLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-medium cursor-pointer text-[16px] ${
                active === nav.title ? "text-white" : "text-dimWhite"
              } ${index === signedInLinks.length - 1 ? "mb-0" : "mb-4"}`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>
              }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
