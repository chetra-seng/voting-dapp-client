import React from "react";
import { GoGraph } from "react-icons/go";
import { MdDashboardCustomize, MdHome, MdInfo } from "react-icons/md";
import { NavLink } from "react-router-dom";
import AppLogo from "../AppLogo";
import PageAnimation from "../PageAnimation";
const Layout = ({ children }) => {
  return (
    <div className="relative flex flex-row h-screen w-full max-md:justify-center">
      <div
        className={
          "basis-[15vw] flex flex-col gap-10 bg-black overflow-y-auto"
        }
      >
        <AppLogo />
        <nav className="flex flex-col gap-3 text-white grow sidebar-item">
          <NavLink
            to={"/"}
            end
            className={({ isActive }) =>
              `no-underline text-white ${isActive ? "bg-primary-100" : ""}`
            }
          >
            <div className="nav-item max-md:justify-center">
              <MdHome size={25} />
              <h3 className="no-underline max-md:hidden">Home</h3>
            </div>
          </NavLink>
          <NavLink
            to={"/dashboard"}
            end
            className={({ isActive }) =>
              `no-underline text-white ${isActive ? "bg-primary-100" : null}`
            }
          >
            <div className="nav-item max-md:justify-center">
              <MdDashboardCustomize size={25} />
              <h3 className="no-underline max-md:hidden">Dashboard</h3>
            </div>
          </NavLink>
          <NavLink
            to="/votes"
            className={({ isActive }) =>
              `no-underline text-white ${isActive ? "bg-primary-100" : null}`
            }
          >
            <div className="nav-item max-md:justify-center">
              <GoGraph fontSize={25} />
              <h3 className="no-uderline max-md:hidden">Finished Votes</h3>
            </div>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `no-underline text-white ${isActive ? "bg-primary-100" : null}`
            }
          >
            <div className="nav-item max-md:justify-center">
              <MdInfo size={25} />
              <h3 className="no-underline max-md:hidden">About</h3>
            </div>
          </NavLink>
        </nav>
      </div>
      <div className="basis-[85vw] p-16 max-md:basis-full overflow-y-auto">
        <PageAnimation>{children}</PageAnimation>
      </div>
    </div>
  );
};

export default Layout;
