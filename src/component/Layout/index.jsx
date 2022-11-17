import React from "react";
import { BiMenuAltLeft } from 'react-icons/bi';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { GoGraph } from "react-icons/go";
import { MdDashboardCustomize } from "react-icons/md";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import AppLogo from "../AppLogo";
const Layout = ({ children }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="relative flex flex-row h-screen w-full">
      <div className="absolute left-3 top-3 md:hidden">
        {toggleMenu ? null : (
          <BiMenuAltLeft
            fontSize={50}
            className="text-primary-dark cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
      </div>
      {toggleMenu && (
        <div className={
          "w-[35vw] min-w-max absolute left-0 z-10 rounded-r-md bg-primary-dark md:hidden h-screen flex flex-col gap-10 animate-slide"
          }>
          <BsFillArrowLeftCircleFill fontSize={45} className='absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-180 hover:rotate-0 hover:animate-pulse transition-all text-primary-100 rounded-full bg-slate-50 border border-slate-50 cursor-pointer' onClick={() => setToggleMenu(false)} />
          <AppLogo />
          <nav className="flex flex-col gap-3 text-white grow sidebar-item">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `no-underline text-white ${isActive ? "bg-primary-100" : ""}`
              }
            >
              <div className="flex flex-row justify-start gap-3 h-10 items-center px-3 transition-all">
                <MdDashboardCustomize fontSize={20}/>
                <h3 className="no-underline">Dashboard</h3>
              </div>
            </NavLink>
            <NavLink
              to="/votes"
              className={({ isActive }) =>
                `no-underline text-white ${isActive ? "bg-primary-100" : null}`
              }
            >
              <div className="flex flex-row justify-start gap-3 h-10 items-center px-3 transition-all">
                <GoGraph fontSize={20} />
                <h3>Finished Votes</h3>
              </div>
            </NavLink>
          </nav>
        </div>
      )}

      <div
        className={
          "basis-[25vw] h-screen max-md:hidden flex flex-col gap-10 bg-black "
        }
      >
        <AppLogo />
        <nav className="flex flex-col gap-3 text-white grow sidebar-item">
          <NavLink
            to={"/dashboard"} end
            className={({ isActive }) =>
              `no-underline text-white ${isActive ? "bg-primary-100" : null}`
            }
          >
            <div className="nav-item">
              <MdDashboardCustomize fontSize={20}/>
              <h3>Dashboard</h3>
            </div>
          </NavLink>
          <NavLink
            to="/votes"
            className={({ isActive }) =>
              `no-underline text-white ${isActive ? "bg-primary-100" : null}`
            }
          >
            <div className="nav-item">
            <GoGraph fontSize={20} />
            <h3>Finished Votes</h3>
            </div>
          </NavLink>
        </nav>
      </div>
      <div className="basis-[75vw] p-20 max-md:basis-full">
        {children}
      </div>
    </div>
  );
};

export default Layout;
